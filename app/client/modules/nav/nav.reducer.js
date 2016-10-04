
const initialState = {
  // 
}

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'NAV_SET_STATE'){
    return {
      ...state,
      ...action.props,
    }
  };

  if(action.type === 'NAV_RESET_TO_INITIAL_STATE'){
    return initialState;
  };

  return state;
}
