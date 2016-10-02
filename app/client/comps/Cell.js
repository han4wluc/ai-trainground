
import React, { Component } from 'react';

export default class Cell extends Component {

  static propTypes = {
    onClick: React.PropTypes.func,
    style: React.PropTypes.object,
  }

  render() {

    const { onClick, style, x, y } = this.props;

    return (
      <div
        onClick={onClick.bind(null,{x,y})}
        style={{
          width: '36px',
          height: '36px',
          marginTop: '2px',
          marginLeft: '2px',
          backgroundColor: 'red',
          border: '1px solid #bbb',
          ...style
        }}
      />
    );
  }
}
