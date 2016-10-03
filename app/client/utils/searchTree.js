
import _ from 'lodash';
import GridUtil from './gridUtil';

const strategies = {
  // Breadth First Search
  BFS:function(tree){
    return tree.sort((prev, next)=>{
      return prev.length > next.length ? 1 : -1;
    });
  },

  // Depth First Search
  // TODO limit depth
  DFS:function(tree){
    return tree.sort((prev, next)=>{
      return prev.length > next.length ? -1 : 1;
    });
  },

  // Greedy Search
  greedy: function(tree, goalCoordinate){
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

    return tree.sort((prev, next)=>{
      const prevDistance = computeManhattanDistance({
        start:_.last(prev),
        end: goalCoordinate,
      });
      const nextDistance = computeManhattanDistance({
        start:_.last(next),
        end: goalCoordinate,
      });
      return prevDistance > nextDistance ? 1 : -1;
    });
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

    this._expandedCells = [start];

    const branch = [start];
    let finges = GridUtil.getSuccessor({
      gridState,
      coordinate:start
    }).map((f)=>{
      return branch.concat(f);
    });

    this._tree = [];
    for (var j =0; j<finges.length; j++){
      this._tree.push(finges[j]);
    }
    console.log(this._tree)
  }

  setStrategy(params){
    const { strategy } = params;
    this._strategy = strategies[strategy];
  }

  next(params){
    const {
      gridState
    } = params;

    // console.log('this.tree', JSON.stringify(this.tree, null, 2));

    // console.log(this._tree)
    if(this._tree.length === 0){
      console.log('EXHAUSTED');
      return {
        goalReached: false,
        exhausted: true,
        tree: this._tree,
        expansions: this._expansions,
      };
    }

    const goalCoordinate = GridUtil.getGoalCoordinate({gridState});
    this._tree = this._strategy(this._tree, goalCoordinate);
    const branch = this._tree[0];

    const coordinate = _.last(branch);

    if(GridUtil.isGoalState({gridState, coordinate})){
      console.log('GOAL REACHED', this._expansions);
      return {
        goalReached: true,
        branch: branch,
        tree: this._tree,
        expansions: this._expansions,
      };
    }

    // expand the node
    this._expansions++;
    this._tree = this._tree.slice(1,this._tree.length);

    // console.log('coordinate', coordinate);

    if(!_.find(this._expandedCells, coordinate)){
      this._expandedCells.push(coordinate);
    }

    let finges = GridUtil
      .getSuccessor({gridState, coordinate:coordinate})
      .map((f) => branch.concat(f));

    // graph search
    // do not repeat already searched leaves
    // excude the cells that were already explored
    this._tree = this._tree
      .concat(finges)
      .filter((t)=> !_.find(this._expandedCells, _.last(t)));

    return {
      goalReached: false,
      coordinate,
      tree: this._tree,
      expansions: this._expansions,
    };
  }
}

export default SearchTree;
