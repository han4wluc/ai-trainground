
const initialState = {
  // 
}

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'NN_SET_STATE'){
    return {
      ...state,
      ...action.props,
    }
  };

  if(action.type === 'NN_RESET_TO_INITIAL_STATE'){
    return initialState;
  };

  return state;
}
