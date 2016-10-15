
import BaseGrid from '../BaseGrid';
import chai from 'chai';
const should = chai.should();

/**
 * Static Methods
 */
describe('BaseGrid.keyToCoor', function(){
  it('should return correct coordinate', function(){
    const expected = { x:2, y:3};
    const actual = BaseGrid.keyToCoor({key:'x2y3'});
    expected.should.deep.equal(actual);
  });
});

describe('BaseGrid.coorToKey', function(){
  it('should return correct key', function(){
    const expected = 'x2y3';
    const actual = BaseGrid.coorToKey({x:2,y:3});
    expected.should.deep.equal(actual);
  });
});


/**
 * Constructor
 */
describe('BaseGrid constructor', function(){

  it('should throw error', function(){
    (() => { new BaseGrid({}); }).should.throw(Error);
  });

  it('should set this._gridState', function(){
    const gridState = { x0y0: {} };
    const baseGrid = new BaseGrid({
      gridState,
    });
    gridState.should.deep.equal(baseGrid._gridState);
  });

});


/**
 * Private Methods
 */
describe('BaseGrid._getCoordinateWith', function(){

  it('should get correct coordinate', function(){

    const gridState = {
      x0y0: {}, x1y0: {isStart:true}
    };

    const baseGrid = new BaseGrid({
      gridState,
    });

    const expectedCoordinate = {x:1,y:0};
    const actualCoordinate = baseGrid._getCoordinateWith({propName: 'isStart'});
    expectedCoordinate.should.deep.equal(expectedCoordinate);

  });

});

