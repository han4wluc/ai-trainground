
import React, { Component } from 'react';
import * as homeActions from './home.action';

import { Utils, Comps, } from '../../';

const { Setup } = Utils;
const { Cell, Grid } = Comps;

class HomeContainer extends Component {
  render(){
    return (
      <div>
        <Grid
          rows={6}
          columns={6}
        />
      </div>
    );
  }
}

export default Setup.customConnect('home', homeActions, HomeContainer);
