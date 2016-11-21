
import React, { Component } from 'react';
import * as nntActions from './nnt.action';
import { Utils, } from '../../';

import {
  Task
} from './comps';

const { Setup } = Utils;

class NntContainer extends Component {

  _renderTasks({tasks,submissionRequestAction}){
    return tasks.map((task, i)=>{
      const marginTop = i === 0 ? 0 : 16;
      return (
        <Task
          key={`Task${i}`}
          editorId={`Task${i}`}
          index={i}
          {...task}
          submissionRequestAction={submissionRequestAction}
          style={{
            marginTop,
          }}
        />
      );
    });
  }

  render(){

    const {
      tasks,
    } = this.props.state;

    const {
      submissionRequestAction,
    } = this.props.actions;

    const tasksComps = this._renderTasks({tasks,submissionRequestAction});

    return (
      <div style={{flex:1}}>
        <h1> {'Linear Regression'} </h1>
        {tasksComps}
      </div>
    );
  }
}

export default Setup.customConnect('nnt', nntActions, NntContainer);
