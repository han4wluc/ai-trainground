
import startcode from './startcode';

const tasks = [{
  title: 'Sigmoid',
  description: 'description',
  formula: 'g(z) = \\frac{1}{1+e^{-z}}',
  codePlaceholder: startcode.sigmoid,
  url: 'http://localhost:3000/logistic-regression/sigmoid',
  status: 'Waiting',
  statusMessage: '',
}, {
  title: 'Hypothesis',
  description: 'description',
  formula: 'h_\\theta(x) = \\frac{1}{1+e^{-\\Theta^{T}x}}',
  codePlaceholder: startcode.hypothesis,
  url: 'http://localhost:3000/logistic-regression/hypothesis',
  status: 'Waiting',
  statusMessage: '',
}, {
  title: 'Cost Function',
  description: 'description',
  formula: 'J(\\theta) = -\\frac{1}{m}[\\sum_{i=1}^{m}y^{(i)}log(h_\\theta(x^{(i)}))+(1-y^{(i)})log (1-h_\\theta(x^{(i)}))]',
  codePlaceholder: startcode.cost_function,
  url: 'http://localhost:3000/logistic-regression/compute-cost',
  status: 'Waiting',
  statusMessage: '',
}, {
  title: 'Cost Function With Regularization',
  description: 'description',
  formula: 'J(\\theta) = \\frac{1}{2m}[\\sum_{i=1}^{m}(h_\\theta(x^{(i)})-y^{(i)})^{2} + \\lambda\\sum_{i=1}^{n}\\theta_j^{2} ]',
  codePlaceholder: startcode.cost_function_reg,
  url: 'http://localhost:3000',
  status: 'Waiting',
  statusMessage: '',
}, {
  title: 'Gradient Descent',
  description: 'description',
  formula: '\\theta_j := \\theta_j - \\alpha\\frac{1}{m}\\sum_{i=1}^{m}(h_\\theta(x^{(i)})-y^{(i)})x_j^{(i)}',
  codePlaceholder: startcode.gradient_descent,
  url: 'http://localhost:3000',
  status: 'Waiting',
  statusMessage: '',
}, {
  title: 'Gradient Descent With Regularization',
  description: 'description',
  formula: '\\theta_j := \\theta_j(1 - \\alpha\\frac{\\lambda}{m}) - \\alpha\\frac{1}{m}\\sum_{i=1}^{m}(h_\\theta(x^{(i)})-y^{(i)})x_j^{(i)}',
  codePlaceholder: startcode.gradient_descent,
  url: 'http://localhost:3000',
  status: 'Waiting',
  statusMessage: '',
}];


const initialState = {
  tasks,
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'PRACLOGREG_SET_STATE'){
    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'PRACLOGREG_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
