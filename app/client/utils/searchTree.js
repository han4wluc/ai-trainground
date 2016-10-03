
import _ from 'lodash';
import GridUtil from './gridUtil';

const computeManhattanDistance = function(params){
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

const strategies = {
  BFS: function(queue){
    const node = queue[0];
    return [node, queue.slice(1,queue.length)];
  },
  DFS: function(stack){
    const length = stack.length;
    const node = stack[length-1];
    return [node, stack.slice(0,stack.length-1)];
  },
  greedy: function(queue, goalCoordinate){
    let index = 0;
    let value = undefined;

    queue.forEach((q, i)=>{
      const distance = computeManhattanDistance({
        start: q.coordinate,
        end: goalCoordinate
      });
      if(value === undefined || distance < value){
        value = distance;
        index = i;
      }
    });

    const node = queue[index];
    return [
      node,
      [
        ...queue.slice(0,index),
        ...queue.slice(index+1,queue.length)
      ]
    ];
  }
};

class SearchTree {

  constructor(props) {

    const {
      gridState,
      strategy,
    } = props;

    this.setStrategy({strategy});
    this._reset({gridState});

  }

  _reset(params){
    const {
      gridState
    } = params;

    this._expansions = 0;

    const start = GridUtil.getStartCoordinate({gridState});
    this._queue = [{
      coordinate: start,
      path: [],
    }];
    this._visited = [];
  }

  setStrategy(params){
    const { strategy } = params;
    this._strategy = strategies[strategy];
  }

  _nextExhausted(){
    return {
      goalReached: false,
      exhausted: true,
      // tree: this._tree,
      expansions: this._expansions,
    };
  }

  _nextGoalReached(path){
    // console.log('GOAL REACHED', this._expansions);
    return {
      goalReached: true,
      branch: path,
      expansions: this._expansions,
    };
  }

  _nextCoordinate(coordinate){
    return {
      goalReached: false,
      coordinate,
      // tree: this._tree,
      expansions: this._expansions,
    };
  }

  next(params){
    const {
      gridState
    } = params;

    this._expansions++;

    if(this._queue.length === 0){
      return this._nextExhausted.call(this);
    }

    // expand the next node depending on the strategy
    let node;
    [node, this._queue] = this._strategy(
      this._queue,
      GridUtil.getGoalCoordinate({gridState}),
    );
    const { coordinate } = node;
    const newPath = node.path.concat(coordinate);

    if(GridUtil.isGoalState({gridState, coordinate})){
      return this._nextGoalReached.call(this, newPath);
    }

    this._visited.push({
      coordinate,
      path: newPath
    });

    const finges = GridUtil.getSuccessor({gridState, coordinate})
      .map((f)=>{
        return {
          coordinate: f,
          path: newPath
        };
      });

    const visitedCoordinates = this._visited.map((v)=>v.coordinate);
    this._queue = this._queue
      .concat(finges)
      .filter((f)=> !_.find(visitedCoordinates, f.coordinate));

    return this._nextCoordinate.call(this, coordinate);

  }
}

export default SearchTree;
