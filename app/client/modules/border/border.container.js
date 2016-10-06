
import React, { Component } from 'react';
import * as borderActions from './border.action';
import { Utils, } from '../../';

import _ from 'lodash';
import {
  DirectedGraph
} from './comps';
import BorderUtils from './utils';
const {
  BorderUtil
} = BorderUtils;

const { Setup } = Utils;
class BorderContainer extends Component {

  // constructor(props) {
  //   super(props);
  // }

  // componentDidMount() {
  //   const self = this;
  // }

  render(){

    const {
      nodes,
      links
    } = this.props.state;
    const { move } = this.props.actions;

    return (
      <div>
        <DirectedGraph
          nodes={nodes}
          links={links}
        />
        <button onClick={()=>{

          const { nodes, links } = this.props.state;

          const { isGoal } = BorderUtil.isGoalState({nodes,links});
          if(isGoal){
            return;
          }

          move({nodes});

          // let points = _.cloneDeep(this.state.points);
          // const r = _.random(0,points.length-1)
          // points[r].color = 'yellow';

          // this.setState({
          //   points,
          // })
        }}>change</button>
      </div>
    );
  }
}

export default Setup.customConnect('border', borderActions, BorderContainer);
