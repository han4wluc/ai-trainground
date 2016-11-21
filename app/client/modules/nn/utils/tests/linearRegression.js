
import * as NnUtil from '../.';
import math from 'mathjs';

import chai from 'chai';
const should = chai.should();

describe('hypothesis', function(){
  it('should', function(){
    const X = math.matrix([
      [1, 2, 3],
      [1, 3, 4],
      [1, 4, 5],
      [1, 5, 6]
    ]);
    const theta = math.matrix([
      [0],
      [1],
      [2]
    ]);
    const expected = math.matrix([
      [8],
      [11],
      [14],
      [17]
    ]);
    const h = NnUtil.hypothesis(X, theta);
    h.should.deep.equal(expected);
  });
});

describe('thissss', function(){
  it('should', function(){
    const X = math.matrix([[1, 2],
                  [1, 3],
                  [1, 4],
                  [1, 5]])
    const y = math.matrix([[ 7.],
                  [ 6.], 
                  [ 5.], 
                  [ 4.]]);
    const theta = math.matrix([[0.1],
                      [0.2]])
    const expected = 11.9450;
    const actual = NnUtil.computeCost(X, y, theta);
    actual.should.equal(expected);
  });
});


