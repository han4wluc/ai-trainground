
import React, { Component } from 'react';
import * as homeActions from './home.action';

import { Utils, Comps, } from '../../';

const { Setup } = Utils;
const { Cell } = Comps;

class HomeContainer extends Component {
  render(){
    return (
      <Cell/>
    );
  }
}

export default Setup.customConnect('home', homeActions, HomeContainer);
