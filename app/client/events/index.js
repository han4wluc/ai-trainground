
import Rx from 'rxjs/Rx';

const keyCodeMap = {
  '37': 'left',
  '38': 'top',
  '39': 'right',
  '40': 'bottom',
};

const keyDown = function(action){
  return Rx.Observable.fromEvent(document, 'keydown')
    .filter((e)=>{
      e = e || window.event;
      return _.has(keyCodeMap, e.keyCode);
    })
    .throttle((e) => Rx.Observable.interval(100))
    .subscribe((e) =>{
      e = e || window.event;
      e.preventDefault();
      const { keyCode } = e;
      const direction = keyCodeMap[keyCode];
      // console.log('direction', direction);
      action(direction);
  });

};

export {
  keyDown
};
