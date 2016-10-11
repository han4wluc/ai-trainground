
import MazeUtil from '../../maze/utils/MazeUtil';
import { Utils } from '../../../';
const { GridUtil } = Utils;
import _ from 'lodash';

const initialMazeState = {
  ...GridUtil.generateInitialGridState({columns:3,rows:3}),
  'x0y0': {
    isWall:true,
  },
  'x2y0': {
    isWall:true,
  },
  'x0y2': {
    isWall:true,
  },
  'x2y2': {
    isWall:true,
  },
  'x0y1': {
    isPlayer:true,
    direction: 'right',
  },
  'x1y0': {
    isGoal:true,
    reward: -10,
  },
  'x2y1': {
    isGoal:true,
    reward: 10,
  },
};

const initialState = {
  mazeState: initialMazeState,
};

export default class MiniMazeSearch {

  constructor() {
    this._mazeState = initialMazeState;

    this._history = [];
    this._sequence = [];

    this._epoch = {
      sequence: [],
      reward: 0,
    };

  }

  _reset(){
    this._mazeState = initialMazeState;
    this._history.push(_.cloneDeep(this._epoch));
    console.log('this._history', this._history);
    this._epoch = {
      sequence: [],
      reward: 0,
    };
  }

  next(){
    console.log('next');
    // random direction
    // move to random direction
    // if reward, exit

    const directions = ['left','right','top','bottom'];
    const r = _.random(0,3);
    // const direction = 'right';
    const direction = directions[r];

    const { mazeState:newMazeState, reward, gameEnded } = MazeUtil.nextMove({
      mazeState:this._mazeState, direction, noise:false,
    });


    if(gameEnded){
      this._reset();
      return {
        mazeState: initialMazeState,
      };
    }

    const currentCoor = _.findKey(this._mazeState, { isPlayer: true });
    this._epoch.sequence.push(currentCoor);
    this._epoch.reward += reward;
    this._mazeState = newMazeState;

    return {
      mazeState:newMazeState,
      reward
    };

  }

}
