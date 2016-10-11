
import GridUtil from '../gridUtil';
import chai from 'chai';
const should = chai.should();

describe('GridUtil.keyToCoor', function(){
  it('should', function(){
    const expected = { x:2, y:3};
    const actual = GridUtil.keyToCoor({key:'x2y3'});
    expected.should.deep.equal(actual);
  });
});

describe('GridUtil.coorToKey', function(){
  it('should', function(){
    const expected = 'x2y3';
    const actual = GridUtil.coorToKey({x:2,y:3});
    expected.should.deep.equal(actual);
  });
});

describe('GridUtil.generateInitialGridState', function(){
  it('should succeed', function(){
    const gridState = GridUtil.generateInitialGridState({
      columns: 4,
      rows: 4,
    });

    const expectedState = {
      x0y0: {}, x1y0: {}, x2y0: {}, x3y0: {},
      x0y1: {}, x1y1: {}, x2y1: {}, x3y1: {},
      x0y2: {}, x1y2: {}, x2y2: {}, x3y2: {},
      x0y3: {}, x1y3: {}, x2y3: {}, x3y3: {},
    };
    // console.log(gridState);
    Object.keys(gridState).should.deep.equal(Object.keys(expectedState));

  });
});

describe('GridUtil.getStartCoordinate', function(){

  it('should return correct coordinate', function(){
    const gridState = {
      x0y0: {}, x1y0: {}, x2y0: {}, x3y0: {},
      x0y1: {}, x1y1: {}, x2y1: {}, x3y1: {},
      x0y2: {}, x1y2: {}, x2y2: {}, x3y2: {isStart:true},
      x0y3: {}, x1y3: {}, x2y3: {}, x3y3: {},
    };

    const coordinate = GridUtil.getStartCoordinate({gridState});

    const expectedCoordinate = { x: 3, y: 2};
    expectedCoordinate.should.deep.equal(coordinate);

  });

  it('should should return undefined if no initial coordinate', function(){
    const gridState = {
      x0y0: {}, x1y0: {}, x2y0: {}, x3y0: {},
      x0y1: {}, x1y1: {}, x2y1: {}, x3y1: {},
      x0y2: {}, x1y2: {}, x2y2: {}, x3y2: {},
      x0y3: {}, x1y3: {}, x2y3: {}, x3y3: {},
    };

    const coordinate = GridUtil.getStartCoordinate({gridState});

    should.not.exist(coordinate);

  });

});

describe('GridUtil.isGoalState', function(){

  it('should ', function(){
    const gridState = {
      x0y0: {}, x1y0: {}, x2y0: {}, x3y0: {},
      x0y1: {}, x1y1: {}, x2y1: {}, x3y1: {isGoal:true},
      x0y2: {}, x1y2: {}, x2y2: {}, x3y2: {},
      x0y3: {}, x1y3: {}, x2y3: {}, x3y3: {},
    };

    let coordinate = {x:3,y:1};
    GridUtil.isGoalState({gridState,coordinate}).should.equal(true);

    coordinate = {x:3,y:2};
    GridUtil.isGoalState({gridState,coordinate}).should.equal(false);

  });

});

describe('GridUtil.getSuccessor', function(){
  it('should succeed', function(){
    const gridState = {
      x0y0: {}, x1y0: {}, x2y0: {}, x3y0: {},
      x0y1: {}, x1y1: {}, x2y1: {}, x3y1: {},
      x0y2: {}, x1y2: {}, x2y2: {}, x3y2: {},
      x0y3: {}, x1y3: {}, x2y3: {}, x3y3: {},
    };

    let coordinate = {x:0, y:0};
    let finges = GridUtil.getSuccessor({
      gridState,
      coordinate,
    });
    let expectedFinges = [ { x: 1, y: 0 }, { x: 0, y: 1 } ];

    expectedFinges.should.deep.equal(finges);

    coordinate = {x:2, y:2};
    finges = GridUtil.getSuccessor({
      gridState,
      coordinate,
    });
    expectedFinges = [
      { x: 1, y: 2 }, { x: 3, y: 2 },
      { x: 2, y: 1 }, { x: 2, y: 3 } ];
    expectedFinges.should.deep.equal(finges);

  });

  it('should succeed not return walls', function(){
    const gridState = {
      x0y0: {}, x1y0: { isWall: true}, x2y0: {}, x3y0: {},
      x0y1: {}, x1y1: {}, x2y1: {}, x3y1: {},
      x0y2: {}, x1y2: {}, x2y2: {}, x3y2: {},
      x0y3: {}, x1y3: {}, x2y3: {}, x3y3: {},
    };

    let coordinate = {x:0, y:0};
    let finges = GridUtil.getSuccessor({
      gridState,
      coordinate,
    });
    let expectedFinges = [ { x: 0, y: 1 } ];

    expectedFinges.should.deep.equal(finges);

  });

});

describe('GridUtil.getGridKeys', function(){

  it('should ', function(){

    const expected = [
      'x0y0','x1y0','x2y0',
      'x0y1','x1y1','x2y1',
      'x0y2','x1y2','x2y2',
    ];

    const actual = GridUtil.getGridKeys({columns:3,rows:3});

    expected.should.deep.equal(actual);

  });

});


