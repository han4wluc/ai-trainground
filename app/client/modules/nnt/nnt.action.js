
import {
  submissionRequest
} from './nnt.network';

export function updateTextValue({ textValue }) {
  return {
    type: 'NNT_SET_STATE',
    props: {
      textValue,
    }
  };
}

export function submissionRequestAction({ textValue, index }){
  // const {
  //   state,
  // } = params;
  // console.log('aaaaa')

  return async (dispatch, getState) => {
    // console.log('bbbbb')
    // console.log('getState', getState);
    // return await submissionRequest();
    const res = await submissionRequest({textValue});
    console.log('res', res);

    const { tasks } = getState().nnt;
    tasks[index].statusMessage = res.message;

    if(res.success === true){
      console.log('aaaaa')
      tasks[index].status = 'CORRECT';
      dispatch({
        type: 'NNT_SET_STATE',
        props: {
          tasks,
          // response: 'CORRECT',
          // message: res.message,
        }
      });
    } else {
      console.log('bbbbb');
      tasks[index].status = 'WRONG';
      dispatch({
        type: 'NNT_SET_STATE',
        props: {
          tasks,
          // response: 'WRONG',
          // message: res.message,
        }
      });
    }


    // return Promise.resolve(res);
  };
}
