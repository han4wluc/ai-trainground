
import { Utils } from '../../';
const { GridUtil } = Utils;

const initialState = {
  mazeState: {
    ...GridUtil.generateInitialGridState({columns:4,rows:3}),
    'x1y1': {
      isWall: true,
    },
    'x3y0': {
      isGoal: true,
      reward: 1.0,
      backgroundColor: '#0099ff',
    },
    'x3y1': {
      isGoal: true,
      reward: -1.0,
      backgroundColor: 'red',
    },
    'x2y2': {
      isPlayer: true,
      direction: 'right',
    }
  },
  columns: 4,
  rows: 3,
  reward: 0,
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'MAZE_SET_STATE'){
    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'MAZE_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
