
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
};

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
    const { cell, key:coordinateKey, mazeState, k, depth, decayRate} = params;
    if(_.has(this._history, coordinateKey+'_'+(depth+1))){
      // return this._history[coordinateKey+'_'+(depth+1)];
    }
    this._iterations++;

    if(!cell){
      return 0;
    }

    if(cell.isGoal){
      const rew = cell.reward - (decayRate * depth);
      return cell.reward - (decayRate * depth);
    }

    if(depth >= k){
      return 0;
    }

    const directions = MazeUtil.getAdjacentCoordiantes({coordinateKey:coordinateKey});

    let self = this;
    const expectedMaxes = Object.keys(directions).map((direction)=>{
      const adjacentCoor = directions[direction];
      const coorKey = GridUtil.coorToKey(adjacentCoor);
      const expct = self._expectMax({
        cell: mazeState[coorKey],
        k: k,
        depth: depth+1,
        key: coorKey,
        mazeState,
        decayRate,
      });
      return expct;
    });

    const expct = Math.max(...expectedMaxes);
    this._history[coordinateKey+'_'+(depth+1)] = expct;
    return expct;

  }

  _expectMaxQValue(params){
    const { cell, key:coordinateKey, mazeState, k, depth, decayRate} = params;

    if(_.has(this._history, coordinateKey+'_'+(depth+1))){
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
    }

    if(cell.isGoal){
      const rew = cell.reward - (decayRate * depth);
      return {
        right: rew,
        left: rew,
        top: rew,
        bottom: rew,
      };
    }

    if(depth >= k){
      return {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
      };
    }

    const directions = MazeUtil.getAdjacentCoordiantes({coordinateKey:coordinateKey});

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

      const coorKey1 = GridUtil.coorToKey(directions[direc1]);
      const expct1 = self._expectMaxQValue({
        cell:mazeState[coorKey1],
        k: k,
        depth: depth+1,
        key: coorKey1,
        mazeState,
        decayRate,
      });

      const coorKey2 = GridUtil.coorToKey(directions[direc2]);
      const expct2 = self._expectMaxQValue({
        cell:mazeState[coorKey2],
        k: k,
        depth: depth+1,
        key: coorKey2,
        mazeState,
        decayRate,
      });

      const coorKey3 = GridUtil.coorToKey(directions[direc3]);
      const expct3 = self._expectMaxQValue({
        cell:mazeState[coorKey3],
        k: k,
        depth: depth+1,
        key: coorKey3,
        mazeState,
        decayRate,
      });

      const expct = addDirs(expct1, expct2, expct3);
      this._history[coordinateKey+'_'+(depth+1)] = expct;
      return expct;
    });

    return {
      top: directionMax(utilities[0]),
      left: directionMax(utilities[1]),
      bottom: directionMax(utilities[2]),
      right: directionMax(utilities[3]),
    };
  }

  next(params){

    const { useQvalue } = params;

    const mazeState = this._mazeState;
    const utilities = {};

    for(let key in this._mazeState){
      let cell = mazeState[key];
      if(!cell || cell.isWall){ continue; }

      const func = useQvalue ? this._expectMaxQValue.bind(this) : this._expectMax.bind(this);

      utilities[key] = func({
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


