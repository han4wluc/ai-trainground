
import GridUtil from '../gridUtil';

import chai from 'chai';
chai.should();

describe('tests should be working', function(){
  it('should succeed', function(){
    const gridState = GridUtil.generateInitialGridState({
      columns: 4,
      rows: 4,
    });

    const expectedState = {
      x0y0: {},
      x1y0: {},
      x2y0: {},
      x3y0: {},
      x0y1: {},
      x1y1: {},
      x2y1: {},
      x3y1: {},
      x0y2: {},
      x1y2: {},
      x2y2: {},
      x3y2: {},
      x0y3: {},
      x1y3: {},
      x2y3: {},
      x3y3: {}
    };
    // console.log(gridState);
    gridState.should.deep.equal(expectedState);

  });
});

