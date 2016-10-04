
import NineUtil from '../NineUtil';

import chai from 'chai';
const should = chai.should();

describe('NineUtil.generateRandomBoard', function(){
  it('should succeed', function(){
    const board = NineUtil.generateRandomBoard();

    const keys = Object.keys(board);
    ['1','2','3','4','5','6','7','8','9'].should.deep.equal(keys);

    const values = keys.map((k)=>board[k]);
    const sortedValues = values.sort((p,n) => p > n ? 1 : -1);
    [null,1,2,3,4,5,6,7,8].should.deep.equal(sortedValues);

  });
});

describe('NineUtil.isGoalState', function(){
  it('should return true if is goal state', function(){
    const boardState = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: null,
    };
    const actual = NineUtil.isGoalState({boardState});
    actual.should.be.true;
  });
  it('should return false if not goal state', function(){
    const boardState = {
      1: 2,
      2: 1,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: null,
    };
    const actual = NineUtil.isGoalState({boardState});
    actual.should.be.false;
  });
});

describe('NineUtil.getSuccessor', function(){
  it('should return correct finges and emptyIndex', function(){
    const boardState = {
      1: 2,
      2: 1,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: null,
    };
    const finges = NineUtil.getSuccessor({boardState});

    ({ finges: [6,8], emptyIndex:9 }).should.deep.equal(finges);

  });
});

