
import React, { Component } from 'react';
import * as nineActions from './nine.action';
import { Utils, } from '../../';
import Comps from './comps';

import NineUtils from './utils';
const { NineUtil, NineSearch } = NineUtils;
import _ from 'lodash';

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

  constructor(props) {
    super(props);

    this.history = ['a'];
  }

  componentDidMount() {
    const {
      state: {boardState},
    } = this.props;
    const search = new NineSearch({boardState});    
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
          // console.log('n', boardState, n);
          let { finges, emptyIndex } = n;

          let last = this.history[this.history.length-1];
          finges = finges.filter((f)=>f!==last);

          const r  = _.random(0,finges.length-1);
          move({fr:finges[r],to:emptyIndex});
          this.history.push(emptyIndex)
          // console.log(n);
        }}>{'next'}</button>
      </div>
    );
  }
}

export default Setup.customConnect('nine', nineActions, NineContainer);
