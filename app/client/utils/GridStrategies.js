
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
const uniform = function({ finges }){
  const costs = finges.map((cell, i) => {
    return cell.cost;
  });
  const min = Math.min(...costs);
  const minIndex = costs.indexOf(min);

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
 * A* Search, combine cost and heuristic.
 */
const astar = function({ finges, gridState, goalCoordinate }){
  const heuristicsCosts = finges.map((cell, i) => {
    const distance = _computeManhattanDistance({
      start: cell.coordinate,
      end: goalCoordinate
    });
    return distance + cell.cost;
  });

  const min = Math.min(...heuristicsCosts);
  const minIndex = heuristicsCosts.indexOf(min);
  const node = finges[minIndex];

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

