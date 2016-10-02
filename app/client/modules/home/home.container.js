
import React, { Component } from 'react';
import * as homeActions from './home.action';

import { Utils, Comps, } from '../../';

const { Setup, GridUtil } = Utils;
const { Cell, Grid } = Comps;

class HomeContainer extends Component {

  static propTypes = {
    actions: React.PropTypes.object,
    state: React.PropTypes.object,
  }

  componentDidMount() {
    const {
      updateCell
    } = this.props.actions;
    const {
      gridState
    } = this.props.state;

    const coordinate = {x:1,y:2};
    updateCell(coordinate);

    const finges = GridUtil.getSuccessor({gridState, coordinate});

    finges.forEach((c)=>{
      updateCell(c);
    });


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
