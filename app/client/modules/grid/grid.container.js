
import _ from 'lodash';
import React, { Component } from 'react';
import * as gridActions from './grid.action';
import * as GridRender from './grid.render';
import { Utils, Comps, } from '../../';
import { GridCell } from './comps';
import Grids from './grids';

const { Setup, SearchTree } = Utils;

const { Chooser, CommonGrid } = Comps;

class GridContainer extends Component {

  static propTypes = {
    actions: React.PropTypes.object,
    state: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this._setup.call(this);
  }

  async _setup(){
    const {
      actions: { changeGrid, computeAndDisplay },
    } = this.props;

    this._searchTree = new SearchTree({
      gridState: {},
    });

    await changeGrid({gridName:'GRID_1',searchTree: this._searchTree}, );
    computeAndDisplay({gridState:this.props.state.gridState});
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
