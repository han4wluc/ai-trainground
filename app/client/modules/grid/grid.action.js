
import Utils from '../../utils';
const {
  GridUtil, SearchTree
} = Utils;

import Grids from './grids';

const setGridState = function(params){
  const { gridState } = params;
  return {
    type: 'GRID_SET_STATE',
    props: {
      ...params,
      // gridState,
    }
  };
};

const changeGrid = function(params){
  const { gridName, searchTree } = params;
  const grid = Grids[gridName];
  const {
    gridState,
    columns,
    rows,
  } = grid;

  searchTree.setGridState(gridState);

  return async (dispatch) => {
    dispatch(setGridState({gridState:gridState,columns,rows}));
    dispatch(setResultTable({gridState:gridState}));
    return Promise.resolve();
  };

  // setResultTable

  // return {
  //   type: 'GRID_SET_STATE',
  //   props: {
  //     gridState,
  //     columns,
  //     rows,
  //   }
  // };
};

const setResultTable = function(params) {
  const { gridState } = params;

  const resultTable = ['BFS', 'DFS', 'greedy', 'uniform', 'astar'].map((strategy)=>{
    const searchTree = new SearchTree({
      gridState,
      strategy,
    });
    return searchTree.computeSolution();
  });

  return {
    type: 'GRID_UPDATE_RESULT_TABLE',
    props: {
      resultTable,
    }
  };
};

const updateCell = function(params) {
  const { x, y } = params;
  return {
    type: 'GRID_UPDATE_CELL',
    props: {
      key: `x${x}y${y}`,
    }
  };
};

const updateCells = function(params){
  const { coordinates } = params;
  const keys = coordinates.map((coor)=>GridUtil.coorToKey(coor));
  return {
    type: 'GRID_UPDATE_CELLS',
    props: {
      keys,
    }
  };
};

/**
 * Remove all dots and highlights in the grid
 **/
const clearPath = function(params){
  const { gridState, searchTree } = params;

  const newGridState = _.cloneDeep(gridState);
  for (var key in newGridState){
    const cell = newGridState[key];
    cell.showDot = false;
    cell.isHighlighted = false;
  }

  searchTree.setGridState(newGridState);

  return {
    type: 'GRID_SET_STATE',
    props: {
      gridState: newGridState,
    }
  };
};


/**
 * When Click at a gray cell, icrement cost, display darker gray
 */
const incrementCellCost = function(params){
  const { x, y, gridState, searchTree } = params;

  const newGridState = _.cloneDeep(gridState);

  const key = GridUtil.coorToKey({x,y});
  const { cost } = newGridState[key];
  if(cost > 2){
    newGridState[key].isWall = true;
  } else {
    newGridState[key].cost++;
  }

  searchTree.setGridState(newGridState);

  return {
    type: 'GRID_SET_STATE',
    props: {
      gridState: newGridState,
    }
  };
};

const paintCells = function(params){
  const {
    coordinates
  } = params;

  return {
    type: 'GRID_PAINT_CELLS',
    props: {
      coordinates: coordinates.map((c)=>{
        return `x${c.x}y${c.y}`;
      }),
    }
  };
};

const stepNext = function(params){
  const {
    strategy,
    searchTree,
  } = params;

  if(strategy){
    searchTree.setStrategy({strategy});
  }

  const res = searchTree.next();

  if(res.goalReached){
    return paintCells({coordinates: res.path.slice(1,-1)});
  }

  if(res.exhausted){
    return {};
  }

  return setGridState({gridState:res.gridState});

};

const resetToInitialState = function (){
  return {
    type: 'GRID_RESET_TO_INITIAL_STATE',
  };
};

export {
  setGridState,
  resetToInitialState,
  stepNext,
  paintCells,
  incrementCellCost,
  clearPath,
  updateCells,
  updateCell,
  setResultTable,
  changeGrid,
};
