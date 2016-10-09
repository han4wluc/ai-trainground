
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
        <br/>
        <br/>

        {this.props.children}
      </div>
    );
  }
}

export default Setup.customConnect('nav', navActions, NavContainer);
