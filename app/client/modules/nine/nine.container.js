
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
  render(){
    return (
      <Board/>
    );
  }
}

export default Setup.customConnect('nine', nineActions, NineContainer);
