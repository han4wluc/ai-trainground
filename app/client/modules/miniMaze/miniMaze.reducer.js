
import { Utils } from '../../';
const { GridUtil } = Utils;

const initialState = {
  mazeState: {
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
    }
  }
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'MINIMAZE_SET_STATE'){
    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'MINIMAZE_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
