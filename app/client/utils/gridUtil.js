
import _ from 'lodash';

const _keyToCoor = function(params){
  const { key } = params;
  const r = /x(\d+)y(\d+)/g;
  const match = r.exec(key);
  const x = parseInt(match[1],10);
  const y = parseInt(match[2],10);
  return {x, y};
};

const _coorToKey = function(params){
  const {x,y} = params;
  return `x${x}y${y}`;
};

const generateInitialGridState = function(params){
  const { rows, columns } = params;

  const gridState = {};

  _.range(rows).forEach((y)=>{
    _.range(columns).forEach((x)=>{
      gridState[_coorToKey({x,y})] = {};
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
      return _keyToCoor({key});
    }
  }
};

const getGoalCoordinate = function(params){
  const {
    gridState,
  } = params;

  for (var key in gridState){
    const cell = gridState[key];
    if(cell.isGoal){
      return _keyToCoor({key});
    }
  }
};

const isGoalState = function(params){
  const {
    gridState,
    coordinate,
  } = params;

  const { x, y } = coordinate;
  const key = _coorToKey({x,y});

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

  const left =   { x:x-1, y};
  const right =  { x:x+1, y};
  const bottom = { x, y:y-1};
  const top =    { x, y:y+1};

  const finges = [left,right,bottom,top].filter((d)=>{
    return gridState[_coorToKey(d)];
  });
  return finges;
};

export default {
  generateInitialGridState,
  getSuccessor,
  getStartCoordinate,
  getGoalCoordinate,
  isGoalState,
  coorToKey: _coorToKey,
  keyToCoor: _keyToCoor,
};
