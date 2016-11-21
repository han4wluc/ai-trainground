
import React, { Component } from 'react';
import * as nnActions from './nn.action';
import { Utils, } from '../../';

const { Setup } = Utils;

class NnContainer extends Component {
  render(){
    return (
      <div>{'Hello'}</div>
    );
  }
}

export default Setup.customConnect('nn', nnActions, NnContainer);
