
import {
  submissionRequest
} from './nnt.network';

export function submissionRequestAction({ textValue, index, url, name, baseAction }){

  return async (dispatch, getState) => {
    const res = await submissionRequest({textValue, url});

    const { tasks } = getState()[name];
    tasks[index].statusMessage = res.message;

    if(res.success === true){
      // console.log('aaaaa')
      tasks[index].status = 'CORRECT';
      dispatch({
        type: `${baseAction}_SET_STATE`,
        props: {
          tasks,
        }
      });
    } else {
      // console.log('bbbbb', `${baseAction}_SET_STATE`);
      tasks[index].status = 'WRONG';
      dispatch({
        type: `${baseAction}_SET_STATE`,
        props: {
          tasks,
        }
      });
    }

  };
}
