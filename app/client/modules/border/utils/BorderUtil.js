
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

const getSuccessors = function(params){
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

export default {
  isGoalState,
  getSuccessors,
};
