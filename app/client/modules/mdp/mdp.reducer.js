
const initialState = {
  nodes: [
    { id:'cold',       x:100, y:100, color: 'white' },
    { id:'warm',       x:250, y:100, color: 'white' },
    { id:'overheated', x:400, y:100, color: 'white' },
  ],
  links: [],
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'MDP_SET_STATE'){
    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'MDP_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
