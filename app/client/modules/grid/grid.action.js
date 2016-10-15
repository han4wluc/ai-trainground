
import Grids from './grids';
import Utils from '../../utils';
const {
  SearchTree,
} = Utils;

const setState = function(params){
  return {
    type: 'GRID_SET_STATE',
    props: {
      ...params,
    }
  };
};

/**
 * Change the grid to one of the preconstructed grids
 */
const changeGrid = function({ gridName, searchTree }){
  const grid = Grids[gridName];
  const {
    gridState,
    columns,
    rows,
  } = grid;

  searchTree.setGridState({gridState});

  return async (dispatch) => {
    dispatch(clearPath({gridState,searchTree}));
    dispatch(setState({gridState,columns,rows}));
    dispatch(computeAndDisplay({gridState:gridState}));
    return Promise.resolve();
  };

};

/**
 * Compute various alorithm strategies,
 * Display each expansion, cost, path for each algorithm.
 */
const computeAndDisplay = function({ gridState }) {

  const resultTable = ['BFS', 'DFS', 'greedy', 'uniform', 'astar'].map((strategy)=>{
    const searchTree = new SearchTree({
      gridState,
      strategy,
    });
    return searchTree.computeSolution({strategy});
  });

  return setState({resultTable});

};


/**
 * Remove all dots and highlights on the grid
 **/
const clearPath = function({ gridState, searchTree }){

  searchTree.reset();

  return {
    type: 'GRID_SET_STATE',
    props: {
      highlighted: [],
      visited: [],
    }
  };
};


/**
 * When Click at a gray cell, icrement cost, display darker gray
 * If cost > 2, change to wall
 */
const incrementCellCost = function({ x, y, gridState, searchTree }){

  const newGridState = _.cloneDeep(gridState);

  const key = SearchTree.coorToKey({x,y});
  const { cost } = newGridState[key];
  if(cost > 2){
    newGridState[key].isWall = true;
  } else {
    newGridState[key].cost++;
  }

  searchTree.setGridState({gridState:newGridState,doReset:false});

  return {
    type: 'GRID_SET_STATE',
    props: {
      gridState: newGridState,
    }
  };
};


const stepNext = function({ strategy, searchTree }){

  const res = searchTree.next({strategy});

  if(res.goalReached){
    // return paintCells({coordinates: res.path.slice(1,-1)});
    const highlighted = res.path.slice(1,-1).map((c)=>SearchTree.coorToKey(c));
    return setState({highlighted,});
  }

  if(res.exhausted){
    return {};
  }

  return setState({gridState:res.gridState,visited:res.visited});

};

export {
  setState,
  stepNext,
  incrementCellCost,
  clearPath,
  computeAndDisplay,
  changeGrid,
};
