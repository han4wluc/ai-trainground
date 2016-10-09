
import React, { Component } from 'react';
import * as mdpActions from './mdp.action';
import { Utils, } from '../../';
import ReactDom from 'react-dom';

const { Setup } = Utils;


class MdpContainer extends Component {

  componentDidMount() {

    

  }


  render(){
    return (
      <div>{'Hello'}</div>
    );
  }
}

export default Setup.customConnect('mdp', mdpActions, MdpContainer);
