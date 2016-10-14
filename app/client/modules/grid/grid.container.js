
import _ from 'lodash';
import React, { Component } from 'react';
import * as gridActions from './grid.action';
import * as GridRender from './grid.render';
import { Utils, Comps, } from '../../';
import { GridCell } from './comps';

const { Setup, GridUtil, SearchTree } = Utils;

const { Chooser, CommonGrid } = Comps;

class GridContainer extends Component {

  static propTypes = {
    actions: React.PropTypes.object,
    state: React.PropTypes.object,
  }

  componentDidMount() {
    const {
      state: { gridState },
      actions: { setResultTable }
    } = this.props;

    this._searchTree = new SearchTree({
      gridState,
      strategy: 'BFS',
    });

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
