
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
