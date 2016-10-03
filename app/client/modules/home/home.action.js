
import Utils from '../../utils';
const {
  GridUtil
} = Utils;

import Grids from './grids';

export function setGridState(params){
  const { gridName, columns, rows } = params;
  return {
    type: 'HOME_SET_STATE',
    props: {
      gridState: Grids[gridName],
      columns,
      rows,
    }
  };
}

export function setResultTable(params) {
  const { resultTable } = params;
  return {
    type: 'HOME_UPDATE_RESULT_TABLE',
    props: {
      resultTable,
    }
  };
}

export function updateCell(params) {
  const { x, y } = params;
  return {
    type: 'HOME_UPDATE_CELL',
    props: {
      key: `x${x}y${y}`,
    }
  };
}

export function updateCells(params){
  const { coordinates } = params;
  const keys = coordinates.map((coor)=>GridUtil.coorToKey(coor));
  return {
    type: 'HOME_UPDATE_CELLS',
    props: {
      keys,
    }
  };
}

export function clearPath(){
  return {
    type: 'HOME_CLEAR_PATH',
  };
}

export function incrementCellCost(params){
  const { x, y } = params;
  return {
    type: 'HOME_INCREMENT_CELL_COST',
    props: {
      key: `x${x}y${y}`,
    }
  };
}

export function paintCells(params){
  const {
    coordinates
  } = params;

  return {
    type: 'HOME_PAINT_CELLS',
    props: {
      coordinates: coordinates.map((c)=>{
        return `x${c.x}y${c.y}`;
      }),
    }
  };

}

export function resetToInitialState(){
  return {
    type: 'HOME_RESET_TO_INITIAL_STATE',
  };
}
