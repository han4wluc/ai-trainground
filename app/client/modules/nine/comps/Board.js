
import React, { Component } from 'react';

import Piece from './piece';

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

  // static propTypes = {
  //   text: React.PropTypes.string,
  // }

  render() {

    const state = [null,7,6,5,4,3,2,1,8];

    const pieces = state.map((s,i)=>{
      if(!s){ return null; }
      return (
        <Piece
          text={s}
          coordinate={positions[i+1]}
        />
      );
    });

    return (
      <div
        // onClick={onClick.bind(null,{x,y})}
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
