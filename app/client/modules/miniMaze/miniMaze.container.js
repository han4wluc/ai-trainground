
import React, { Component } from 'react';
import * as miniMazeActions from './miniMaze.action';
import { Utils, Comps, Events } from '../../';
import _ from 'lodash';

// const { keyDown } = Events;
const { Setup } = Utils;
const { CommonGrid } = Comps;

class MiniMazeContainer extends Component {

  componentDidMount() {
    this._keyDownSubscription = Events.keyDown((direction)=>{
      console.log('direction_1', direction);
    });
  }

  componentWillUnmount() {
    this._keyDownSubscription.unsubscribe();
  }

  _renderCells(params){
    const { mazeState } = params;

    const cells = [];

    for(let key in mazeState){
      const { isWall } = mazeState[key];
      const backgroundColor = isWall ? '#222' : '#ddd';
      const comp = (
        <div
          style={{
            height: '100%',
            backgroundColor,
          }}
        >
        </div>
      );
      cells.push(comp);
    }
    return cells;
  }

  render(){
    const {
      state: { mazeState },
    } = this.props;
    const cells = this._renderCells({mazeState});

    return (
      <div>
        <CommonGrid
          columns={3}
          rows={3}
          size={50}
          cells={cells}
          borderWidth={4}
        />
      </div>
    );
  }
}

export default Setup.customConnect('miniMaze', miniMazeActions, MiniMazeContainer);
