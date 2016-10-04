
import React, { Component } from 'react';

import Piece from './piece';
import NineUtils from '../utils';
const { NineUtil } = NineUtils;

const positions = {
  1: ['2px' ,'2px'],
  2: ['42px','2px'],
  3: ['82px','2px'],
  4: ['2px' ,'42px'],
  5: ['42px','42px'],
  6: ['82px','42px'],
  7: ['2px' ,'82px'],
  8: ['42px','82px'],
  9: ['82px','82px'],
};

export default class Board extends Component {

  static propTypes = {
    boardState: React.PropTypes.object,
    move: React.PropTypes.func,
  }

  render() {

    const {
      boardState,
      move,
    } = this.props;

    const pieces = Object.keys(boardState).map((k)=>{
      const value = boardState[k];
      if(!value){ return null; }
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
            // console.log('invalid move');
          }}
          index={parseInt(k,10)}
          value={value}
          coordinate={positions[k]}
        />
      );
    });

    return (
      <div
        style={{
          width: '122px',
          height: '122px',
          marginTop: '2px',
          marginLeft: '2px',
          backgroundColor: 'black',
          border: '1px solid #bbb',
          position: 'relative',
        }}
      >
        {pieces}
      </div>
    );
  }
}
