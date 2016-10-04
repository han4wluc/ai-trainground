
import React, { Component } from 'react';
import * as tttActions from './ttt.action';
import { Utils, } from '../../';

import TttComps from './comps';
import TttUtils from './utils';
const {
  Board
} = TttComps;

const {
  TttUtil,
} = TttUtils;

const { Setup } = Utils;

class TttContainer extends Component {

  static propTypes = {
    actions: React.PropTypes.object,
    state: React.PropTypes.object,
  }

  async _makeMove(params){

    const {
    //   state: { boardState },
      actions: {
        makeMove,
      }
    } = this.props;

    const { player, index } = params;
    // console.log(params);
    if(player !== 0) { return; }


    let { boardState } = this.props.state;
    let { gameEnded } = TttUtil.isGoalState({boardState});

    if(gameEnded){ return; }


    await makeMove({key:index,player:1});

    const self = this;

    // get boardState value AFTER makeMove
    boardState = self.props.state.boardState;
    gameEnded = TttUtil.isGoalState({boardState}).gameEnded;
    if(gameEnded){ return; }

    const res = TttUtil.isGoalState({boardState});
    console.log(res);

    const finges = TttUtil.getSuccessors({boardState});
    console.log('finges', finges);
    setTimeout(function(){
       makeMove({key:finges[0],player:-1});
       boardState = self.props.state.boardState;
       gameEnded = TttUtil.isGoalState({boardState}).gameEnded;

    },100);
  }

  render(){

    const {
      state: { boardState },
      actions: {
        makeMove,
      }
    } = this.props;

    return (
      <div>
        <Board
          boardState={boardState}
          onClick={this._makeMove.bind(this)}
        />
      </div>
    );
  }
}

export default Setup.customConnect('ttt', tttActions, TttContainer);
