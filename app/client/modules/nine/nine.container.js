
import React, { Component } from 'react';
import * as nineActions from './nine.action';
import { Utils, } from '../../';
import Comps from './comps';

const {
  Piece,
  Board,
} = Comps;

const { Setup } = Utils;

class NineContainer extends Component {

  // static propTypes = {
  //   boardState: React.PropTypes.object,
  // }

  render(){

    const {
      state: {boardState},
      actions: {move}
    } = this.props;

    return (
      <Board
        move={move}
        boardState={boardState}
      />
    );
  }
}

export default Setup.customConnect('nine', nineActions, NineContainer);
