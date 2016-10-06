
import React, { Component } from 'react';
import * as tttActions from './ttt.action';
import { Utils, } from '../../';

import TttComps from './comps';
import TttUtils from './utils';

import { Link, browserHistory } from 'react-router'

import Network from './ttt.network';

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
        updateScore,
      }
    } = this.props;

    const { player, index } = params;
    // console.log(params);
    if(player !== 0) { return; }


    let { boardState } = this.props.state;
    let res1 = TttUtil.isGoalState({boardState});
    if(res1.gameEnded){ return; }

    await makeMove({key:index,player:1});


    // get boardState value AFTER makeMove
    boardState = this.props.state.boardState;
    const res2 = TttUtil.isGoalState({boardState});
    if(res2.gameEnded){
      updateScore({
        winner: res2.winner,
      });
      return;
    }

    const finges = TttUtil.getSuccessors({boardState});
    try {
      const nextMove = await Network.doRequest({boardState});

      if(!_.includes(finges, nextMove.action)){
        console.log('ILLEGAL MOVE')
        return;
      }

      console.log('nextMove', nextMove)

      await makeMove({key:nextMove.action,player:-1});
      // await new Promise((resolve)=>{
      //   setTimeout(resolve,500);
      // });
      boardState = this.props.state.boardState;
      const res3 = TttUtil.isGoalState({boardState});
      if(res3.gameEnded){
        updateScore({
          winner: res3.winner,
        });
      }
    } catch (error){
      console.log('error', error);
      return;
    }
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

  render(){

    const {
      state: { boardState },
      actions: {
        makeMove, resetBoard,
      }
    } = this.props;

    return (
      <div>
        <Board
          height={300}
          boardState={boardState}
          onClick={this._makeMove.bind(this)}
        />

        <br/>

        {this._renderResultTable.call(this)}

        <br/>

        <button onClick={resetBoard}>clear board</button>

        <button onClick={ async ()=>{

          // const {
          //   state: { boardState },
          // } = this.props;
          const finges = TttUtil.getSuccessors({boardState});
          const nextMove = await Network.doRequest({boardState});

          if(!_.includes(finges, nextMove.action)){
            console.log('ILLEGAL MOVE');
            return;
          }

          console.log('nextMove', nextMove);

          await makeMove({key:nextMove.action,player:-1});
          // await new Promise((resolve)=>{
          //   setTimeout(resolve,500);
          // });
          const newBoardState = this.props.state.boardState;
          const res3 = TttUtil.isGoalState({boardState:newBoardState});
          if(res3.gameEnded){
            updateScore({
              winner: res3.winner,
            });
          }
          // Network.doRequest();
        }}>request</button>

      </div>
    );
  }
}

export default Setup.customConnect('ttt', tttActions, TttContainer);
