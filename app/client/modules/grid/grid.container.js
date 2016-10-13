
import React, { Component } from 'react';
import * as gridActions from './grid.action';

import { Utils, Comps, } from '../../';

import * as GridRender from './grid.render';

import _ from 'lodash';

const { Setup, GridUtil, SearchTree } = Utils;

const { Chooser, CommonGrid } = Comps;
import { GridCell } from './comps';

class GridContainer extends Component {

  static propTypes = {
    actions: React.PropTypes.object,
    state: React.PropTypes.object,
  }

  componentDidMount() {
    this._initTree.call(this);
    this._computeAll.call(this);
  }

  _reset() {
    const {
      clearPath,
    } = this.props.actions;
    const { gridState } = this.props.state;
    clearPath({gridState});
    const self = this;
    setTimeout(function(){
      self._initTree.call(self);
    },100);
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
        paintCells,
        setGridState
      }
    } = this.props;

    // this._searchTree._strategy = strategy;
    if(strategy){
      this._searchTree.setStrategy({strategy});
    }

    const res = this._searchTree.next();

    if(res.goalReached){
      paintCells({coordinates: res.path.slice(1,-1)});
      return;
    }

    if(res.exhausted){
      return;
    }

    setGridState({gridState:res.gridState});

    return;
  }

  // computes solution for all algorithms and their performance
  _computeAll(){
    const {
      state: { gridState },
      actions: { setResultTable }
    } = this.props;
    setResultTable({gridState});
  }

  render(){
    return (
      <div>
        {GridRender.renderGrid.call(this)}
        {GridRender.renderGridChoosers.call(this)}
        {GridRender.renderButtons.call(this)}
        {GridRender.renderTable.call(this)}
      </div>
    );
  }
}

export default Setup.customConnect('grid', gridActions, GridContainer);
