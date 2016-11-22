
const obj = {};

const files = [
  'hypothesis.py',
  'compute_cost.py',
  'compute_cost_reg.py',
  'compute_gradient.py',
  'compute_gradient_reg.py',
  'gradient_descent.py',
];

files.forEach((file)=>{
  const name = file.split('.')[0];
  const content = require(`raw-loader!./${file}`);
  obj[name] = content;
});

export default obj;
