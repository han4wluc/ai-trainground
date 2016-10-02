
import React, { Component } from 'react';
import * as homeActions from './home.action';

import { Utils} from '../../';

const { Setup } = Utils;

class HomeContainer extends Component {
  render(){
    return (
      <div>{'Hello Home'}</div>
    );
  }
}

export default Setup.customConnect('home', homeActions, HomeContainer);
