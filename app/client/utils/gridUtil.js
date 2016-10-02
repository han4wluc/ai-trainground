
import _ from 'lodash';

const generateInitialGridState = function(params){
  const { rows, columns } = params;

  const gridState = {};

  _.range(rows).forEach((iy)=>{
    _.range(columns).forEach((ix)=>{
      gridState[`x${ix}y${iy}`] = {};
    });
  });

  return gridState;

};

export default {
  generateInitialGridState,
};
