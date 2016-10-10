
import MazeUtil from './MazeUtil';
import { Utils } from '../../..';
const {
  GridUtil
} = Utils;


const directionMax = function(input){
  let max = 0;
  for(let k in input){
    if(input[k]>max){
      max = input[k];
    }
  }
  return max;
};

const rnd = function(input){
  return Math.round(input * 100)/100;
}

const addDirs = function(dir1, dir2, dir3){
  return {
    left: rnd(dir1.left * 0.8 + dir2.left * 0.1 + dir3.left * 0.1),
    right: rnd(dir1.right * 0.8 + dir2.right * 0.1 + dir3.right * 0.1),
    top: rnd(dir1.top * 0.8 + dir2.top * 0.1 + dir3.top * 0.1),
    bottom: rnd(dir1.bottom * 0.8 + dir2.bottom * 0.1 + dir3.bottom * 0.1),
  };
};

export default class MazeSearch {
  constructor(params) {
    const { mazeState, livingReward } = params;
    this._mazeState = mazeState;
    this._iterations = 0;
    this._history = {};
  }

  _expectMax(params){
    const { cell, key:coordinateKey, mazeState, k, depth, decayRate, } = params;

    // console.log('this._history', this._history);
    if(_.has(this._history, coordinateKey+'_'+(depth+1))){
      // console.log('aaa');
      // return this._history[coordinateKey+'_'+(depth+1)];
    }

    this._iterations++;


    if(!cell){
      return {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
      };
      // return 0;
    }

    if(cell.isGoal){
      // utilities[coor] = cell.reward;
      // console.log('decayRate * depth', decayRate,depth)
      const rew = cell.reward - (decayRate * depth);
      return {
        right: rew,
        left: rew,
        top: rew,
        bottom: rew,
      };
      return cell.reward - (decayRate * depth);
    }
    if(depth >= k){
      return {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
      };
      return 0;
    }

    // console.log('key', key);
    const directions = MazeUtil.getAdjacentCoordiantes({coordinateKey:coordinateKey});

    // console.log('directions.right', directions.right);
    // const rightKey = GridUtil.coorToKey(directions.right);
    // const rightKey = GridUtil.coorToKey(directions.right);
    // console.log('directions', directions);

    const probabilities = {};
    probabilities.top = ['top','left','right'];
    probabilities.bottom = ['bottom','left','right'];
    probabilities.left = ['left','top','bottom'];
    probabilities.right = ['right','top','bottom'];

    let self = this;
    const utilities = Object.keys(['top','left','bottom','right']).map((i)=>{
      let key = ['top','left','bottom','right'][i];

      const probability = probabilities[key];

      const direc1 = probability[0];
      const direc2 = probability[1];
      const direc3 = probability[2];

      //possiblity1
      const coorKey1 = GridUtil.coorToKey(directions[direc1]);
      const expct1 = self._expectMax({
        cell:mazeState[coorKey1],
        k: k,
        depth: depth+1,
        key: coorKey1,
        mazeState,
        decayRate,
      });

      const coorKey2 = GridUtil.coorToKey(directions[direc2]);
      const expct2 = self._expectMax({
        cell:mazeState[coorKey2],
        k: k,
        depth: depth+1,
        key: coorKey2,
        mazeState,
        decayRate,
      });

      const coorKey3 = GridUtil.coorToKey(directions[direc3]);
      const expct3 = self._expectMax({
        cell:mazeState[coorKey3],
        k: k,
        depth: depth+1,
        key: coorKey3,
        mazeState,
        decayRate,
      });


      // console.log({
      //   direction: key,
      //   expct,
      // });

      // const res = {
      //   right: 0,
      //   left: 0,
      //   top: 0,
      //   bottom: 0,
      // };

      // return res;

      const expct = addDirs(expct1, expct2, expct3);

      this._history[coordinateKey+'_'+(depth+1)] = expct;

      return expct;

      // return expct;
    });

    // console.log('utilities', utilities);


    return {
      top: directionMax(utilities[0]),
      left: directionMax(utilities[1]),
      bottom: directionMax(utilities[2]),
      right: directionMax(utilities[3]),
    };
    // return utilities[0];

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
    // const key = 'x2y0';


    for(let key in this._mazeState){
      let cell = mazeState[key];
      if(!cell || cell.isWall){ continue; }
      utilities[key] = this._expectMax({
        mazeState,
        cell,
        key:key,
        k:3,
        depth: 0,
        // reward: 0,
        decayRate: 0.1,
      });
    }

    console.log('iterations', this._iterations);

    console.log('u2', utilities);

    return utilities;
  }
}


