


import _ from 'lodash';
import { Utils } from '../../.';

const {
  GridUtil
} = Utils;

const initialState = {
  gridState: {
    ...GridUtil.generateInitialGridState({columns:6,rows:6}),
    'x1y2': {
      isStart: true,
    },
    'x5y5': {
      isGoal: true,
    }
  }
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

  if(action.type === 'HOME_PAINT_CELLS'){
    const gridState = _.cloneDeep(state.gridState);
    action.props.coordinates.forEach((c)=>{
      gridState[c].color = 'red';
    });
    return {
      ...state,
      gridState,
    };
  }

  if(action.type === 'HOME_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
