
import React, { Component } from 'react';
import * as borderActions from './border.action';
import { Utils, Comps } from '../../';

import _ from 'lodash';
const {
  Graph
} = Comps;

import BorderUtils from './utils';
const {
  BorderUtil,
  BorderSearch,
} = BorderUtils;

const { Setup } = Utils;
class BorderContainer extends Component {

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
        <Graph
          nodes={nodes}
          links={links}
          graphType={'line'}
        />
        <button onClick={()=>{
          let isGoal = false;
          let res;
          let nodes;
          let i = 0;
          while(i < 1 && !isGoal){
            i++;
            res = this._borderSearch.next();
            nodes = res.nodes;
            move({nodes});
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

        }}>change</button>

        <button onClick={()=>{
          // 
        }}>clear</button>
      </div>
    );
  }
}

export default Setup.customConnect('border', borderActions, BorderContainer);
