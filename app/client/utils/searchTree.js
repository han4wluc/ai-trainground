
import _ from 'lodash';
import * as Calc from './Calc';
import BaseGrid from './BaseGrid';

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

const strategies = {

  /**
   * Breadth First Search, use a queue. First In First Out
   */
  BFS: function({ finges }){
    const node = finges[0];
    return [node, finges.slice(1,finges.length)];
  },

  /**
   * Depth First Search, use a stack. First In Last Out
   */
  DFS: function({ finges }){
    const length = finges.length;
    const node = finges[length-1];
    return [node, finges.slice(0,finges.length-1)];
  },

  /**
   * Greedy search, go for the node with lowest heuristic
   */
  greedy: function({ finges, goalCoordinate }){

    let index = 0;
    let value = undefined;

    finges.forEach((q, i)=>{
      const distance = Calc.computeManhattanDistance({
        start: q.coordinate,
        end: goalCoordinate
      });
      if(value === undefined || distance < value){
        value = distance;
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
  },

  /**
   * Uniform Search, go for the node with lowest cost
   */
  uniform: function({ finges, gridState }){
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

  },

  /**
   * A* Search, combine cost and heuristic.
   */
  astar: function({ finges, gridState, goalCoordinate }){

    const distances = finges.map((l)=>{
      return Calc.computeManhattanDistance({
        start: l.coordinate,
        end: goalCoordinate
      });
    });

    // console.log('distances', distances);

    const costs = finges.map(mapCosts.bind(null,gridState));

    // console.log('costs', costs);

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

  }
};



class SearchTree extends BaseGrid{

  static generateInitialGridState({ rows, columns }){
    const gridState = {};

    _.range(rows).forEach((y)=>{
      _.range(columns).forEach((x)=>{
        gridState[BaseGrid.coorToKey({x,y})] = {
          cost: 1,
        };
      });
    });

    return gridState;
  }

  constructor(props) {
    super(props);
    this._reset();
    this.reset = this._reset;
  }

  /**
   * Get start coordiante.
   * @return start coordinate
   */
  _getStartCoordinate(){
    return this._getCoordinateWith({
      propName: 'isStart',
    });
  }

  /**
   * Get goal coordiante.
   * @return goal coordinate
   */
  _getGoalCoordinate(){
    return this._getCoordinateWith({
      propName: 'isGoal',
    });
  }

  /**
   * Get cost of a cell.
   * @return goal coordinate
   */
  _getCost({ coordinate }){
    const key = SearchTree.coorToKey(coordinate);
    const cost = this._gridState[key].cost;
    return cost;
  }

  /**
   * is goal state.
   * @return bool, if path to solution has been found
   */
  _isGoalState({ coordinate }){
    const goalCoordinate = this._getGoalCoordinate();
    return _.isEqual(goalCoordinate, coordinate);
  }

  /**
   * get keys of visited cells
   */
  _getVisitedCoordinateKeys(){
    return this._visited.map((v)=>SearchTree.coorToKey(v.coordinate));
  }

  /**
   * Clears the search.
   */
  _reset(){
    const start = this._getStartCoordinate();
    this._expansions = 0;
    this._visited = [];
    this._queue = [{
      coordinate: start,
      path: [],
    }];
  }

  /**
   * Updates the gridState, after the instance was initiated
   */
  setGridState({ gridState, doReset=true }){
    this._gridState = gridState;

    if(doReset){
      this._reset({gridState});
    }
  }

  /**
   * Computes a search iteration
   */
  next({ strategy }){

    let node;
    const algorithmFunction = strategies[strategy];

    // no more expandable nodes. return search has no solution.
    if(this._queue.length === 0){
      return {
        goalReached: false,
        exhausted: true,
        expansions: this._expansions,
      };
    }

    this._expansions++;

    // expand the next node depending on the strategy
    [node, this._queue] = algorithmFunction({
      finges: this._queue,
      goalCoordinate: this._getGoalCoordinate(),
      gridState: this._gridState,
    });
    const { coordinate } = node;
    const newPath = node.path.concat(coordinate);

    // in case the gridState was modified in the middle,
    // there is possibility that the node is a wall
    const { isWall } = this._gridState[SearchTree.coorToKey(coordinate)];
    if(isWall){
      return this.next();
    }

    // if goal is reached, return info including cost and path
    if(this._isGoalState({coordinate})){
      let cost = 0;
      newPath.forEach((coordinate)=>{
        cost = cost + this._getCost({coordinate});
      });
      return {
        cost,
        goalReached: true,
        path: newPath,
        gridState: this._gridState,
        visited: this._getVisitedCoordinateKeys(),
        expansions: this._expansions,
      };
    }

    // push to history
    this._visited.push({
      coordinate,
      path: newPath
    });

    // get new leaves
    const finges = this._getAdjacentCells({coordinate,excludeWalls:true})
      .map((f)=>{
        return {
          coordinate: f,
          path: newPath
        };
      });

    // push leaves to the finge, remove alredy visited nodes
    const visitedCoordinates = this._visited.map((v)=>v.coordinate);
    this._queue = this._queue
      .concat(finges)
      .filter((f)=> !_.find(visitedCoordinates, f.coordinate));

    // expansion iteration over, goal was not reached
    return {
      goalReached: false,
      gridState: this._gridState,
      visited: this._getVisitedCoordinateKeys(),
      expansions: this._expansions,
    };

  }

  /**
   * Computes the solution using secified algorithm for the gridState
   */
  computeSolution({ strategy, maxIterations = 2000 }){
    let res = {};
    let i = 0;
    while(!res.goalReached && i < maxIterations){
      i++;
      res = this.next({strategy});
      if(res.goalReached){
        return {
          strategy: strategy,
          expansions: res.expansions,
          cost: res.cost,
          path: res.path,
          visited: this._getVisitedCoordinateKeys(),
        };
      }
    }
    return {
      strategy: strategy,
    };
  }

}

export default SearchTree;
