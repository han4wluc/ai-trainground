
import _ from 'lodash';

const isGoalState = function(params){
  const {
    nodes, links
  } = params;

  for(let i in links){
    const { fr, to } = links[i];
    const node1 = _.find(nodes, { id: fr });
    const node2 = _.find(nodes, { id: to });

    if(node1.color === 'white' ||
       node2.color === 'white' ||
       node1.color === node2.color){
      return {
        isGoal: false,
      };
    }
  }

  return {
    isGoal: true,
  };

};

const isConstrainViolated = function(params){
  const {
    nodes, links
  } = params;

  for(let i in links){
    const { fr, to } = links[i];
    const node1 = _.find(nodes, { id: fr });
    const node2 = _.find(nodes, { id: to });

    if(node1.color === 'white' || node2.color === 'white'){
      continue;
    }

    if(node1.color === node2.color){
      return {
        isViolated: true,
      };
    }
  }

  return {
    isViolated: false,
  };
};

const _colorNode = function(params){
  const {
    nodes,
    node: nodeId,
    color,
  } = params;
  const newNodes = _.cloneDeep(nodes);
  const node = _.find(newNodes, { id: nodeId});
  if(node.color !== 'white'){
    console.log('invalid move, node already colored');
    return {
      isValid: false,
      nodes,
    };
  }
  node.color = color;
  return {
    isValid: true,
    nodes: newNodes
  };
};

// filtering forward checking
// get all white nodes
// get successorsMoves
// filter only valid successorsMoves
// check that each white node has a possible move
const forwardCheck = function(params){
  const { nodes, links } = params;

  const whiteNodes = [];

  const openOptions = {};
  nodes.forEach((node)=>{
    if(node.color === 'white'){
      whiteNodes.push(node.id);
    }
  });

  const successorsMoves = _getSuccessorsMoves({nodes}).filter((node)=>{
    const newNodes = _colorNode({nodes, node:node.node, color: node.color}).nodes;

    const { isViolated } = isConstrainViolated({nodes:newNodes, links});

    return !isViolated;
  });

  for(let i in whiteNodes){
    let nodeId = whiteNodes[i];

    let index = _.findIndex(successorsMoves, { node: nodeId});
    if(index === -1){
      return {
        isViolated: true,
      };
    }
  }

  return {
    isViolated: false,
  };
};

const _getSuccessorsMoves = function(params){
  const { nodes } = params;
  return nodes.filter((n)=>{
    return n.color === 'white';
  }).map((n)=>{
    return [
      {node:n.id,color:'red'},
      {node:n.id,color:'green'},
      {node:n.id,color:'blue'},
    ];
  }).reduce((p,n) => p.concat(n), []);
};

const getSuccessors = function(params){
  const { nodes } = params;
  return _getSuccessorsMoves({nodes}).map((n)=>{
    return _colorNode({nodes, node:n.node, color:n.color }).nodes;
  });
};

export default {
  isGoalState,
  getSuccessors,
  isConstrainViolated,
  forwardCheck,
  _colorNode,
};
