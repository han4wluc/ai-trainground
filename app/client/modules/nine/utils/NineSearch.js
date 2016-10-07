
import _ from 'lodash';

import NineUtil from './NineUtil';

export default class NineSearch {

  constructor(params) {
    // super(props);

    //
    const { boardState } = params;

    this._initialBoardState = _.cloneDeep(boardState);
    this._boardState = boardState;

    this._history = [JSON.stringify(boardState)];
    this._expansions = 0;
    this._minHeuristic = 9999;
    this.ended = false;
    this._path = [];

    // const successor = NineUtil.getSuccessor({boardState});

    // console.log('successor', successor);
    // successor.

    // const finges = successor.finges.map((f)=>{
    //   return {
    //     empty: successor.emptyIndex,
    //     path: [],
    //     move: f,
    //   };
    // });

    // this._finges = finges;

    // console.log('finges', finges);

    this._finges = NineUtil.getSuccessorStates({
      boardState: this._boardState
    });

    this._finges = this._finges.map((f)=>{
      return {
        ...f,
        path: [boardState],
        heuristic: NineUtil.computeHeuristics({boardState:f.boardState})
      };
    });

    // console.log('this._finges', this._finges);

  }

  next(){

    // console.log('this._finges', this._finges);

    this._expansions++;
    // console.log(this._finges[0].heuristic);
    const heuristic = NineUtil.computeHeuristics({boardState: this._boardState});


    if(this._expansions % 1000 === 0){
      console.log('_finge', this._finges);
      console.log(this._expansions, this._history.length, this._finges.length, heuristic, this._path.length);
    }

    if(heuristic < this._minHeuristic){
      this._minHeuristic = heuristic;
      console.log(this._expansions, this._history.length, this._finges.length, heuristic, this._path.length);
    }

    if(NineUtil.isGoalState({boardState:this._boardState})){
      if(this._ended){
        return {
          path: this._path,
        };
      }
      console.log('GOAL REACHED', this._boardState, this._path);
      this._ended = true;
      return {
        path: this._path,
      };
    }

    // console.log('')
    // console.log(this._finges);
    // const states = NineUtil.getSuccessorStates({
    //   boardState: this._boardState
    // }).filter((o)=>{
    //   const index = _.findIndex(this._history, o.boardState);
    //   return index === -1;
    //   // console.log(_.findIndex(this._history, o.boardState));
    //   // return !_.includes(this._history, o.boardState);
    // }).sort((p, n)=>{
    //   return p.heuristic > n.heuristic ? 1 : -1;
    //   // if(p.heuristic > )
    // });
    // console.log('states', states);
    // console.log(states[0].heuristic);

    // BFS
    const newBoard = _.cloneDeep(this._finges[0].boardState);
    const path = _.cloneDeep(this._finges[0].path);
    const newPath = path.concat(newBoard);

    // console.log('newBoard', newBoard);
    // console.log('newPath', newPath);
    let transRes;
    if(newPath.length > 1){
      for(let i=0; i<newPath.length-1;i++){
        transRes = NineUtil.getTransition({
          boardStateA: newPath[i],
          boardStateB: newPath[i+1],
        });
        if(!transRes.isValid){
          console.log('INVALID PATH');
          return;
        }
      }
      // newPath.forEach((p, i)=>{
      //   NineUtil.getTransition()
      // });
      // newPath
    }
    // NineUtil.getTransition

    this._path = newPath;


    this._finges = this._finges.slice(1,this._finges.length);

    // DFS
    // const newBoard = this._finges[this._finges.length-1].boardState;
    // const path = this._finges[this._finges.length-1].path;
    // this._finges = this._finges.slice(0,this._finges.length-1);




    this._finges = this._finges.concat(NineUtil.getSuccessorStates({
      boardState: newBoard
    })
    .filter((f) => {
      return this._history.indexOf(JSON.stringify(f.boardState)) === -1;
       // &&
       //  this._path.length < 16;
      // let a = !_.includes(this._history, f.boardState);
      // const index = _.findIndex(this._history, f.boardState);
      // console.log('index', index);
      // return index === -1;
      // const isPrevBoard = this._boardState !== f.boardState;

    })
    .map((f)=>{
      return {
        ...f,
        path: newPath,
        heuristic: NineUtil.computeHeuristics({boardState:f.boardState})
      };
    }))
    .sort((p,n)=>{
      return p.heuristic > n.heuristic ? 1 : -1;
    });

    this._boardState = newBoard;

    this._history.push(JSON.stringify(newBoard));
    return newBoard;
    // this._history.push(newBoard);
    // this._boardState = newBoard;
    // return newBoard;

  }


}
