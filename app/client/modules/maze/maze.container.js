
import React, { Component } from 'react';
import * as mazeActions from './maze.action';
import { Utils, Comps, Events } from '../../';

import { MazeCell } from './comps';

const { Setup, GridUtil } = Utils;

const {
  CommonGrid
} = Comps;

import { MazeSearch } from './utils';

class MazeContainer extends Component {

  static propTypes = {
    actions: React.PropTypes.object,
    state: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      state: { mazeState },
      actions: { move, displayUtility }
    } = this.props;

    let self = this;

    this._keyDownSubscription = Events.keyDown((direction)=>{
      move({mazeState:this.props.state.mazeState,direction,reward:self.props.state.reward});
    });

    this._mazeSearch = new MazeSearch({mazeState});
    const utilities = this._mazeSearch.next({useQvalue:false});
    displayUtility({utilities});

  }

  componentWillUnmount(){
    this._keyDownSubscription.unsubscribe();
  }

  _renderCells(params){
    const { mazeState, rows, columns, utilities } = params;

    return GridUtil.getGridKeys({rows,columns}).map((key)=>{
      let utility;
      let qvalues;

      qvalues = _.isObject(utilities[key]) ? utilities[key] : undefined;
      utility = _.isNumber(utilities[key]) ? utilities[key] : undefined;

      return (
        <MazeCell
          {...mazeState[key]}
          utility={utility}
          qvalues={qvalues}
        />
      );
    });

  }

  render(){

    const {
      state: {
        mazeState,
        columns,
        rows,
        reward,
        utilities,
      },
      actions: { calc, reset }
    } = this.props;

    const cells = this._renderCells({mazeState,columns,rows,utilities});

    return (
      <div>
        <CommonGrid
          columns={columns}
          rows={rows}
          size={80}
          cells={cells}
          borderWidth={4}
        />
        <div>{`Reward: ${reward}`}</div>
        <button onClick={reset}>{'reset'}</button>
        <button onClick={calc}>{'calc'}</button>
      </div>
    );
  }
}

export default Setup.customConnect('maze', mazeActions, MazeContainer);
