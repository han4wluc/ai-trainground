
import React, { Component } from 'react';
import * as pracLinRegActions from './pracLinReg.action';
import { Utils, } from '../..';
import { PracRenders } from '../../renders';

const { Setup } = Utils;

class PracLinRegContainer extends Component {

  render(){

    const {
      tasks,
    } = this.props.state;

    const {
      submissionRequestAction,
    } = this.props.actions;

    const tasksComps = PracRenders.renderTasks({
      tasks,
      submissionRequestAction,
      name: 'pracLinReg',
      baseAction: 'PRACLINREG',
    });


    return (
      <div style={{flex:1}}>
        <h1> {'Linear Regression'} </h1>
        {tasksComps}
      </div>
    );
  }
}

export default Setup.customConnect('pracLinReg', pracLinRegActions, PracLinRegContainer);
