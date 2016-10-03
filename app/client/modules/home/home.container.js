
import React, { Component } from 'react';
import * as homeActions from './home.action';

import { Utils, Comps, } from '../../';

const { Setup, GridUtil, SearchTree } = Utils;
const { Cell, Grid } = Comps;

class HomeContainer extends Component {

  static propTypes = {
    actions: React.PropTypes.object,
    state: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._initTree.call(this);
  }

  _reset() {
    const {
      resetToInitialState
    } = this.props.actions;
    resetToInitialState();
    this._initTree.call(this);
  }

  _initTree(){
    const {
      gridState
    } = this.props.state;

    this._searchTree = new SearchTree({
      gridState,
      strategy: 'BFS',
    });
  }

  _next(params) {

    const {
      strategy
    } = params;

    const {
      state: {
        gridState
      },
      actions: {
        updateCell,
        paintCells
      }
    } = this.props;

    // this._searchTree._strategy = strategy;
    if(strategy){
      this._searchTree.setStrategy({strategy});
    }

    const res = this._searchTree.next({gridState});

    if(res.goalReached){
      paintCells({coordinates: res.branch});
      return;
    }

    if(res.exhausted){
      return;
    }

    updateCell(res.coordinate);

    return;
  }

  _onClickCell(params){
    const {
      updateCell
    } = this.props.actions;
    // console.log(params);
    const { x,y } = params;
    updateCell({x,y});
  }

  render(){
    const {
      gridState
    } = this.props.state;

    return (
      <div>
        <Grid
          gridState={gridState}
          onClick={this._onClickCell.bind(this)}
          rows={8}
          columns={8}
        />
        <br/>
        <button onClick={this._next.bind(this, {strategy:'BFS'})}>{'BFS'}</button>
        <button onClick={this._next.bind(this, {strategy:'DFS'})}>{'DFS'}</button>
        <button onClick={this._next.bind(this, {strategy:'greedy'})}>{'greedy'}</button>
        <button onClick={this._reset.bind(this)}>{'reset'}</button>
      </div>
    );
  }
}

export default Setup.customConnect('home', homeActions, HomeContainer);
