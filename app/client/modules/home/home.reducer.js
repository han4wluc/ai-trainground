





const initialState = {
  gridState: {

  }
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'HOME_SET_STATE'){
    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'HOME_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
