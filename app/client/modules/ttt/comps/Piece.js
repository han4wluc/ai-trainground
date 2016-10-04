
import React, { Component } from 'react';

export default class Piece extends Component {

  static propTypes = {
    coordinate: React.PropTypes.array,
    index: React.PropTypes.number,
    onClick: React.PropTypes.func,
    player: React.PropTypes.oneOf([-1,0,1]),
  }

  _renderCircle(params){
    const {
      coordinate, onClick, player, index
    } = params;
    return (
      <div
        onClick={onClick.bind(null,{player,index})}
        style={{
          width: '30px',
          height: '30px',
          margin: '4px',
          borderRadius: '18px',
          position: 'absolute',
          left: coordinate[0],
          top: coordinate[1],
          backgroundColor: 'red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '12px',
            backgroundColor: '#ccc'
          }}
        />
      </div>
    );
  }

  _renderCross(params){
    const {
      coordinate, onClick, player, index
    } = params;
    return (
      <div
        onClick={onClick.bind(null,{player,index})}
        style={{
          width: '30px',
          height: '30px',
          margin: '4px',
          borderRadius: '18px',
          position: 'absolute',
          left: coordinate[0],
          top: coordinate[1],
          backgroundColor: 'blue',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '12px',
            backgroundColor: '#ccc'
          }}
        />
      </div>
    );
  }

  _renderEmpty(params){
    const {
      coordinate, onClick, player, index,
    } = params;
    return (
      <div
        onClick={onClick.bind(null,{player,index})}
        style={{
          width: '30px',
          height: '30px',
          margin: '4px',
          position: 'absolute',
          left: coordinate[0],
          top: coordinate[1],
          backgroundColor: '#ccc',
        }}
      />
    );
  }

  render() {
    const {
      // value,
      // style,
      coordinate,
      onClick,
      index,
      player,
    } = this.props;

    const props = {coordinate,onClick,player,index};

    if(player === 1){
      return this._renderCircle(props);
    }
    if(player === -1){
      return this._renderCross(props);
    }

    return this._renderEmpty(props);

  }
}
