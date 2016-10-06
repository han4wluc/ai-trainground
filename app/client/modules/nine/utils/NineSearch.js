
import _ from 'lodash';

import NineUtil from './NineUtil';

export default class NineSearch {

  constructor(params) {
    // super(props);

    //
    const { boardState } = params;
    this._boardState = boardState;

    const successor = NineUtil.getSuccessor({boardState});

    console.log(successor);
    // successor.

    this._finges = [];
  }

  next(){

// 　１９２．１６８．１．１７２
// 192.168.1.172

  }


}
