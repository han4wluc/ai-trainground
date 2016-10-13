
import Utils from '../../utils';
const {
  GridUtil, SearchTree
} = Utils;

import Grids from './grids';

export function setGridState(params){
  const { gridState } = params;
  return {
    type: 'GRID_SET_STATE',
    props: {
      gridState,
    }
  };
}

export function changeGrid(params){
  const { gridName } = params;
  const grid = Grids[gridName];
  const {
    gridState,
    columns,
    rows,
  } = grid;
  return {
    type: 'GRID_SET_STATE',
    props: {
      gridState,
      columns,
      rows,
    }
  };
}

export function setResultTable(params) {
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
}

export function updateCell(params) {
  const { x, y } = params;
  return {
    type: 'GRID_UPDATE_CELL',
    props: {
      key: `x${x}y${y}`,
    }
  };
}

export function updateCells(params){
  const { coordinates } = params;
  const keys = coordinates.map((coor)=>GridUtil.coorToKey(coor));
  return {
    type: 'GRID_UPDATE_CELLS',
    props: {
      keys,
    }
  };
}

/**
 * Remove all dots and highlights in the grid
 **/
export function clearPath(params){
  const { gridState } = params;

  const newGridState = _.cloneDeep(gridState);
  for (var key in newGridState){
    const cell = newGridState[key];
    cell.showDot = false;
    cell.isHighlighted = false;
  }

  return {
    type: 'GRID_SET_STATE',
    props: {
      gridState: newGridState,
    }
  };
}


/**
 * When Click at a gray cell, icrement cost, display darker gray
 */
export function incrementCellCost(params){
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
}

export function paintCells(params){
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
}

export function resetToInitialState(){
  return {
    type: 'GRID_RESET_TO_INITIAL_STATE',
  };
}
