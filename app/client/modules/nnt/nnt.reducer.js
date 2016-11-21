
const tasks = [{
  title: 'SomeTitle',
  description: 'description',
  formula: 'h_\\theta(x) = \\theta x',
  codePlaceholder: `def hypothesis(X, thetas):
  return # Your Code Here`,
  status: 'Waiting',
  statusMessage: 'something went wrong',
  url: 'http://localhost:3000',
}];


const initialState = {
  tasks,
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'NNT_SET_STATE'){
    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'NNT_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
