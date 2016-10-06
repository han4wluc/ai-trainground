
import _ from 'lodash';

const isGoalState = function(params){
  const { boardState } = params;
  const winConditions = [
    // horizontal
    ['0,0','0,1','0,2'],
    ['1,0','1,1','1,2'],
    ['2,0','2,1','2,2'],
    // vertical
    ['0,0','1,0','2,0'],
    ['0,1','1,1','2,1'],
    ['0,2','1,2','2,2'],
    // diagonal
    ['0,0','1,1','2,2'],
    ['0,2','1,1','2,0'],
  ];

  for(let i in winConditions){
    const winCondition = winConditions[i];
    const [c1,c2,c3] = winCondition;

    if (boardState[c1] === 0 ||
        boardState[c2] === 0 ||
        boardState[c3] === 0){
      continue;
    }

    if(boardState[c1] === boardState[c2] && boardState[c1] === boardState[c3]){
      return {
        gameEnded: true,
        winner: boardState[c1],
        winningPosition: winCondition,
      };
    }
  }

  const keys = Object.keys(boardState);
  const playedKeys = keys.filter((k)=>boardState[k]!==0);
  if(playedKeys.length === 9){
    return {
      gameEnded: true,
      winner: 0
    };
  }

  return {
    gameEnded: false,
  };

};

const getSuccessors = function(params){
  const {
    boardState,
  } = params;
  const finges = [];
  for(let key in boardState){
    if(boardState[key] === 0){
      finges.push(key);
    }
  }
  return finges;
};

const nextMove = function(params){
  const {
    boardState,
    move,
    player,
  } = params;

  const legalMoves = getSuccessors({boardState});
  if(!_.includes(legalMoves, move)){
    return {
      isIllegalMove: true,
    };
  }

  const newBoardState = _.cloneDeep(boardState);
  newBoardState[move] = player;

  return {
    isIllegalMove: false,
    boardState: newBoardState,
    ...isGoalState({boardState:newBoardState}),
  };

};

export default {
  isGoalState,
  getSuccessors,
  nextMove,
};
