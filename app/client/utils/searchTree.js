
import _ from 'lodash';
import * as Calc from './Calc';
import BaseGrid from './BaseGrid';
import * as GridStrategies from './GridStrategies';

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
    if(!coordinate){ return 0; }
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
    const end = this._getGoalCoordinate();
    this._expansions = 0;
    this._visited = [];
    this._queue = [{
      coordinate: start,
      path: [],
      cost: this._getCost({coordinate:start}),
      heuristic: GridStrategies.computeManhattanDistance({start,end}),
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
    const algorithmFunction = GridStrategies[strategy];

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
      return {
        cost: node.cost,
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
        const heuristic = GridStrategies.computeManhattanDistance({
          start:f,
          end:this._getGoalCoordinate()
        });
        return {
          coordinate: f,
          path: newPath,
          cost: node.cost + this._getCost({coordinate:f}),
          heuristic,
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
