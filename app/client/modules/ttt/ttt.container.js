
import React, { Component } from 'react';
import * as tttActions from './ttt.action';
import { Utils, Comps as CommonComps} from '../../';

import TttComps from './comps';
import TttUtils from './utils';

import { Link, browserHistory } from 'react-router';

import Network from './ttt.network';

const {
  Piece,
} = TttComps;

const {
  TttUtil,
} = TttUtils;

const { Setup } = Utils;

const {
  CommonGrid,
} = CommonComps;

class TttContainer extends Component {

  static propTypes = {
    actions: React.PropTypes.object,
    state: React.PropTypes.object,
  }

  async _makeMove(params){

    const {
      state: { boardState },
      actions: {
        playerMakeMove,
        aiMakeMove,
      }
    } = this.props;

    const { index } = params;
    await playerMakeMove({boardState,move:index});

    // User new board state
    await aiMakeMove({boardState:this.props.state.boardState});

  }

  _renderResultTable(){

    const { score: {
      win,lose,draw,total
    }} = this.props.state;

    return (
      <table>
        <thead>
          <tr>
            <th >{''}</th>
            <th>{'Win'}</th>
            <th>{'Lose'}</th>
            <th>{'Draw'}</th>
            <th>{'WinRate'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>{'Player'}</b></td>
            <td>{win}</td>
            <td>{lose}</td>
            <td>{draw}</td>
            <td>{Math.round(win * 100 /total)+'%'}</td>
          </tr>
          <tr>
            <td><b>{'AI'}</b></td>
            <td>{lose}</td>
            <td>{win}</td>
            <td>{draw}</td>
            <td>{Math.round(lose * 100/total)+'%'}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  _renderCells(params){

    const { boardState, makeMove } = params;

    const pieces = Object.keys(boardState).map((k)=>{
      const player = boardState[k];
      return (
        <Piece
          key={k}
          player={player}
          onClick={(params)=>{
            const { index, player } = params;
            makeMove({player:1,index});
          }}
          index={k}
          height={50}
        />
      );
    });

    return pieces;

  }

  render(){

    const {
      state: { boardState },
      actions: {
        makeMove, resetBoard, aiMakeMove
      }
    } = this.props;

    const cells = this._renderCells({boardState,makeMove});

    // console.log('cells[0]', cells[0]);

    return (
      <div>
        {<CommonGrid
          columns={3}
          rows={3}
          size={100}
          cells={cells}
          borderWidth={10}
        />}

        {/*<Board
          height={300}
          boardState={boardState}
          onClick={this._makeMove.bind(this)}
        />*/}

        <br/>

        {this._renderResultTable.call(this)}

        <br/>

        <button onClick={resetBoard}>{'clear board'}</button>
        <button onClick={aiMakeMove.bind(null,{boardState})}>{'ai move'}</button>

      </div>
    );
  }
}

export default Setup.customConnect('ttt', tttActions, TttContainer);
