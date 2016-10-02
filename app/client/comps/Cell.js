
import React, { Component } from 'react';

export default class Cell extends Component {
  render() {

    const { style } = this.props;

    return (
      <div style={{
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
