
import TttUtil from '../TttUtil';

import chai from 'chai';
const should = chai.should();

describe('TttUtil.isGoalState', function(){
  it('should return player -1 as winner', function(){

    const boardState = {
      '0,0' : -1, '0,1' : 1, '0,2' : 0,
      '1,0' : -1, '1,1' : 1, '1,2' : 0,
      '2,0' : -1, '2,1' : 0, '2,2' : 0
    };

    const expected = {
      gameEnded: true,
      winner: -1,
      winningPosition: [ '0,0', '1,0', '2,0' ]
    };

    const actual = TttUtil.isGoalState({
      boardState
    });

    expected.should.deep.equal(actual);

  });

  it('should return player 1 as winner', function(){

    const boardState = {
      '0,0' : -1, '0,1' : 1, '0,2' :  1,
      '1,0' : -1, '1,1' : 1, '1,2' : -1,
      '2,0' :  1, '2,1' : 0, '2,2' : -1
    };

    const expected = {
      gameEnded: true,
      winner: 1,
      winningPosition: [ '0,2', '1,1', '2,0' ]
    };

    const actual = TttUtil.isGoalState({
      boardState
    });

    expected.should.deep.equal(actual);

  });

  it('should return draw', function(){

    const boardState = {
      '0,0' : -1, '0,1' :  1, '0,2' : -1,
      '1,0' : -1, '1,1' :  1, '1,2' :  1,
      '2,0' :  1, '2,1' : -1, '2,2' : -1
    };

    const expected = {
      gameEnded: true,
      winner: 0,
    };

    const actual = TttUtil.isGoalState({
      boardState
    });

    expected.should.deep.equal(actual);

  });

  it('should return game not ended', function(){

    const boardState = {
      '0,0' : -1, '0,1' :  1, '0,2' : -1,
      '1,0' : -1, '1,1' :  0, '1,2' :  1,
      '2,0' :  1, '2,1' : -1, '2,2' : -1
    };

    const expected = {
      gameEnded: false,
    };

    const actual = TttUtil.isGoalState({
      boardState
    });

    expected.should.deep.equal(actual);

  });

  it('should return game not ended', function(){

    const boardState = {
      '0,0' : 0, '0,1' : 0, '0,2' : 0,
      '1,0' : 0, '1,1' : 0, '1,2' : 0,
      '2,0' : 0, '2,1' : 0, '2,2' : 0
    };

    const expected = {
      gameEnded: false,
    };

    const actual = TttUtil.isGoalState({
      boardState
    });

    expected.should.deep.equal(actual);

  });

  it('should return game not ended', function(){

    const boardState = {
      '0,0' : 0, '0,1' : 0, '0,2' : 0,
      '1,0' : 0, '1,1' : 0, '1,2' : 1,
      '2,0' : 0, '2,1' : 0, '2,2' : 1
    };

    const expected = {
      gameEnded: false,
    };

    const actual = TttUtil.isGoalState({
      boardState
    });

    expected.should.deep.equal(actual);

  });

});

describe('TttUtil.nextMove', function(){

  it('should return correct next boardState', function(){
    const boardState = {
      '0,0' : 0, '0,1' : 0, '0,2' :  0,
      '1,0' : 0, '1,1' : 0, '1,2' :  0,
      '2,0' : 0, '2,1' : 0, '2,2' :  0
    };
    const move = '0,0';
    const player = -1;

    const expectedBoardState = {
      '0,0' : -1, '0,1' : 0, '0,2' :  0,
      '1,0' : 0, '1,1' : 0, '1,2' :  0,
      '2,0' : 0, '2,1' : 0, '2,2' :  0
    };
    const expected = {
      isIllegalMove:false,
      boardState:expectedBoardState,
      gameEnded: false,
    };
    const actual = TttUtil.nextMove({boardState,move,player});
    expected.should.deep.equal(actual);

  });

  it('should return correct next boardState', function(){
    const boardState = {
      '0,0' : 0, '0,1' : 0, '0,2' :  0,
      '1,0' : 0, '1,1' : 0, '1,2' :  1,
      '2,0' : 0, '2,1' : 0, '2,2' : -1
    };
    const move = '0,0';
    const player = 1;

    const expectedBoardState = {
      '0,0' : 1, '0,1' : 0, '0,2' :  0,
      '1,0' : 0, '1,1' : 0, '1,2' :  1,
      '2,0' : 0, '2,1' : 0, '2,2' : -1
    };
    const expected = {
      isIllegalMove:false,
      boardState:expectedBoardState,
      gameEnded: false,
    };
    const actual = TttUtil.nextMove({boardState,move,player});
    expected.should.deep.equal(actual);

  });

  it('should return correct next boardState with gameEnded true', function(){
    const boardState = {
      '0,0' : 0, '0,1' :  0, '0,2' :  0,
      '1,0' : 0, '1,1' :  1, '1,2' :  1,
      '2,0' : 0, '2,1' : -1, '2,2' : -1
    };
    const move = '1,0';
    const player = 1;

    const expectedBoardState = {
      '0,0' : 0, '0,1' :  0, '0,2' :  0,
      '1,0' : 1, '1,1' :  1, '1,2' :  1,
      '2,0' : 0, '2,1' : -1, '2,2' : -1
    };
    const expected = {
      isIllegalMove:false,
      boardState: expectedBoardState,
      gameEnded: true,
      winner: 1,
      winningPosition: [
        '1,0',
        '1,1',
        '1,2',
      ]
    };
    const actual = TttUtil.nextMove({boardState,move,player});
    expected.should.deep.equal(actual);

  });


  it('should return isIllegalMove true', function(){
    const boardState = {
      '0,0' : 0, '0,1' :  0, '0,2' :  0,
      '1,0' : 0, '1,1' :  1, '1,2' :  1,
      '2,0' : 0, '2,1' : -1, '2,2' : -1
    };
    const move = '1,2';
    const player = 1;

    const expected = {
      isIllegalMove:true,
    };
    const actual = TttUtil.nextMove({boardState,move,player});
    expected.should.deep.equal(actual);

  });

});

describe('TttUtil.getSuccessorsStates', function(){

  it('should return correct next boardState', function(){
    const boardState = {
      '0,0' : 1, '0,1' : -1, '0,2' :  1,
      '1,0' : 0, '1,1' : -1, '1,2' :  0,
      '2,0' : 0, '2,1' :  1, '2,2' : -1
    };
    const player = -1;

    const b1 = {
      '0,0' :  1, '0,1' : -1, '0,2' :  1,
      '1,0' : -1, '1,1' : -1, '1,2' :  0,
      '2,0' :  0, '2,1' :  1, '2,2' : -1
    };
    const b2 = {
      '0,0' :  1, '0,1' : -1, '0,2' :  1,
      '1,0' :  0, '1,1' : -1, '1,2' : -1,
      '2,0' :  0, '2,1' :  1, '2,2' : -1
    };
    const b3 = {
      '0,0' :  1, '0,1' : -1, '0,2' :  1,
      '1,0' :  0, '1,1' : -1, '1,2' :  0,
      '2,0' : -1, '2,1' :  1, '2,2' : -1
    };
    const expected = [b1, b2 ,b3];
    const actual = TttUtil.getSuccessorsStates({boardState,player});
    expected.should.deep.equal(actual);

  });

});

describe('TttUtil.calcScores', function(){
  it('should ', function(){
    const boardState = {
      '0,0' : 1, '0,1' : -1, '0,2' :  1,
      '1,0' : 0, '1,1' : -1, '1,2' :  0,
      '2,0' : 0, '2,1' :  1, '2,2' : -1
    };
    const player = 1;
    const expected = 1;
    const actual = TttUtil.calcScores({boardState,player,originalPlayer:player});
    expected.should.deep.equal(actual);
  });
});

// getSuccessorsStates
