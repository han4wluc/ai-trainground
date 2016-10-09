
import { Utils } from '../../..';
const {
  GridUtil
} = Utils;


const getDirection = function(params){
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

const nextMove = function(params){

  const {
    mazeState,
    direction,
  } = params;

  const currentCoor = _.findKey(mazeState, { isPlayer: true });
  const { x, y } = GridUtil.keyToCoor({key:currentCoor});

  const dirs = {};
  dirs.left   = { x:x-1, y};
  dirs.right  = { x:x+1, y};
  dirs.top    = { x, y:y-1};
  dirs.bottom = { x, y:y+1};

  const newMazeState = _.cloneDeep(mazeState);

  const actualDirection = getDirection({direction});

  const newCoor = GridUtil.coorToKey(dirs[actualDirection]);

  let reward = -0.1;

  if(newMazeState[newCoor] && !newMazeState[newCoor].isWall){
    newMazeState[currentCoor].isPlayer = undefined;
    newMazeState[currentCoor].direction = undefined;

    newMazeState[newCoor].isPlayer = true;
    newMazeState[newCoor].direction = actualDirection;
    if(newMazeState[newCoor].reward !== undefined){
      reward = reward + newMazeState[newCoor].reward;
    }
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
};
