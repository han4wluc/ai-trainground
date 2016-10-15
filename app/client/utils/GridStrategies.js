
import BaseGrid from './BaseGrid';
import SearchTree from './SearchTree';

const _computeManhattanDistance = function(params){
  const { start, end } = params;
  const {
    x: sx,
    y: sy,
  } = start;
  const {
    x: ex,
    y: ey,
  } = end;
  const horizontalDistance = Math.abs(sx - ex);
  const verticalDistance = Math.abs(sy - ey);
  return horizontalDistance + verticalDistance;
};

const computeCost = function(params){
  const {coordinate, gridState} = params;
  // console.log('coordinate', coordinate)
  const key = SearchTree.coorToKey(coordinate);
  const cost = gridState[key].cost;
  return cost;
};

const mapCosts = function(gridState, l){
  let cost = 0;
  const { coordinate, path }=l;
  cost = cost + computeCost({coordinate, gridState});
  let cost2 = 0;
  path.forEach((p)=>{
    cost2 = cost2 + computeCost({coordinate:p, gridState});
  });
  return cost + cost2;
};

/**
 * Breadth First Search, use a queue. First In First Out
 */
const BFS = function({ finges }){
  const node = finges[0];
  return [node, finges.slice(1,finges.length)];
};

/**
 * Depth First Search, use a stack. First In Last Out
 */
const DFS = function({ finges }){
  const length = finges.length;
  const node = finges[length-1];
  return [node, finges.slice(0,finges.length-1)];
};

/**
 * Greedy search, go for the node with lowest heuristic
 */
const greedy = function({ finges, goalCoordinate }){

  const heuristics = finges.map((q, i) => {
    return _computeManhattanDistance({
      start: q.coordinate,
      end: goalCoordinate
    });
  });
  const min = Math.min(...heuristics);
  const minIndex = heuristics.indexOf(min);
  const node = finges[minIndex];
  return [
    node,
    [
      ...finges.slice(0,minIndex),
      ...finges.slice(minIndex+1,finges.length)
    ]
  ];
};

/**
 * Uniform Search, go for the node with lowest cost
 */
const uniform = function({ finges, gridState }){
  const costs = finges.map(mapCosts.bind(null,gridState));

  let index = 0;
  let value = undefined;
  costs.forEach((c, i)=>{
    if( value === undefined || c < value){
      value = c;
      index = i;
    }
  });

  const node = finges[index];
  return [
    node,
    [
      ...finges.slice(0,index),
      ...finges.slice(index+1,finges.length)
    ]
  ];

};

/**
 * A* Search, combine cost and heuristic.
 */
const astar = function({ finges, gridState, goalCoordinate }){
  const distances = finges.map((l)=>{
    return Calc.computeManhattanDistance({
      start: l.coordinate,
      end: goalCoordinate
    });
  });
  const costs = finges.map(mapCosts.bind(null,gridState));
  const heuristics = distances.map((d,i)=>{
    const c = costs[i];
    return d + c;
  });

  let index = 0;
  let value = undefined;
  heuristics.forEach((h, i)=>{
    if(value === undefined || h < value){
      index = i;
      value = h;
    }
  });

  const node = finges[index];
  return [
    node,
    [
      ...finges.slice(0,index),
      ...finges.slice(index+1,finges.length)
    ]
  ];
};

export {
  _computeManhattanDistance,
  BFS,
  DFS,
  greedy,
  uniform,
  astar,
};

