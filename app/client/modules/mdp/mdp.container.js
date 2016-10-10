
import React, { Component } from 'react';
import * as mdpActions from './mdp.action';
import { Utils, Comps } from '../../';
import ReactDom from 'react-dom';

const { Setup } = Utils;

const {
  Graph
} = Comps;

class MdpContainer extends Component {

  componentDidMount() {



  }


  render(){

    const {
      state: { nodes, links, }
    } = this.props;

    return (
      <div>
        <Graph
          nodes={nodes}
          links={links}
          radius={50}
          graphType={'line'}
        />
      </div>
    );
  }
}

export default Setup.customConnect('mdp', mdpActions, MdpContainer);
