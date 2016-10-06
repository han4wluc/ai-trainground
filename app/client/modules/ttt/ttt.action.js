
import _ from 'lodash';

import TttNetwork from './ttt.network';
import TttUtils from './utils';
const {
  TttUtil
} = TttUtils;

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

const updateScore = function(params){
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
};

const _makeMove = function(params){
  const {
    boardState,
    move,
    player,
    dispatch,
  } = params;

  const { gameEnded:gameAlreadyEnded } = TttUtil.isGoalState({boardState});
  if(gameAlreadyEnded){
    // console.log('game already ended')
    return;
  }

  const res = TttUtil.nextMove({
    boardState,
    move,
    player,
  });

  const {
    isIllegalMove,
    boardState: newBoardState,
    gameEnded,
    winner,
    winningPosition,
  } = res;

  if(isIllegalMove){
    console.log('ILLEGAL MOVE');
    return;
  }

  dispatch({
    type: 'TTT_SET_STATE',
    props: {
      boardState: newBoardState,
    }
  });

  if(gameEnded){
    dispatch(updateScore({winner}));
  }
};

export function playerMakeMove(params){

  const { boardState, move } = params;
  const player = 1;
  return async (dispatch, getState) => {
    return await _makeMove({boardState, move, player,dispatch});
  };

}

export function aiMakeMove(params){

  const { boardState } = params;

  return async (dispatch, getState) => {

    const player = -1;
    const { action:move } = await TttNetwork.requestNextMove({boardState});

    return await _makeMove({boardState, move, player,dispatch});
  };
}


