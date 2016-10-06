
// import Promise from 'bluebird';
import request from 'browser-request';
// const config = require('../../config.json');
import config from 'json!../../config.json';
const { host:HOST } = config;
// Promise.promisifyAll(Request);


const doRequest = function(params){
  const { boardState } = params;
  // const res = await
  // request({
  //   // url: 'http://192.168.1.172:3100'
  //   url: 'http://192.168.1.172:3100/fittest'
  //   // url: 'http://192.168.1.172:3100/random'
  // }, function(err, response, body){
  //   console.log(JSON.parse(body));
  // });
  // console.log(res);

  console.log('boardState', boardState)

  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${HOST}move/57f5bb70249e8046389f6e1b`,
      type: "POST",
      crossDomain: true,
      data: JSON.stringify(boardState),
      dataType: "json",
      success: function (response) {
        // console.log(response)
        resolve(response);
          // var resp = JSON.parse(response)
          // alert(resp.status);
      },
      error: function (xhr, status) {
        reject('error');
          // alert("error");
      }
    });
  });

  // request({
  //   method: 'POST',
  //   json:true,
  //   // crossDomain: true,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     // 'User-Agent': 'request'
  //   },

  //   url: 'http://192.168.1.172:3100/move/57f5ba43249e8046389f6974',
  //   body: {
  //     '0,0' : 0,
  //     '0,1' : 0,
  //     '0,2' : 0,
  //     '1,0' : 0,
  //     '1,1' : 0,
  //     '1,2' : 0,
  //     '2,0' : 0,
  //     '2,1' : 0,
  //     '2,2' : 0,
  //   },
  // }, function(err, response, body){
  //   console.log(err, body);
  // });

};

// doRequest();

export default {
  doRequest,
};

// export function doRequest = doRequest;


// http://192.168.1.172:3100/

