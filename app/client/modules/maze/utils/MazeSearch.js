
import MazeUtil from './MazeUtil';
import { Utils } from '../../..';
const {
  GridUtil
} = Utils;

export default class MazeSearch {
  constructor(params) {
    const { mazeState, livingReward } = params;
    this._mazeState = mazeState;
    this._iterations = 0;
  }

  _expectMax(params){
    this._iterations++;
    const { cell, key, mazeState, k, depth, decayRate, } = params;

    if(!cell){ return 0; }

    if(cell.isGoal){
      // utilities[coor] = cell.reward;
      // console.log('decayRate * depth', decayRate,depth)
      return cell.reward - (decayRate * depth);
    }
    if(depth >= k){
      return 0;
    }

    const directions = MazeUtil.getAdjacentCoordiantes({coordinateKey:key});

    // console.log('directions.right', directions.right);
    // const rightKey = GridUtil.coorToKey(directions.right);
    // const rightKey = GridUtil.coorToKey(directions.right);
    // console.log('directions', directions);

    let self = this;
    const utilities = Object.keys(directions).map((key)=>{
      // console.log(key);
      const coorKey = GridUtil.coorToKey(directions[key]);
      const expct = self._expectMax({
        cell:mazeState[coorKey],
        k: k,
        depth: depth+1,
        key: coorKey,
        mazeState,
        decayRate,
        // reward: reward - (decayRate*depth),
      });
      return expct;
    });

    // console.log('utilities', utilities);


    const max = Math.max(...utilities);
    // console.log('max', max);
    return Math.round((max) *10 )/10;
    // console.log('expct', expct);
    // expect max of cell in the right
    // return 0;
  }

  next(){

    const mazeState = this._mazeState;
    const utilities = {};
    // const key = 'x1y0';


    for(let key in this._mazeState){
      let cell = mazeState[key];
      if(!cell || cell.isWall){ continue; }
      utilities[key] = this._expectMax({
        mazeState,
        cell,
        key:key,
        k:5,
        depth: 0,
        // reward: 0,
        decayRate: 0.2,
      });
    }

    console.log('iterations', this._iterations);

    console.log('u2', utilities);

    return utilities;
  }
}


