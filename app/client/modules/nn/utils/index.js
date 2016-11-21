
import math from 'mathjs';

const hypothesis = function(X, theta){
  console.log('X.size()', X.size());
  console.log('theta.size()', theta.size());
  const h = math.multiply(X, theta);
  console.log('h.size()', h.size());
  return h;
};

const computeCost = function(X, y, theta){
  const m = X.size()[0];

  const h = hypothesis(X, theta);

  const errors = math.subtract(h,y);
  const errorsSq = math.dotPow(errors, 2);
  const errorsSum = math.sum(errorsSq);
  const cost = 1/(2*m) * errorsSum;

  return cost;

};



export {
  hypothesis,
  computeCost,
};
