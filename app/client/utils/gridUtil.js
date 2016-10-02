
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

const getStartCoordinate = function(params){
  const {
    gridState,
  } = params;

  for (var key in gridState){
    const cell = gridState[key];
    if(cell.isStart){
      const r = /x(\d+)y(\d+)/g;
      const match = r.exec(key);
      const x = parseInt(match[1],10);
      const y = parseInt(match[2],10);
      return {x, y};
    }
  }
};

const isGoalState = function(params){
  const {
    gridState,
    coordinate,
  } = params;

  const { x, y } = coordinate;
  const key = `x${x}y${y}`;

  if(gridState[key].isGoal){
    return true;
  }
  return false;

};

const getSuccessor = function(params){
  const {
    gridState,
    coordinate,
  } = params;

  const {x,y} = coordinate;
  // console.log()
  const left =   { x:x-1, y};
  const right =  { x:x+1, y};
  const bottom = { x, y:y-1};
  const top =    { x, y:y+1};

  const leftKey   = `x${x-1}y${y}`;
  const rightKey  = `x${x+1}y${y}`;
  const bottomKey = `x${x}y${y-1}`;
  const topKey    = `x${x}y${y+1}`;

  const finges = [];
  if (gridState[leftKey]){
    finges.push(left);
  }
  if (gridState[rightKey]){
    finges.push(right);
  }
  if (gridState[bottomKey]){
    finges.push(bottom);
  }
  if (gridState[topKey]){
    finges.push(top);
  }

  return finges;
};

export default {
  generateInitialGridState,
  getSuccessor,
  getStartCoordinate,
  isGoalState,
};
