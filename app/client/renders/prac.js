
import React from 'react';

import Task from '../comps/Task';

const renderTasks = function({tasks,submissionRequestAction, name, baseAction}){
  return tasks.map((task, i)=>{
    const marginTop = i === 0 ? 0 : 16;
    return (
      <Task
        key={`Task${i}`}
        editorId={`Task${i}`}
        name={name}
        baseAction={baseAction}
        index={i}
        {...task}
        submissionRequestAction={submissionRequestAction}
        style={{
          marginTop,
        }}
      />
    );
  });
};

export {
  renderTasks
};
