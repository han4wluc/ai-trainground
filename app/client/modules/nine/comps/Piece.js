
import React, { Component } from 'react';

export default class Piece extends Component {

  static propTypes = {
    coordinate: React.PropTypes.array,
    style: React.PropTypes.object,
    text: React.PropTypes.string,
  }

  render() {
    const {
      text,
      style,
      coordinate
    } = this.props;
    return (
      <div
        // onClick={onClick.bind(null,{x,y})}
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
        {text}
      </div>
    );
  }
}
