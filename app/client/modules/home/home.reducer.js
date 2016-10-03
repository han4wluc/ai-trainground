
import _ from 'lodash';
import { Utils } from '../../.';

const {
  GridUtil
} = Utils;

import Grids from './grids';

const initialState = {
  columns: 5,
  rows: 5,
  gridState: Grids['grid_1'],
  resultTable: []
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'HOME_SET_STATE'){
    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'HOME_UPDATE_CELL'){

    const gridState = _.cloneDeep(state.gridState);
    gridState[action.props.key] = {
      ...gridState[action.props.key],
      showDot: true,
      // color: 'red'
    };

    // console.log(gridState);

    return {
      ...state,
      gridState,
    };

  }

  if(action.type === 'HOME_UPDATE_CELLS'){
    const gridState = _.cloneDeep(state.gridState);
    action.props.keys.forEach((key)=>{
      gridState[key].showDot = true;
    });
    return {
      ...state,
      gridState,
    };
  }

  if(action.type === 'HOME_CLEAR_PATH'){
    const gridState = _.cloneDeep(state.gridState);
    for (var key in gridState){
      const cell = gridState[key];
      cell.showDot = false;
      cell.isHighlighted = false;
    }
    return {
      ...state,
      gridState,
    };
  }

  if(action.type === 'HOME_INCREMENT_CELL_COST'){
    const gridState = _.cloneDeep(state.gridState);
    const cost = gridState[action.props.key].cost;
    if(cost > 2){
      gridState[action.props.key].isWall = true;
    } else {
      gridState[action.props.key].cost++;
    }

    return {
      ...state,
      gridState,
    };
  }

  if(action.type === 'HOME_PAINT_CELLS'){
    const gridState = _.cloneDeep(state.gridState);
    action.props.coordinates.forEach((c)=>{
      // gridState[c].color = 'red';
      gridState[c].isHighlighted = true;
    });
    return {
      ...state,
      gridState,
    };
  }

  if(action.type === 'HOME_UPDATE_RESULT_TABLE'){
    return {
      ...state,
      resultTable: action.props.resultTable,
    };
  }

  if(action.type === 'HOME_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
