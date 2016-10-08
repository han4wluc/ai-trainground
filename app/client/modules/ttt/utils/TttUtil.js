
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

const calcScores = function(params){
  const { boardState, player, originalPlayer, } = params;
  let res = isGoalState({boardState});
  if (res.gameEnded){

    // console.log('winner', res.winner, originalPlayer, boardState);
    // if(res.winner === 0){ return [0, 0]; }
    // return res.winner === originalPlayer ? [1, 1] : [-1, -1];

    console.log('gameEnded', res);

    if(res.winner === 0){ return [0]; }
    return res.winner === originalPlayer ? [1] : [-1];
  }

  const opponent = player === -1 ? 1 : -1;
  const successorStates = getSuccessorsStates({boardState,player:opponent});

  const scores = successorStates.map((s)=>{
    return calcScores({boardState:s,player:opponent,originalPlayer});
  });

  console.log('calc', scores);

  return _.uniq(scores.reduce((p,n)=>p.concat(n),[]));

  // if(player === originalPlayer){
  //   return Math.max(...scores);
  // }
  // return Math.min(...scores);


  // const sum = scores.reduce((p,n)=>p+n,0);
  // return sum/scores.length

  // if(_.includes(scores, -1)){
  //   return -1;
  // }
  // if(_.includes(scores, 0)){
  //   return 0;
  // }
  // if(_.includes(scores, 1)){
  //   return 1;
  // }

  // let min = undefined;
  // let max = undefined;

  // scores.forEach((score)=>{
  //   const [s1, s2] = score;
  //   if (min === undefined || s1 <= min){
  //     min = s1;
  //   }
  //   if (min === undefined || s2 <= min){
  //     min = s2;
  //   }

  //   if (max === undefined || s1 >= max){
  //     max = s1;
  //   }
  //   if (max === undefined || s2 >= max){
  //     max = s2;
  //   }
  // });

  // return [min, max];
};

// no unit test
const getNextAIMoveWithMinMaxScores = function(params){
  const { boardState, player, originalPlayer } = params;
  const opponent = player === -1 ? 1 : -1;

  const moves = getSuccessors({boardState, player});

  const states = getSuccessorsStates({boardState, player});
  console.log('states', states);
  // const res = calcScores({boardState:states[0],player,originalPlayer});

  const scores = states.map((s)=>{
    return calcScores({boardState:s,player,originalPlayer});
  });

  console.log('scores', scores);

  // for(let i in scores){
  //   if(Math.max(scores[i]) === 1 || Math.max(scores[i]) === 0){
  //     return moves[i];
  //   }
  // }
  let maxIndex = 0;
  let maxValue = -2;

  scores.forEach((score,i)=>{
    if(score > maxValue){
      maxIndex = i;
      maxValue = score;
    }
    // const sum = score.reduce((p,n)=>p+n,0);
    // if(sum > maxIndex){
    //   maxIndex = sum;
    // }
  });

  return moves[maxIndex];

};

const getSuccessorsStates = function(params){
  const {
    boardState,
    player,
  } = params;

  const finges = [];
  for(let key in boardState){
    if(boardState[key] === 0){
      let newBoardState = _.cloneDeep(boardState);
      newBoardState[key] = player;
      finges.push(newBoardState);
    }
  }
  return finges;
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
  getSuccessorsStates,
  calcScores,
  getNextAIMoveWithMinMaxScores,
};
