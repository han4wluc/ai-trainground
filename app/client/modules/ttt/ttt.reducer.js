
import _ from 'lodash';

// const initialBoardState = {
//   '0,0' : 0,
//   '0,1' : 0,
//   '0,2' : 0,
//   '1,0' : 0,
//   '1,1' : 0,
//   '1,2' : 0,
//   '2,0' : 0,
//   '2,1' : 0,
//   '2,2' : 0,
// };
const initialBoardState = {
  '0,0' : 1,
  '0,1' : -1,
  '0,2' : -1,
  '1,0' : 0,
  '1,1' : 1,
  '1,2' : 0,
  '2,0' : 0,
  '2,1' : 0,
  '2,2' : 0,
};

const initialState = {
  boardState: initialBoardState,
  score: {
    win: 0,
    lose: 0,
    draw: 0,
    total: 0,
  }
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'TTT_SET_STATE'){
    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'TTT_INCREMENT_SCORE'){
    const { type } = action.props;
    const score = _.cloneDeep(state.score);
    score.total++;
    if(type === 'WIN'){
      score.win++;
    }
    if(type === 'LOSE'){
      score.lose++;
    }
    if(type === 'DRAW'){
      score.draw++;
    }
    return {
      ...state,
      score,
    };
  }

  if(action.type === 'TTT_RESET_BOARD'){
    return {
      ...state,
      boardState: initialBoardState,
    };
  }

  if(action.type === 'TTT_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
