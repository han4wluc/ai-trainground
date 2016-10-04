
import React, { Component } from 'react';

import Piece from './piece';

const positions = {
  '0,0': ['2px' ,'2px'],
  '0,1': ['42px','2px'],
  '0,2': ['82px','2px'],
  '1,0': ['2px' ,'42px'],
  '1,1': ['42px','42px'],
  '1,2': ['82px','42px'],
  '2,0': ['2px' ,'82px'],
  '2,1': ['42px','82px'],
  '2,2': ['82px','82px'],
};

export default class Board extends Component {

  static propTypes = {
    boardState: React.PropTypes.object,
    onClick: React.PropTypes.func,
  }

  render() {

    const {
      boardState,
      onClick,
    } = this.props;

    const pieces = Object.keys(boardState).map((k)=>{
      const player = boardState[k];
      return (
        <Piece
          key={k}
          player={player}
          onClick={onClick}
          index={k}
          // value={value}
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
          backgroundColor: '#ccc',
          border: '1px solid #bbb',
          position: 'relative',
        }}
      >
        {pieces}
      </div>
    );
  }
}
