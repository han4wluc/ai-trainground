
import React, { Component } from 'react';
import * as navActions from './nav.action';
import { Utils, } from '../../';

const { Setup } = Utils;


import { Link, browserHistory } from 'react-router';

class NavContainer extends Component {
  render(){
    return (
      <div>
        <Link to="/grid">grid</Link>
        {'   '}
        <Link to="/nine">nine</Link>
        {'   '}
        <Link to="/ttt">ttt</Link>
        {'   '}
        <Link to="/border">border</Link>
        {'   '}
        <Link to="/maze">maze</Link>
        {'   '}
        <Link to="/mdp">mdp</Link>
        {'   '}
        <Link to="/miniMaze">miniMaze</Link>
        {'   '}
        <Link to="/nn">Neural Network</Link>
        {'   '}
        <Link to="/pracLinReg">pracLinReg</Link>
        {'   '}
        <Link to="/pracLogReg">pracLogReg</Link>
        {'   '}
        <Link to="/pracNeuNet">Neural Network</Link>

        <br/>
        <br/>
        <br/>

        {this.props.children}
      </div>
    );
  }
}

export default Setup.customConnect('nav', navActions, NavContainer);
