
import React, { Component } from 'react';

export default class Chooser extends Component {
  render() {

    const {
      onClick,
      text
    } = this.props;

    return (
      <div style={{
        width: '80px',
        height: '40px',
        backgroundColor: 'black',
        display: 'flex',
        border: '1px solid #ccc',
        justifyContent: 'center',
        alignItems: 'center',
      }} onClick={onClick}>
        <div style={{
          color: 'white'
        }}>{text}</div>
      </div>
    );
  }
}
