
import _ from 'lodash';
import { Utils } from '../../.';

const {
  GridUtil
} = Utils;

const initialState = {
  gridState: {
    ...GridUtil.generateInitialGridState({columns:8,rows:8}),
    'x1y2': {
      isStart: true,
      cost: 0,
    },
    'x2y2': {
      cost: 0,
      isWall: true,
    },
    'x2y3': {
      cost: 0,
      isWall: true,
    },
    'x5y5': {
      isGoal: true,
      cost: 0,
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

  if(action.type === 'HOME_INCREMENT_CELL_COST'){
    const gridState = _.cloneDeep(state.gridState);
    gridState[action.props.key].cost++;
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
