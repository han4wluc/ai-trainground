
import React, { Component } from 'react';
import * as nineActions from './nine.action';
import { Utils, Comps as CommonComps} from '../../';
import Comps from './comps';

import NineUtils from './utils';
const { NineUtil, NineSearch } = NineUtils;
import _ from 'lodash';

const {
  Piece,
  Board,
} = Comps;

const { Setup } = Utils;


const {
  CommonGrid,
} = CommonComps;


class NineContainer extends Component {

  static propTypes = {
    actions: React.PropTypes.object,
    state: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this._intialBoardState = this.props.state.boardState;
    this._pathIndex = 0;
  }

  componentDidMount() {
    const {
      state: {boardState},
    } = this.props;
    this.search = new NineSearch({boardState});
  }

  _renderCells(params){
    const {
      boardState,
      move,
    } = params;

    return Object.keys(boardState).map((k)=>{
      const value = boardState[k];
      if(!value){ return (
        <Piece
          key={k}
          index={parseInt(k,10)}
          value={''}
        />
      ); }
      return (
        <Piece
          key={k}
          onClick={(params)=>{
            const { index, value } = params;
            const {emptyIndex,finges} = NineUtil.getSuccessor({boardState});
            // console.log(finges, index);
            if(_.includes(finges, parseInt(index,10))){
              // console.log('sshould move');
              move({fr:index,to:emptyIndex});
              return;
            }
          }}
          index={parseInt(k,10)}
          value={value}
        />
      );
    });
  }

  render(){

    const {
      state: {boardState},
      actions: {move, updateBoard}
    } = this.props;

    const cells = this._renderCells({boardState,move});

    return (
      <div>

        <CommonGrid
          columns={3}
          rows={3}
          size={50}
          cells={cells}
          borderWidth={10}
        />

        <button onClick={()=>{

          var i = 0;
          while(i < 2000){
            i++;
            this._path = this.search.next();
            // updateBoard({boardState:newBoard});
          }

          // const n = NineUtil.getSuccessor({boardState});
          // // console.log('n', boardState, n);
          // let { finges, emptyIndex } = n;

          // let last = this.history[this.history.length-1];
          // finges = finges.filter((f)=>f!==last);

          // const r  = _.random(0,finges.length-1);
          // move({fr:finges[r],to:emptyIndex});
          // this.history.push(emptyIndex)
          // console.log(n);
        }}>{'next'}</button>
        <button onClick={()=>{
          updateBoard({boardState:this._intialBoardState});
          this._pathIndex = 0;
        }}>
          {'reset'}
        </button>
        <button onClick={()=>{
          // console.log(this._path.path)
          updateBoard({boardState:this._path.path[this._pathIndex]});
          this._pathIndex++;
        }}>
          {'solution'}
        </button>
      </div>
    );
  }
}

export default Setup.customConnect('nine', nineActions, NineContainer);
