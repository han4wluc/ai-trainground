
import React, { Component } from 'react';

class Cell extends Component {
  render(){

    const {
      color,
      style,
      // text,
      children
    } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          ...style
        }}
      >
        {this.props.children}
      </div>
    );

  }
}

export default Cell;
