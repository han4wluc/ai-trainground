
import NineUtils from './utils';

const { NineUtil } = NineUtils;

const initialState = {
  boardState: NineUtil.generateRandomBoard(),
  // boardState: {
  //   1: 1,
  //   2: 2,
  //   3: 3,
  //   4: 4,
  //   5: 5,
  //   6: 6,
  //   7: null,
  //   8: 8,
  //   9: 7,
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
