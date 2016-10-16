
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
    actual.should.deep.equal(expected);
  });
});

describe('BaseGrid.coorToKey', function(){
  it('should return correct key', function(){
    const expected = 'x2y3';
    const actual = BaseGrid.coorToKey({x:2,y:3});
    actual.should.deep.equal(expected);
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
    baseGrid._gridState.should.deep.equal(gridState);
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
    actualCoordinate.should.deep.equal(expectedCoordinate);

  });

});

describe('BaseGrid._getGridKeys', function(){

  it('should return true', function(){
    const gridState = {
      x0y0: {}, x1y0: {},
      x0y1: {}, x1y1: {},
    };
    const baseGrid = new BaseGrid({
      gridState,
    });

    const expectedKeys = ['x0y0', 'x1y0', 'x0y1', 'x1y1'];
    const actualKeys = baseGrid._getGridKeys();

    actualKeys.should.deep.equal(expectedKeys);

  });

});

