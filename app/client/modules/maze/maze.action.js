
import _ from 'lodash';
import { Utils } from '../../';
const {
  GridUtil
} = Utils;

import { MazeUtil } from './utils';

export function move(params){
  const {
    mazeState,
    direction,
    reward,
  } = params;

  const {
    mazeState: newMazeState,
    reward: changeReward,
  } = MazeUtil.nextMove({mazeState,direction});

  return {
    type: 'MAZE_SET_STATE',
    props: {
      mazeState: newMazeState,
      reward: Math.round((reward + changeReward)*10 )/10,
    }
  };

}

export function calc(params){
  return {
    type: 'MAZE_SET_STATE',
  };
}

export function reset(params){
  return {
    type: 'MAZE_RESET_TO_INITIAL_STATE',
  };
}
