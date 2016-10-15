
import _ from 'lodash';

const initialState = {
  columns: 0,
  rows: 0,
  gridState: {},
  resultTable: [],
  highlighted: [],
  visited: [],
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'GRID_SET_STATE'){

    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'GRID_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
