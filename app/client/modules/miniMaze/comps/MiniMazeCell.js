
import React, { Component } from 'react';

const directionDegreesMap = {
  right: '0',
  bottom: '90',
  left: '180',
  top: '270',
};

class MiniMazeCell extends Component {

  _renderPlayer(params){
    const { direction } = params;
    const degree = directionDegreesMap[direction];

    return (
      <img
        style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '50%',
          transform: `rotate(${degree}deg)`,
        }}
        src='./app/static/images/pacman.png'
      />
    );
  }

  _renderWall(){
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: '#222'
        }}
      />
    );
  }

  render(){

    const {
      isWall,
      style,
      isPlayer,
      direction = 'top',
    } = this.props;

    if(isWall){
      return this._renderWall();
    }

    const sprite = isPlayer ? this._renderPlayer({direction}) : null;

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        {sprite}
      </div>
    );

  }
}

export default MiniMazeCell;
