
import React, { Component } from 'react';

export default class GridCell extends Component {

  static propTypes = {
    onClick: React.PropTypes.func,
    showDot: React.PropTypes.bool,
    style: React.PropTypes.object,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  }

  _getBackgroundColor(params){
    const {
      cost,
      color,
      isWall,
      isHighlighted,
      isStart,
      isGoal,
    } = params;
    if(isWall){
      return 'black';
    }
    if(isHighlighted){
      return 'red';
    }
    if(isStart){
      return 'blue';
    }
    if(isGoal){
      return 'green';
    }
    if(cost === 1){
      return '#ddd';
    }
    if(cost === 2){
      return '#ccc';
    }
    if(cost === 3){
      return '#bbb';
    }
    if(color){
      return color;
    }
    return '#ccc';
  }

  _renderDot(){
    return (
      <div
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '3px',
          backgroundColor: '#222',
        }}
      />
    );
  }

  render() {

    const {
      onClick,
      showDot,
      style,
      x,
      y,
      cost,
      color,
      isWall,
      isHighlighted,
      isStart,
      isGoal,
      showDow,
    } = this.props;

    const backgroundColor = this._getBackgroundColor({
      cost,
      color,
      isWall,
      isHighlighted,
      isStart,
      isGoal,
    });

    return (
      <div
        onClick={onClick.bind(null,{x,y})}
        style={{
          display: 'flex',
          flex: 1,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor,
          ...style
        }}
      >
        {showDot && this._renderDot()}
      </div>
    );
  }
}
