
import React, { Component } from 'react';

export default class Cell extends Component {

  static propTypes = {
    onClick: React.PropTypes.func,
    showDot: React.PropTypes.bool,
    style: React.PropTypes.object,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  }

  _renderDot(){
    return (
      <div
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '3px',
          backgroundColor: '#eee',
        }}
      />
    );
  }

  render() {

    const { onClick, showDot, style, x, y } = this.props;

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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style
        }}
      >
        {showDot && this._renderDot()}
      </div>
    );
  }
}
