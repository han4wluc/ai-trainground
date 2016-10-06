
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

describe('NineUtil.computeHeuristics', function(){
  it('should return correct distance', function(){
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
    const distance = NineUtil.computeHeuristics({boardState});
    distance.should.equal(0);
  });

  it('should return correct distance', function(){
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
    const distance = NineUtil.computeHeuristics({boardState});
    distance.should.equal(2);
  });

  it('should return correct distance', function(){
    const boardState = {
      1: 8, // 3
      2: 3, // 1
      3: 4, // 3
      4: 7, // 1
      5: 6, // 1
      6: 5, // 1
      7: 2, // 3
      8: 1, // 3
      9: null,
    };
    const distance = NineUtil.computeHeuristics({boardState});
    distance.should.equal(16);
  });
});

describe('NineUtil._move', function(){
  it('should', function(){

    const expected = {
      1: 8,
      2: 3,
      3: 4,
      4: 7,
      5: 6,
      6: null,
      7: 2,
      8: 1,
      9: 5,
    };

    const boardState = {
      1: 8,
      2: 3,
      3: 4,
      4: 7,
      5: 6,
      6: 5,
      7: 2,
      8: 1,
      9: null,
    };
    const fr = 6;
    const to = 9;

    const actual = NineUtil._move({boardState, fr, to});
    expected.should.deep.equal(actual);
  });
});

describe('NineUtil.getSuccessorStates', function(){
  it('should', function(){

    const expected = [{
      boardState: {
        1: 8,
        2: 3,
        3: 4,
        4: 7,
        5: 6,
        6: null,
        7: 2,
        8: 1,
        9: 5,
      },
      move: 6,
      heuristic: 17,
    }, {
      boardState: {
        1: 8,
        2: 3,
        3: 4,
        4: 7,
        5: 6,
        6: 5,
        7: 2,
        8: null,
        9: 1,
      },
      move: 8,
      heuristic: 17,
    }];

    const boardState = {
      1: 8,
      2: 3,
      3: 4,
      4: 7,
      5: 6,
      6: 5,
      7: 2,
      8: 1,
      9: null,
    };

    const actual = NineUtil.getSuccessorStates({boardState});
    expected.should.deep.equal(actual);
  });
});

describe('NineUtil.getTransition', function(){
  it('should', function(){
    const boardStateA = {
      1: 8,
      2: 3,
      3: 4,
      4: 7,
      5: 6,
      6: 5,
      7: 2,
      8: 1,
      9: null,
    };

    const boardStateB = {
      1: 8,
      2: 3,
      3: 4,
      4: 7,
      5: 6,
      6: 5,
      7: 2,
      8: null,
      9: 1,
    };

    const expected = {
      isValid: true,
      move: 9
    };

    const actual = NineUtil.getTransition({boardStateA,boardStateB});
    expected.should.deep.equal(actual);
  });

  it('should', function(){
    const boardStateA = {
      1: 3,
      2: 8,
      3: 4,
      4: 7,
      5: 6,
      6: 5,
      7: 2,
      8: 1,
      9: null,
    };

    const boardStateB = {
      1: 8,
      2: 3,
      3: 4,
      4: 7,
      5: 6,
      6: 5,
      7: 2,
      8: null,
      9: 1,
    };

    const expected = {
      isValid: false,
    };

    const actual = NineUtil.getTransition({boardStateA,boardStateB});
    expected.should.deep.equal(actual);
  });

  it('should', function(){
    const boardStateA = {
      1: 8,
      2: 3,
      3: 4,
      4: 7,
      5: 6,
      6: 5,
      7: 2,
      8: null,
      9: 1,
    };

    const boardStateB = {
      1: 8,
      2: 3,
      3: 4,
      4: 7,
      5: 6,
      6: 5,
      7: 2,
      8: null,
      9: 1,
    };

    const expected = {
      isValid: false,
    };

    const actual = NineUtil.getTransition({boardStateA,boardStateB});
    expected.should.deep.equal(actual);
  });

});
