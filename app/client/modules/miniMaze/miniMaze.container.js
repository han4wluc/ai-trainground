
import React, { Component } from 'react';
import * as miniMazeActions from './miniMaze.action';
import { Utils, Comps, Events } from '../../';
import _ from 'lodash';

// const { keyDown } = Events;
const { Setup } = Utils;
const { CommonGrid } = Comps;
import { MiniMazeCell } from './comps';
import { MiniMazeSearch } from './utils';

console.log('MiniMazeSearch', MiniMazeSearch);

class MiniMazeContainer extends Component {

  constructor(props) {
    super(props);

    this._miniMazeSearch = new MiniMazeSearch();
  }

  componentDidMount() {
    const {
      actions: { moveNext }
    } = this.props;
    const self = this;
    this._keyDownSubscription = Events.keyDown((direction)=>{
      // console.log('direction_1', direction);
      moveNext({
        mazeState: self.props.state.mazeState,
        direction,
      });
    });
  }

  componentWillUnmount() {
    this._keyDownSubscription.unsubscribe();
  }

  _renderCells(params){
    const { mazeState } = params;

    const cells = [];

    for(let key in mazeState){
      const cellState = mazeState[key];
      const comp = (
        <MiniMazeCell
          {...cellState}
        />
      );
      cells.push(comp);
    }
    return cells;
  }

  render(){
    const {
      actions: { resetMaze, updateMazeState },
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
        <button onClick={resetMaze}>reset</button>
        <button onClick={()=>{
          const { mazeState, reward } = this._miniMazeSearch.next();
          updateMazeState({mazeState});
        }}>next</button>
      </div>
    );
  }
}

export default Setup.customConnect('miniMaze', miniMazeActions, MiniMazeContainer);
