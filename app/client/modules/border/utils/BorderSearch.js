
import BorderUtil from './BorderUtil';

export default class BorderSearch {

  constructor(params) {

    const {
      nodes,
      links,
    } = params;

    this._nodes = nodes;
    this._links = links;
    this._expansions = 0;
    // this._nodes = initialNodes;
    // this._links = initialLinks;

    this._finges = BorderUtil.getSuccessors({nodes:this._nodes});
    console.log(this._finges)
    this._history　=　[JSON.stringify(this._nodes)];
  }

  next(){
    // BFS
    const newNodes = this._finges[0];
    this._finges = this._finges.slice(1,this._finges.length);

    // DFS
    // const newNodes = this._finges[this._finges.length-1];
    // this._finges = this._finges.slice(0,this._finges.length-1);

    // graph search
    if(this._history.indexOf(JSON.stringify(newNodes)) !== -1){
      return {
        isGoal: false,
        nodes: newNodes,
        expansions: this._expansions,
      };
    }
    this._expansions++;

    const finges = BorderUtil.getSuccessors({nodes:newNodes});
    this._finges = this._finges.concat(finges);

    const res = BorderUtil.isGoalState({nodes:newNodes,links:this._links});

    this._history.push(JSON.stringify(newNodes));
    return {
      isGoal: res.isGoal,
      nodes: newNodes,
      expansions: this._expansions,
      // node,
      // color,
    };


  }



}

