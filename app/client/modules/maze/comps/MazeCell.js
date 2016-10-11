
import React, { Component } from 'react';

const directionDegreesMap = {
  right: '0',
  bottom: '90',
  left: '180',
  top: '270',
};

class Cell extends Component {

  static propTypes = {
    direction: React.PropTypes.string,
    isGoal: React.PropTypes.bool,
    isPlayer: React.PropTypes.bool,
    isWall: React.PropTypes.bool,
    qvalues: React.PropTypes.object,
    reward: React.PropTypes.number,
    style: React.PropTypes.object,
    utility: React.PropTypes.object,
  }

  _renderDirections(params){

    const {
      style,
      qvalues,
    } = params;

    const {
      left, right, top, bottom
    } = qvalues;

    const baseStyle = {
      position: 'absolute',
      display: 'flex',
      fontSize: '14px',
      justifyContent: 'center',
      alignItems: 'center',
      lineHeight: '14px',
    };

    return (
      <div
        className={'crossed'}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          ...style
        }}
      >

        <div style={{
          ...baseStyle,
          top: '2px',
          left: '2px',
          width: '100%',
        }}>
          {top}
        </div>

        <div style={{
          ...baseStyle,
          bottom: '1px',
          left: '2px',
          width: '100%',
        }}>
          {bottom}
        </div>

        <div style={{
          ...baseStyle,
          bottom: '1px',
          left: '2px',
          height: '100%',
        }}>
          {left}
        </div>

        <div style={{
          ...baseStyle,
          bottom: '1px',
          right: '2px',
          height: '100%',
        }}>
          {right}
        </div>

      </div>
    );
  }

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
      utility,
      isGoal,
      reward,
      isPlayer,
      direction,
      isWall,
      style,
      qvalues,
    } = this.props;

    const qvaluesCommp = qvalues ? this._renderDirections({
      qvalues,
    }) : null;

    if(isWall){
      return this._renderWall();
    }

    const sprite = isPlayer ? this._renderPlayer({direction}) : null;

    let backgroundColor = '#ccc';
    if(isGoal){
      backgroundColor = reward >= 0 ? 'green' : 'red';
    }

    return (
      <div
        className={qvaluesCommp ? 'crossed' : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backgroundColor,
          ...style,
        }}
      >
        {sprite}
        {qvaluesCommp}
        {utility}
      </div>
    );

  }
}

export default Cell;
