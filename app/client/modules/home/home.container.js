
import React, { Component } from 'react';
import * as homeActions from './home.action';

import { Utils, Comps, } from '../../';

const { Setup } = Utils;
const { Cell, Grid } = Comps;

class HomeContainer extends Component {

  static propTypes = {
    state: React.PropTypes.object,
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
          rows={6}
          columns={6}
        />
      </div>
    );
  }
}

export default Setup.customConnect('home', homeActions, HomeContainer);
