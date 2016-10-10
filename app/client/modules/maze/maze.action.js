
import _ from 'lodash';
import { Utils } from '../../';
const {
  GridUtil
} = Utils;

import { MazeUtil } from './utils';

export function displayUtility(params){
  const { utilities } = params;
  return {
    type: 'MAZE_SET_STATE',
    props: {
      utilities,
    }
  };
}

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

// MDP
  // States S
  // Actions A
  // Transtion Probabilities
  // Rewards/Discounts
  // Start State
// Quantities
  // Policy
  // Utility
  // Values
  // Q-Values

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
