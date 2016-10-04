
import React, { Component } from 'react';

import Piece from './piece';

export default class Board extends Component {

  static propTypes = {
    boardState: React.PropTypes.object,
    height: React.PropTypes.number,
    onClick: React.PropTypes.func,
  }

  _renderBars(params){

    const { height } = params;
    const borderWidth = 4;

    const sep1 = (height - borderWidth * 2)/ 3;
    const sep2 = sep1 * 2 + 4;

    return (

      <div>
        <div style={{
          position:'absolute',
          top: '0px',
          left: `${sep1}`,
          width: `${borderWidth}px`,
          height: `${height}px`,
          backgroundColor: 'black'
        }}/>

        <div style={{
          position:'absolute',
          top: '0px',
          left: `${sep2}`,
          width: `${borderWidth}px`,
          height: `${height}px`,
          backgroundColor: 'black'
        }}/>

        <div style={{
          position:'absolute',
          top: `${sep1}`,
          left: '0px',
          width: `${height}px`,
          height: `${borderWidth}px`,
          backgroundColor: 'black'
        }}/>

        <div style={{
          position:'absolute',
          top: `${sep2}`,
          left: '0px',
          width: `${height}px`,
          height: `${borderWidth}px`,
          backgroundColor: 'black'
        }}/>

      </div>

    );
  }

  render() {

    const {
      boardState,
      onClick,
      height,
    } = this.props;

    const margin = 4;
    const sep1 = ((height - margin * 2)/ 3) + 4;
    const sep2 = ((height - margin * 2)/ 3) * 2 + 8;

    const positions = {
      '0,0': [`${0}px` ,`${0}px` ],
      '0,1': [`${sep1}px`,`${0}px` ],
      '0,2': [`${sep2}px`,`${0}px` ],
      '1,0': [`${0}px` ,`${sep1}px`],
      '1,1': [`${sep1}px`,`${sep1}px`],
      '1,2': [`${sep2}px`,`${sep1}px`],
      '2,0': [`${0}px` ,`${sep2}px`],
      '2,1': [`${sep1}px`,`${sep2}px`],
      '2,2': [`${sep2}px`,`${sep2}px`],
    };


    const pieces = Object.keys(boardState).map((k)=>{
      const player = boardState[k];
      return (
        <Piece
          key={k}
          player={player}
          onClick={onClick}
          index={k}
          height={(height-(4*2))/3}
          // value={value}
          coordinate={positions[k]}
        />
      );
    });

    return (
      <div
        style={{
          width: `${height}px`,
          height: `${height}px`,
          // marginTop: '2px',
          // marginLeft: '2px',
          backgroundColor: '#eee',
          border: '4px solid black',
          position: 'relative',
        }}
      >
        {this._renderBars({height})}

        {pieces}
      </div>
    );
  }
}
