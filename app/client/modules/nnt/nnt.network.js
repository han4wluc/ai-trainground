
import request from 'browser-request';

const submissionRequest = function({ textValue }){
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      json:true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: 'http://localhost:3000',
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

export {
  submissionRequest,
};
