
import BorderUtil from '../BorderUtil';
import getSuccessorsExpectedJson from './getSuccessorsExpected.js';

import chai from 'chai';
const should = chai.should();

describe('BorderUtil.getSuccessors', function(){
  it('should return all non-white nodes', function(){

    const nodes = [
      { id:1, color: 'white' },
      { id:2, color: 'white' },
      { id:3, color: 'white' },

      { id:4, color: 'white' },
      { id:5, color: 'white' },
      { id:6, color: 'red' },
    ];

    const actual = BorderUtil.getSuccessors({nodes:nodes});
    getSuccessorsExpectedJson.should.deep.equal(actual);
  });

  it('should return empty array when all nodes are filled', function(){

    const nodes = [
      { id:1, color: 'red' },
      { id:2, color: 'blue' },
      { id:3, color: 'green' },
      { id:4, color: 'green' },
      { id:5, color: 'blue' },
      { id:6, color: 'red' },
    ];

    const expected = [];
    const actual = BorderUtil.getSuccessors({nodes:nodes});
    expected.should.deep.equal(actual);
  });

});

describe('BorderUtil.isGoalState', function(){
  const links = [
    { fr:1, to:2 },
    { fr:1, to:3 },
    { fr:2, to:3 },
    { fr:2, to:4 },
    { fr:3, to:4 },
    { fr:3, to:5 },
    { fr:3, to:6 },
    { fr:4, to:5 },
    { fr:5, to:6 },
  ];

  it('should return isGoal false', function(){
    const nodes = [
      { id:1, color: 'white' },
      { id:2, color: 'white' },
      { id:3, color: 'white' },
      { id:4, color: 'white' },
      { id:5, color: 'white' },
      { id:6, color: 'red' },
    ];
    const expected = { isGoal: false };
    const actual = BorderUtil.isGoalState({nodes,links});
    expected.should.deep.equal(actual);
  });

  it('should return isGoal false', function(){
    const nodes = [
      { id:1, color: 'red' },
      { id:2, color: 'green' },
      { id:3, color: 'blue' },
      { id:4, color: 'red' },
      { id:5, color: 'geren' },
      { id:6, color: 'white' },
    ];
    const expected = { isGoal: false };
    const actual = BorderUtil.isGoalState({nodes,links});
    expected.should.deep.equal(actual);
  });

  it('should return isGoal false', function(){
    const nodes = [
      { id:1, color: 'red' },
      { id:2, color: 'red' },
      { id:3, color: 'green' },
      { id:4, color: 'green' },
      { id:5, color: 'green' },
      { id:6, color: 'red' },
    ];
    const expected = { isGoal: false };
    const actual = BorderUtil.isGoalState({nodes,links});
    expected.should.deep.equal(actual);
  });

  it('should return isGoal true', function(){
    const nodes = [
      { id:1, color: 'red' },
      { id:2, color: 'blue' },
      { id:3, color: 'yellow' },
      { id:4, color: 'red' },
      { id:5, color: 'green' },
      { id:6, color: 'red' },
    ];
    const expected = { isGoal: true };
    const actual = BorderUtil.isGoalState({nodes,links});
    expected.should.deep.equal(actual);
  });

});


describe('BorderUtil._colorNode', function(){
  it('should return valid', function(){
    const nodes = [
      { id:1, color: 'white' },
      { id:2, color: 'white' },
      { id:3, color: 'white' },
      { id:4, color: 'white' },
      { id:5, color: 'white' },
      { id:6, color: 'red' },
    ];
    const color = 'red';
    const node = 1;
    const expectedNode = [
      { id:1, color: 'red' },
      { id:2, color: 'white' },
      { id:3, color: 'white' },
      { id:4, color: 'white' },
      { id:5, color: 'white' },
      { id:6, color: 'red' },
    ];
    const expected = { isValid: true, nodes: expectedNode };
    const actual = BorderUtil._colorNode({nodes,node,color,});
    expected.should.deep.equal(actual);
  });

  it('should return invalid move', function(){
    const nodes = [
      { id:1, color: 'white' },
      { id:2, color: 'white' },
      { id:3, color: 'white' },
      { id:4, color: 'white' },
      { id:5, color: 'white' },
      { id:6, color: 'blue' },
    ];
    const color = 'red';
    const node = 6;
    const expected = { isValid: false, nodes };
    const actual = BorderUtil._colorNode({nodes,node,color,});
    expected.should.deep.equal(actual);
  });

});


describe('BorderUtil.isConstrainViolated', function(){
  const links = [
    { fr:1, to:2 },
    { fr:1, to:3 },
    { fr:2, to:3 },
    { fr:2, to:4 },
    { fr:3, to:4 },
    { fr:3, to:5 },
    { fr:3, to:6 },
    { fr:4, to:5 },
    { fr:5, to:6 },
  ];

  it('should return isViolated false', function(){
    const nodes = [
      { id:1, color: 'white' },
      { id:2, color: 'white' },
      { id:3, color: 'white' },
      { id:4, color: 'white' },
      { id:5, color: 'white' },
      { id:6, color: 'red' },
    ];
    const expected = { isViolated: false, };
    const actual = BorderUtil.isConstrainViolated({nodes,links,});
    expected.should.deep.equal(actual);
  });

  it('should return isViolated false', function(){
    const nodes = [
      { id:1, color: 'red' },
      { id:2, color: 'green' },
      { id:3, color: 'blue' },
      { id:4, color: 'red' },
      { id:5, color: 'green' },
      { id:6, color: 'red' },
    ];
    const expected = { isViolated: false, };
    const actual = BorderUtil.isConstrainViolated({nodes,links,});
    expected.should.deep.equal(actual);
  });

  it('should return isViolated true', function(){
    const nodes = [
      { id:1, color: 'white' },
      { id:2, color: 'white' },
      { id:3, color: 'white' },
      { id:4, color: 'white' },
      { id:5, color: 'red' },
      { id:6, color: 'red' },
    ];
    const expected = { isViolated: true, };
    const actual = BorderUtil.isConstrainViolated({nodes,links,});
    expected.should.deep.equal(actual);
  });

});

