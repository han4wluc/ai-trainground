
import React, { Component } from 'react';
import * as borderActions from './border.action';
import { Utils, } from '../../';

import _ from 'lodash';
import {
  DirectedGraph
} from './comps';
import BorderUtils from './utils';
const {
  BorderUtil,
  BorderSearch,
} = BorderUtils;

console.log('BorderSearch', BorderSearch);

const { Setup } = Utils;
class BorderContainer extends Component {

  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    const {
      nodes,
      links
    } = this.props.state;
    this._borderSearch = new BorderSearch({nodes,links,});    
  }

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
          let isGoal = false;
          let res;
          let nodes;
          let i = 0;
          while(i<1000 && !isGoal){
            i++;
            res = this._borderSearch.next();
            nodes = res.nodes;
            // move({nodes})
            isGoal = res.isGoal;

            if(i % 100 === 0){
              console.log(i);
            }

            if(isGoal){
              console.log('GOAL REACHED', res.expansions, nodes);
              move({nodes});
            }

            // console.log('nodes', nodes);
            // isGoal = move({nodes}).isGoal;
          }

          // const { node, color } = res;
          // move({
          //   nodes: this.props.state.nodes,
          //   color,
          //   node,
          // });

          // const { nodes, links } = this.props.state;

          // const { isGoal } = BorderUtil.isGoalState({nodes,links});
          // if(isGoal){
          //   return;
          // }

          // move({nodes});

          // let points = _.cloneDeep(this.state.points);
          // const r = _.random(0,points.length-1)
          // points[r].color = 'yellow';

          // this.setState({
          //   points,
          // })
        }}>change</button>

        <button onClick={()=>{
const x1 = 80;
const x2 = 160;
const x3 = 240;
          move({
            nodes: [
  { id:1, x:x1, y:x2, color: 'purple' },
  { id:2, x:x2, y:x1, color: 'purple' },
  { id:3, x:x2, y:x2, color: 'purple' },

  { id:4, x:x3, y:x1, color: 'purple' },
  { id:5, x:x3, y:x2, color: 'white' },
  { id:6, x:x3, y:x3, color: 'white' },
            ]
          })
        }}>clear</button>
      </div>
    );
  }
}

export default Setup.customConnect('border', borderActions, BorderContainer);
