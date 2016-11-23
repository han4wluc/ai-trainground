
import React, { Component } from 'react';
import * as pracNeuNetActions from './pracNeuNet.action';
import { Utils, } from '../../';
import { PracRenders } from '../../renders';

const { Setup } = Utils;

class PracNeuNetContainer extends Component {

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
      name: 'pracNeuNet',
      baseAction: 'PRACNEUNET',
    });

    return (
      <div style={{flex:1}}>
        <h1> {'Neural Networks'} </h1>
        {tasksComps}
      </div>
    );
  }
}

export default Setup.customConnect('pracNeuNet', pracNeuNetActions, PracNeuNetContainer);
