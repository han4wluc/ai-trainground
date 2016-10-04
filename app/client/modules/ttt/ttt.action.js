
import _ from 'lodash';

export function makeMove(params) {
  const {
    player,
    key,
  } = params;

  return (dispatch, getState) => {

    const boardState = _.cloneDeep(getState().ttt.boardState);
    boardState[key] = player;

    // console.log(boardState);

    dispatch({
      type: 'TTT_SET_STATE',
      props: {
        boardState,
      }
    });

    return Promise.resolve();
  };

}

export function resetBoard(){
  return {
    type: 'TTT_RESET_BOARD'
  };
}

export function updateScore(params){
  const {
    winner
  } = params;

  var type = 'DRAW';
  if(winner === 1){
    type = 'WIN';
  }
  if(winner === -1){
    type = 'LOSE';
  }

  return {
    type: 'TTT_INCREMENT_SCORE',
    props: {
      type,
    }
  };
}
