
import React, { Component } from 'react';
import * as nineActions from './nine.action';
import { Utils, } from '../../';
import Comps from './comps';

import NineUtils from './utils';
const { NineUtil } = NineUtils;

const {
  Piece,
  Board,
} = Comps;

const { Setup } = Utils;

class NineContainer extends Component {

  static propTypes = {
    actions: React.PropTypes.object,
    state: React.PropTypes.object,
  }

  render(){

    const {
      state: {boardState},
      actions: {move}
    } = this.props;

    return (
      <div>
        <Board
          move={move}
          boardState={boardState}
        />
        <button onClick={()=>{
          const n = NineUtil.getSuccessor({boardState});
          console.log(n);
        }}>{'next'}</button>
      </div>
    );
  }
}

export default Setup.customConnect('nine', nineActions, NineContainer);
