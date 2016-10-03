
import _ from 'lodash';
import GridUtil from './gridUtil';


const strategies = {
  // breadth first
  BFS:function(tree){
    return tree.sort((prev, next)=>{
      return prev.length > next.length ? 1 : -1;
    });
  },

  // depth first
  // TODO limit depth
  DFS:function(tree){
    return tree.sort((prev, next)=>{
      return prev.length > next.length ? -1 : 1;
    });
  },

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

    const start = GridUtil.getStartCoordinate({gridState});
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
    const goalCoordinate = GridUtil.getGoalCoordinate({gridState});
    this._tree = this._strategy(this._tree, goalCoordinate);
    const branch = this._tree[0];

    const coordinate = _.last(branch);

    if(GridUtil.isGoalState({gridState, coordinate})){
      console.log('GOAL REACHED');
      // paintCells({coordinates: branch});
      return {
        goalReached: true,
        branch: branch,
        tree: this._tree,
      };
    }

    this._tree = this._tree.slice(1,this._tree.length);

    // console.log(_.last(branch))

    console.log('coordinate', coordinate);

    // updateCell(coordinate);

    let finges = GridUtil.getSuccessor({gridState, coordinate:coordinate});
    const prevCells = [];
    prevCells.push(coordinate);

    this._tree.forEach((t)=>{
      const arr = t.slice(0,-1);
      arr.forEach((a)=>{
        if (!_.find(prevCells, a)){
          prevCells.push(a);
        }
      });
    });

    // console.log('prevCells', prevCells);

    // console.log('f1', finges)


    finges = finges.map((f)=>{
      return branch.concat(f);
    }).filter((f)=>{

      // console.log('ff', prevCells, _.last(f));
      return !_.find(prevCells, _.last(f));

      // return !_.find(this.tree, f) && ;
    });
    // console.log('f2', finges)

    for (var j =0; j<finges.length; j++){
      this._tree.push(finges[j]);
    }

    // graph search
    // do not repeat already searched leaves
    this._tree = this._tree.filter((t)=>{
      return !_.find(prevCells, _.last(t));
    });

    return {
      goalReached: false,
      coordinate,
      tree: this._tree,
    };
  }



}


export default SearchTree;

