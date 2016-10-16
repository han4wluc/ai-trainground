

import chai from 'chai';
import * as GridStrategies from '../GridStrategies';
const should = chai.should();

describe('GridStrategies._computeManhattanDistance', function(){

  it('should return 0', function(){
    let start;
    const end   = { x:2, y:2 };

    const actual = GridStrategies._computeManhattanDistance({start,end});
    const expected = 0;
    expected.should.equal(actual);

  });

  it('should return 0', function(){
    const start = { x:1, y:1 };
    let end;

    const actual = GridStrategies._computeManhattanDistance({start,end});
    const expected = 0;
    expected.should.equal(actual);

  });

  it('should return correct diagonal distance', function(){
    const start = { x:1, y:1 };
    const end   = { x:2, y:2 };

    const actual = GridStrategies._computeManhattanDistance({start,end});
    const expected = 2;
    actual.should.equal(expected);

  });

  it('should return correct vertical distance', function(){
    const start = { x:1, y:1 };
    const end   = { x:1, y:2 };

    const actual = GridStrategies._computeManhattanDistance({start,end});
    const expected = 1;
    actual.should.equal(expected);
  });

  it('should return correct horizontal distance', function(){
    const start = { x:1, y:1 };
    const end   = { x:2, y:1 };

    const actual = GridStrategies._computeManhattanDistance({start,end});
    const expected = 1;
    actual.should.equal(expected);
  });

  it('should return distance 0', function(){
    const start = { x:1, y:1 };
    const end   = { x:1, y:1 };

    const actual = GridStrategies._computeManhattanDistance({start,end});
    const expected = 0;
    actual.should.equal(expected);

  });
});

describe('GridStrategies.BFS', function(){
  it('should do FIFO', function(){
    const finges = [1,2,3];
    const [actualNode, actualFinges] = GridStrategies.BFS({finges});
    actualNode.should.equal(1);
    actualFinges.should.deep.equal([2,3]);
  });
});

describe('GridStrategies.DFS', function(){
  it('should do FILO', function(){
    const finges = [1,2,3];
    const [actualNode, actualFinges] = GridStrategies.DFS({finges});
    (actualNode).should.equal(3);
    actualFinges.should.deep.equal([1,2]);
  });
});

describe('GridStrategies.greedy', function(){
  it('should do greedy', function(){
    const node1 = { heuristic: 1 };
    const node2 = { heuristic: 0 };
    const node3 = { heuristic: 2 };
    const finges = [node1, node2, node3];
    const [actualNode, actualFinges] = GridStrategies.greedy({finges});
    actualNode.should.deep.equal(node2);
    actualFinges.should.deep.equal([node1,node3]);
  });
});

describe('GridStrategies.uniform', function(){
  it('should do uniform', function(){
    const node1 = { cost: 2 };
    const node2 = { cost: 1 };
    const node3 = { cost: 3 };
    const finges = [node1, node2, node3];
    const [actualNode, actualFinges] = GridStrategies.uniform({finges});
    actualNode.should.deep.equal(node2);
    actualFinges.should.deep.equal([node1,node3]);
  });
});

describe('GridStrategies.astar', function(){
  it('should do astar', function(){
    const node1 = { heuristic: 2, cost: 2 }; // total 4
    const node2 = { heuristic: 1, cost: 1 }; // total 2
    const node3 = { heuristic: 1, cost: 3 }; // total 4
    const finges = [node1, node2, node3];
    const [actualNode, actualFinges] = GridStrategies.astar({finges});
    actualNode.should.deep.equal(node2);
    actualFinges.should.deep.equal([node1,node3]);
  });
});


