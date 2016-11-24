
import startcode from './startcode';

const f =
`a^{(1)} = x \\\\
z^{(2)} = \\Theta^{(1)}a^{(1)} \\\\
a^{(2)} = g(z^{(2)}) \\\\
z^{(3)} = \\Theta^{(2)}a^{(2)} \\\\
a^{(3)} = g(z^{(3)}) \\\\
z^{(4)} = \\Theta^{(3)}a^{(3)} \\\\
a^{(4)} = h_\\Theta(x) = g(z^{(4)})`;

const tasks = [{
  title: 'Forward Propagation',
  description: 'description',
  formula: f,
  codePlaceholder: startcode.sigmoid,
  url: 'http://localhost:3000/neural-network/forward-propagation',
  status: 'Waiting',
  statusMessage: '',
}, {
  title: 'Cost Function',
  description: 'description',
  formula: '{J(\\Theta) = -\\frac{1}{m}[\\sum_{m}^{i=1}\\sum_{k=1}^{K}y_k^{(i)}log(h_\\Theta(x^{(i)}))_k + (1 - y_k^{(i)} log(1 - (h_\\Theta(x^{(i)}))_k)] + \\frac{\\lambda}{2m}\\sum_{l=1}^{L-1}\\sum_{i=1}^{s_l}\\sum_{j=1}^{s_l+1}(\\Theta_{ji}^{(l)})^2}',
  codePlaceholder: startcode.compute_cost_reg,
  url: 'http://localhost:3000/neural-network/compute-cost',
  status: 'Waiting',
  statusMessage: '',
}];


const initialState = {
  tasks,
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'PRACNEUNET_SET_STATE'){
    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'PRACNEUNET_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;

}
