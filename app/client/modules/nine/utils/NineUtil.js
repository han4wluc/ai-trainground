
import _ from 'lodash';

const finges = {
  1: [2,4],
  2: [1,3,5],
  3: [2,6],
  4: [1,5,7],
  5: [2,4,6,8],
  6: [3,5,9],
  7: [4,8],
  8: [5,7,9],
  9: [6,8],
};

const coordinates = {
  1: [1,1],
  2: [2,1],
  3: [3,1],
  4: [1,2],
  5: [2,2],
  6: [3,2],
  7: [1,3],
  8: [2,3],
  9: [3,3],
};

const _calcDistance = function(a,b){
  const [x1,y1] = a;
  const [x2,y2] = b;
  const horizontalDistance = Math.abs(x1-x2);
  const verticalDistance = Math.abs(y1-y2);
  return horizontalDistance + verticalDistance;
};

const computeHeuristics = function(params){
  const { boardState } = params;

  let distances = 0;

  for(let posA in boardState){
    const posB = boardState[posA];
    if(posB === null){ continue; }

    const coorA = coordinates[posA];
    const coorB = coordinates[posB];

    distances += _calcDistance(coorA, coorB);

  }

  return distances;
};

const generateRandomBoard = function(){
  const values = _.shuffle([1,2,3,4,5,6,7,8,null]);
  const board = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
  };
  values.forEach((v,i)=>{
    board[i+1] = v;
  });
  return board;
};

const getSuccessor = function(params){
  const {
    boardState,
  } = params;
  for(let k in boardState){
    const value = boardState[k];
    if(value === null){
      return {
        finges: finges[k],
        emptyIndex: parseInt(k,10),
      };
    }
  }
};

const isGoalState = function(params){
  const {
    boardState,
  } = params;
  return _.isEqual({
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: null,
  }, boardState);
};

export default {
  generateRandomBoard,
  getSuccessor,
  isGoalState,
  computeHeuristics,
  _calcDistance,
};
