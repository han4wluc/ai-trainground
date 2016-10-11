
import { Utils } from '../../';
const { GridUtil } = Utils;

const initialMazeState = {
  ...GridUtil.generateInitialGridState({columns:3,rows:3}),
  'x0y0': {
    isWall:true,
  },
  'x2y0': {
    isWall:true,
  },
  'x0y2': {
    isWall:true,
  },
  'x2y2': {
    isWall:true,
  },
  'x0y1': {
    isPlayer:true,
    direction: 'right',
  },
  'x1y0': {
    isGoal:true,
    reward: -10,
  },
  'x2y1': {
    isGoal:true,
    reward: 10,
  },
};

const initialState = {
  mazeState: initialMazeState,
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'MINIMAZE_SET_STATE'){
    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'MINIMAZE_RESET_MAZE'){
    return {
      ...state,
      mazeState: initialMazeState,
    };
  }

  if(action.type === 'MINIMAZE_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
