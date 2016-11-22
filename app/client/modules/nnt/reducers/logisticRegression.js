
const tasks = [{
  title: 'Sigmoid',
  description: 'description',
  formula: 'g(z) = \\frac{1}{1+e^{-z}}',
  codePlaceholder: `def sigmoid(z):
  return # Your Code Here`,
  url: 'http://localhost:3000/logistic-regression/sigmoid',
  status: 'Waiting',
  statusMessage: '',
}, {
  title: 'Hypothesis',
  description: 'description',
  formula: 'h_\\theta(x) = \\frac{1}{1+e^{-\\Theta^{T}x}}',
  codePlaceholder: `def hypothesis(X, theta):
  return # Your Code Here`,
  url: 'http://localhost:3000/logistic-regression/hypothesis',
  status: 'Waiting',
  statusMessage: '',
}, {
  title: 'Cost Function',
  description: 'description',
  formula: 'J(\\theta) = -\\frac{1}{m}[\\sum_{i=1}^{m}y^{(i)}log(h_\\theta(x^{(i)}))+(1-y^{(i)})log (1-h_\\theta(x^{(i)}))]',
  codePlaceholder: `def compute_cost(X, y, theta):
  return # Your Code Here`,
  url: 'http://localhost:3000/logistic-regression/compute-cost',
  status: 'Waiting',
  statusMessage: '',
}, {
  title: 'Cost Function With Regularization',
  description: 'description',
  formula: 'J(\\theta) = \\frac{1}{2m}[\\sum_{i=1}^{m}(h_\\theta(x^{(i)})-y^{(i)})^{2} + \\lambda\\sum_{i=1}^{n}\\theta_j^{2} ]',
  codePlaceholder: `def compute_cost_with_reg(X, y, theta, reg_lambda):
  return # Your Code Here`,
  url: 'http://localhost:3000',
  status: 'Waiting',
  statusMessage: '',
}, {
  title: 'Gradient Descent',
  description: 'description',
  formula: '\\theta_j := \\theta_j - \\alpha\\frac{1}{m}\\sum_{i=1}^{m}(h_\\theta(x^{(i)})-y^{(i)})x_j^{(i)}',
  codePlaceholder: `def gradient_descent(X, y, theta, alpha):
  return # Your Code Here`,
  url: 'http://localhost:3000',
  status: 'Waiting',
  statusMessage: '',
}, {
  title: 'Gradient Descent With Regularization',
  description: 'description',
  formula: '\\theta_j := \\theta_j(1 - \\alpha\\frac{\\lambda}{m}) - \\alpha\\frac{1}{m}\\sum_{i=1}^{m}(h_\\theta(x^{(i)})-y^{(i)})x_j^{(i)}',
  codePlaceholder: `def gradient_descent_reg(X, y, theta, alpha, reg_lambda):
  return # Your Code Here`,
  url: 'http://localhost:3000',
  status: 'Waiting',
  statusMessage: '',
}];


const initialState = {
  tasks,
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'NNT_LOGISTIC_REGRESSION_SET_STATE'){
    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'NNT_LOGISTIC_REGRESSION_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
