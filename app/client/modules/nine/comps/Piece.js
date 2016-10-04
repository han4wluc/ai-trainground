
import React, { Component } from 'react';

export default class Piece extends Component {

  static propTypes = {
    coordinate: React.PropTypes.array,
    index: React.PropTypes.number,
    onClick: React.PropTypes.func,
    style: React.PropTypes.object,
    value: React.PropTypes.number,
  }

  render() {
    const {
      value,
      style,
      coordinate,
      onClick,
      index,
    } = this.props;
    return (
      <div
        onClick={onClick.bind(null,{value,index})}
        style={{
          width: '36px',
          height: '36px',
          position: 'absolute',
          left: coordinate[0],
          top: coordinate[1],
          // marginTop: '2px',
          // marginLeft: '2px',
          backgroundColor: '#ccc',
          border: '1px solid #bbb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style
        }}
      >
        {value}
      </div>
    );
  }
}
