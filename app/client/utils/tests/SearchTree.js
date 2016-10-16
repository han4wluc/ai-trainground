
import SearchTree from '../SearchTree';
import chai from 'chai';
const should = chai.should();


/**
 * Static Methods
 */
describe('SearchTree.generateInitialGridState', function(){
  it('should generate gridState with correct keys', function(){

    const expectedState = {
      x0y0: {}, x1y0: {}, x2y0: {}, x3y0: {},
      x0y1: {}, x1y1: {}, x2y1: {}, x3y1: {},
      x0y2: {}, x1y2: {}, x2y2: {}, x3y2: {},
      x0y3: {}, x1y3: {}, x2y3: {}, x3y3: {},
    };

    const expectedKeys = Object.keys(expectedState);

    const actualGridState = SearchTree.generateInitialGridState({
      columns: 4,
      rows: 4,
    });

    const actualKeys = Object.keys(actualGridState);

    expectedKeys.should.deep.equal(actualKeys);

  });
});


/**
 * Private Methods
 */
describe('SearchTree._getStartCoordinate', function(){

  it('should return correct coordinate', function(){
    const gridState = {
      x0y0: {}, x1y0: {}, x2y0: {}, x3y0: {},
      x0y1: {}, x1y1: {}, x2y1: {}, x3y1: {},
      x0y2: {}, x1y2: {}, x2y2: {}, x3y2: {isStart:true},
      x0y3: {}, x1y3: {}, x2y3: {}, x3y3: {},
    };

    const searchTree = new SearchTree({
      gridState,
    });

    const actualCoordinate = searchTree._getStartCoordinate();

    const expectedCoordinate = { x: 3, y: 2};
    expectedCoordinate.should.deep.equal(actualCoordinate);

  });

});

describe('SearchTree._getGoalCoordinate', function(){

  it('should return correct coordinate', function(){
    const gridState = {
      x0y0: {}, x1y0: {}, x2y0: {}, x3y0: {},
      x0y1: {}, x1y1: {}, x2y1: {}, x3y1: {},
      x0y2: {}, x1y2: {}, x2y2: {}, x3y2: {isGoal:true},
      x0y3: {}, x1y3: {}, x2y3: {}, x3y3: {},
    };

    const searchTree = new SearchTree({
      gridState,
    });

    const actualCoordinate = searchTree._getGoalCoordinate();

    const expectedCoordinate = { x: 3, y: 2};
    expectedCoordinate.should.deep.equal(actualCoordinate);

  });

});

describe('SearchTree._isGoalState', function(){

  it('should return true', function(){
    const gridState = {
      x0y0: {}, x1y0: {}, x2y0: {}, x3y0: {},
      x0y1: {}, x1y1: {}, x2y1: {}, x3y1: {},
      x0y2: {}, x1y2: {}, x2y2: {}, x3y2: {isGoal:true},
      x0y3: {}, x1y3: {}, x2y3: {}, x3y3: {},
    };

    const searchTree = new SearchTree({
      gridState,
    });

    const coordinate = { x:3, y:2 };
    const actual = searchTree._isGoalState({coordinate});
    true.should.equal(actual);

  });

  it('should return false', function(){
    const gridState = {
      x0y0: {}, x1y0: {}, x2y0: {}, x3y0: {},
      x0y1: {}, x1y1: {}, x2y1: {}, x3y1: {},
      x0y2: {}, x1y2: {}, x2y2: {}, x3y2: {isGoal:true},
      x0y3: {}, x1y3: {}, x2y3: {}, x3y3: {},
    };

    const searchTree = new SearchTree({
      gridState,
    });

    const coordinate = { x:2, y:2 };
    const actual = searchTree._isGoalState({coordinate});
    false.should.equal(actual);

  });

});


describe('SearchTree._getCost', function(){

  it('should return 0', function(){
    const gridState = {
      x0y0: {}, x1y0: {},
      x0y1: {}, x1y1: {cost:1},
    };
    const searchTree = new SearchTree({
      gridState,
    });
    let coordinate;
    const actual = searchTree._getCost({ coordinate });
    (0).should.equal(actual);
  });

  it('should return 1', function(){
    const gridState = {
      x0y0: {}, x1y0: {},
      x0y1: {}, x1y1: {cost:1},
    };
    const searchTree = new SearchTree({
      gridState,
    });
    const coordinate = {x:1,y:1};
    const actual = searchTree._getCost({ coordinate });
    (1).should.equal(actual);
  });

});


