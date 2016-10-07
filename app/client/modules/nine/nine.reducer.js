
import NineUtils from './utils';

const { NineUtil } = NineUtils;

const initialState = {
  boardState: NineUtil.generateRandomBoard(),
  // boardState: {
  //   1: null,
  //   2: 5,
  //   3: 4,
  //   4: 7,
  //   5: 6,
  //   6: 3,
  //   7: 8,
  //   8: 1,
  //   9: 2,
  // },
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'NINE_SET_STATE'){
    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'NINE_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
