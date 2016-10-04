
import React, { Component } from 'react';
import Radium from 'radium';

class Piece extends Component {

  static propTypes = {
    coordinate: React.PropTypes.array,
    // index: React.PropTypes.number,
    onClick: React.PropTypes.func,
    player: React.PropTypes.oneOf([-1,0,1]),
  }

  _renderCircle(params){
    const {
      coordinate, onClick, player, index, height
    } = params;
    return (
      <div
        onClick={onClick.bind(null,{player,index})}
        style={{
          width: `${height}px`,
          height: `${height}px`,
          // margin: '4px',
          borderRadius: `${height/2}px`,
          position: 'absolute',
          left: coordinate[0],
          top: coordinate[1],
          // backgroundColor: 'red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '60px',
          cursor: 'default',
          userSelect: 'none',
        }}
      >
    {/*⚪○　◯*/}
        {'⭕'}
      </div>
    );
  }

  _renderCross(params){
    const {
      coordinate, onClick, player, index, height
    } = params;
    return (
      <div
        onClick={onClick.bind(null,{player,index})}
        style={{
          content: 'X',
          width: `${height}px`,
          height: `${height}px`,
          // margin: '4px',
          // content: 'X',
          borderRadius: `${height/2}px`,
          position: 'absolute',
          left: coordinate[0],
          top: coordinate[1],
            // color: 'red',
          // fontFamily: 'monospace',
          // backgroundColor: 'blue',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: '20px',
          fontSize: '120px',
          color: 'blue',
          cursor: 'default',
          // paddingTop: '6px',
        }}
      >
    {/*x, ×, X, ✕, ☓, ✖, ✗, ✘, */}
        {'✕'}
      </div>
    );
  }

  _renderEmpty(params){
    const {
      coordinate, onClick, player, index, height
    } = params;
    return (
      <div
        onClick={onClick.bind(null,{player,index})}
        style={{
          width: `${height}px`,
          height: `${height}px`,
          // margin: '4px',
          position: 'absolute',
          left: coordinate[0],
          top: coordinate[1],
          // backgroundColor: '#ccc',
        }}
      />
    );
  }

  render() {
    const {
      coordinate,
      onClick,
      index,
      player,
      height,
    } = this.props;

    // const borderWidth = 4;
    // const 

    const props = {
      coordinate,
      onClick,
      player,
      index,
      height,
      // height: 80,
      // borderWidth: 
    };

    if(player === 1){
      return this._renderCircle(props);
    }
    if(player === -1){
      return this._renderCross(props);
    }

    return this._renderEmpty(props);

  }
}

export default Radium(Piece);
