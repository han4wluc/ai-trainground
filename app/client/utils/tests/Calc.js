
import * as Calc from '../Calc';
import chai from 'chai';
const should = chai.should();

describe('Calc.computeManhattanDistance', function(){
  it('should return correct diagonal distance', function(){
    const start = { x:1, y:1 };
    const end   = { x:2, y:2 };

    const actual = Calc.computeManhattanDistance({start,end});
    const expected = 2;
    expected.should.equal(actual);

  });

  it('should return correct vertical distance', function(){
    const start = { x:1, y:1 };
    const end   = { x:1, y:2 };

    const actual = Calc.computeManhattanDistance({start,end});
    const expected = 1;
    expected.should.equal(actual);
  });

  it('should return correct horizontal distance', function(){
    const start = { x:1, y:1 };
    const end   = { x:2, y:1 };

    const actual = Calc.computeManhattanDistance({start,end});
    const expected = 1;
    expected.should.equal(actual);
  });

  it('should return distance 0', function(){
    const start = { x:1, y:1 };
    const end   = { x:1, y:1 };

    const actual = Calc.computeManhattanDistance({start,end});
    const expected = 0;
    expected.should.equal(actual);

  });
});
