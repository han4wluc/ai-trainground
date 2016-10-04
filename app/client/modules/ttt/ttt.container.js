
import React, { Component } from 'react';
import * as tttActions from './ttt.action';
import { Utils, } from '../../';

import TttComps from './comps';
const {
  Board
} = TttComps;

const { Setup } = Utils;

class TttContainer extends Component {

  static propTypes = {
    actions: React.PropTypes.object,
    state: React.PropTypes.object,
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
          onClick={(params)=>{
            const { player, index } = params;
            console.log(params);
            if(player !== 0) { return; }

            makeMove({key:index,player:1});

          }}
        />
      </div>
    );
  }
}

export default Setup.customConnect('ttt', tttActions, TttContainer);
