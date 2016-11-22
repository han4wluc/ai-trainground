
import React, { Component } from 'react';
import * as pracLogRegActions from './pracLogReg.action';
import { Utils, } from '../..';
import { PracRenders } from '../../renders';

const { Setup } = Utils;

class PracLogRegContainer extends Component {

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
      name: 'pracLogReg',
      baseAction: 'PRACLOGREG',
    });


    return (
      <div style={{flex:1}}>
        <h1> {'Logistic Regression'} </h1>
        {tasksComps}
      </div>
    );
  }
}

export default Setup.customConnect('pracLogReg', pracLogRegActions, PracLogRegContainer);
