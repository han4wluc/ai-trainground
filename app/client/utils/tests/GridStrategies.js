

import * as Calc from '../Calc';
import chai from 'chai';
import * as GridStrategies from '../GridStrategies';
const should = chai.should();

describe('GridStrategies._computeManhattanDistance', function(){
  it('should return correct diagonal distance', function(){
    const start = { x:1, y:1 };
    const end   = { x:2, y:2 };

    const actual = GridStrategies._computeManhattanDistance({start,end});
    const expected = 2;
    expected.should.equal(actual);

  });

  it('should return correct vertical distance', function(){
    const start = { x:1, y:1 };
    const end   = { x:1, y:2 };

    const actual = GridStrategies._computeManhattanDistance({start,end});
    const expected = 1;
    expected.should.equal(actual);
  });

  it('should return correct horizontal distance', function(){
    const start = { x:1, y:1 };
    const end   = { x:2, y:1 };

    const actual = GridStrategies._computeManhattanDistance({start,end});
    const expected = 1;
    expected.should.equal(actual);
  });

  it('should return distance 0', function(){
    const start = { x:1, y:1 };
    const end   = { x:1, y:1 };

    const actual = GridStrategies._computeManhattanDistance({start,end});
    const expected = 0;
    expected.should.equal(actual);

  });
});

describe('GridStrategies.BFS', function(){
  it('should do FIFO', function(){
    const finges = [1,2,3];
    const [actualNode, actualFinges] = GridStrategies.BFS({finges});
    (1).should.equal(actualNode);
    [2,3].should.deep.equal(actualFinges);
  });
});

describe('GridStrategies.DFS', function(){
  it('should do FILO', function(){
    const finges = [1,2,3];
    const [actualNode, actualFinges] = GridStrategies.DFS({finges});
    (3).should.equal(actualNode);
    [1,2].should.deep.equal(actualFinges);
  });
});

describe('GridStrategies.greedy', function(){
  it('should do DFS', function(){
    const node1 = { coordinate: { x:0, y:0 } };
    const node2 = { coordinate: { x:1, y:0 } };
    const node3 = { coordinate: { x:0, y:1 } };
    const finges = [node1, node2, node3];
    const goalCoordinate = { x:1, y:1 };
    const [actualNode, actualFinges] = GridStrategies.greedy({finges, goalCoordinate});
    node2.should.deep.equal(actualNode);
  });
});



