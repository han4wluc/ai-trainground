
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
        onClick={onClick && onClick.bind(null,{value,index})}
        style={{
          backgroundColor: '#eee',
          display: 'flex',
          flex: 1,
          height: '100%',
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
