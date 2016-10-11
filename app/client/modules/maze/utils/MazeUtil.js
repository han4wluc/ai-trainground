
import { Utils } from '../../..';
const {
  GridUtil
} = Utils;


const getRandomDirection = function(params){
  const { direction } = params;

  const probabilities = {};
  probabilities.top = ['top','left','right'];
  probabilities.bottom = ['bottom','left','right'];
  probabilities.left = ['left','top','bottom'];
  probabilities.right = ['right','top','bottom'];

  const probability = probabilities[direction];

  const r = _.random(0,99);
  if(r < 80){
    return probability[0];
  }
  if(r < 90){
    return probability[1];
  }
  return probability[2];
};

const _getAdjacentCoordiantes = function(params){
  const { coordinateKey } = params;

  const { x, y } = GridUtil.keyToCoor({key:coordinateKey});
  const dirs = {};
  dirs.left   = { x:x-1, y};
  dirs.right  = { x:x+1, y};
  dirs.top    = { x, y:y-1};
  dirs.bottom = { x, y:y+1};

  return dirs;
};

const nextMove = function(params){

  const {
    mazeState,
    direction,
    noise = true,
  } = params;

  const currentCoor = _.findKey(mazeState, { isPlayer: true });

  if(!currentCoor){
    console.log('game already ended');
    return {
      mazeState,
      reward: 0,
      gameEnded: true,
    };
  }

  if(mazeState[currentCoor].isGoal){
    const newMazeState = _.cloneDeep(mazeState);
    const reward = newMazeState[currentCoor].reward;
    newMazeState[currentCoor].isPlayer = undefined;
    newMazeState[currentCoor].direction = undefined;
    console.log('exit action');
    return {
      mazeState: newMazeState,
      reward,
    };
  }

  const { x, y } = GridUtil.keyToCoor({key:currentCoor});

  const dirs = {};
  dirs.left   = { x:x-1, y};
  dirs.right  = { x:x+1, y};
  dirs.top    = { x, y:y-1};
  dirs.bottom = { x, y:y+1};

  const newMazeState = _.cloneDeep(mazeState);

  const actualDirection = noise ? getRandomDirection({direction}) : direction;

  const newCoor = GridUtil.coorToKey(dirs[actualDirection]);

  let reward = -0.1;

  if(newMazeState[newCoor] && !newMazeState[newCoor].isWall){
    newMazeState[currentCoor].isPlayer = undefined;
    newMazeState[currentCoor].direction = undefined;

    newMazeState[newCoor].isPlayer = true;
    newMazeState[newCoor].direction = actualDirection;
    // if(newMazeState[newCoor].reward !== undefined){
    //   reward = reward + newMazeState[newCoor].reward;
    // }
  } else {
    newMazeState[currentCoor].direction = actualDirection;
  }

  return {
    mazeState: newMazeState,
    reward,
  };

};



export default {
  nextMove,
  getAdjacentCoordiantes: _getAdjacentCoordiantes
};
