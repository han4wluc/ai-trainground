
import _ from 'lodash';
import { Utils } from '../../';
const {
  GridUtil
} = Utils;

export function move(params){
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

  // console.log('left', dirs.left);
  const newMazeState = _.cloneDeep(mazeState);
  const newCoor = GridUtil.coorToKey(dirs[direction]);
  if(newMazeState[newCoor] && !newMazeState[newCoor].isWall){
    // console.log('aaaa')
    newMazeState[currentCoor].isPlayer = undefined;
    newMazeState[currentCoor].direction = undefined;

    newMazeState[newCoor].isPlayer = true;
    newMazeState[newCoor].direction = direction;
  } else {
    // console.log('bbbbb')
    newMazeState[currentCoor].direction = direction;
  }


  // check if there is key and key is not wall

  return {
    type: 'MAZE_SET_STATE',
    props: {
      mazeState: newMazeState,
    }
  };



}

