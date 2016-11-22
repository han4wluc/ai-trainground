
// import {
//   submissionRequest
// } from './nnt.network';


import request from 'browser-request';

const submissionRequest = function({ textValue, url }){
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      json:true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url,
      // url: 'http://localhost:3000',
      body: {
        inpt: textValue
      },
    }, function(err, response, body){
      if(err){
        console.log('err', err);
        return reject(err);
      }
      // console.log('body', body);
      return resolve(body);
      // return resolve(JSON.parse(body));
    });
  });
};

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
