
// import Promise from 'bluebird';
import request from 'browser-request';
// const config = require('../../config.json');
import config from 'json!../../config.json';
const { host:HOST } = config;
// const request = Promise.promisifyAll(require('browser-request'));

// http://192.168.1.172:3100/fittest

const getFittest = function(){
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url: 'http://192.168.1.172:3100/fittest',
    }, function(err, response, body){
      if(err){
        return reject(err);
      }
      return resolve(JSON.parse(body));
    });
  });
};

const requestNextMove = async function(params){

  return Promise.resolve({
    action: '0,0'
  });

  const { boardState } = params;
  // return new Promise((resolve, reject) => {
  //   $.ajax({

  //     beforeSend: function(xhr){
  //       xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  //     },

  //     url: `${HOST}move/57f5bb70249e8046389f6e1b`,
  //     type: 'POST',
  //     processData: false,
  //     data: JSON.stringify({
  //       gameState: boardState
  //     }),
  //     // data: boardState,
  //     // dataType: "json",
  //     success: function (response) {
  //       resolve(response);
  //     },
  //     error: function (xhr, status) {
  //       reject('error');
  //     }
  //   });
  // });

  // 57f5bb70249e8046389f6e1b
  const fittest = await getFittest();
  const fittestId = fittest._id;

  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      json:true,
      // crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
      },
      url: `http://192.168.1.172:3100/move/${fittestId}`,
      body: {
        gameState: boardState
      },
    }, function(err, response, body){
      if(err){
        return reject(err);
      }
      return resolve(body);
    });
  });

};

export default {
  requestNextMove,
  getFittest,
};

// export function doRequest = doRequest;


// http://192.168.1.172:3100/

