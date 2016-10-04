
const initialState = {
  // boardState: {
  //   '0,0' : -1,
  //   '0,1' : 1,
  //   '0,2' : 0,
  //   '1,0' : -1,
  //   '1,1' : 1,
  //   '1,2' : 0,
  //   '2,0' : -1,
  //   '2,1' : 1,
  //   '2,2' : 0
  // }
  boardState: {
    '0,0' : 0,
    '0,1' : 0,
    '0,2' : 0,
    '1,0' : 0,
    '1,1' : 0,
    '1,2' : 0,
    '2,0' : 0,
    '2,1' : 0,
    '2,2' : 0,
  }
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'TTT_SET_STATE'){
    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'TTT_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
