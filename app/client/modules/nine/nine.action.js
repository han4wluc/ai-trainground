
import _ from 'lodash';

export function move(params){
  const {fr, to} = params;
  return (dispatch, getState)=>{
    const boardState = _.cloneDeep(getState().nine.boardState);
    const temp = boardState[fr];
    boardState[fr] = boardState[to];
    boardState[to] = temp;
    dispatch({
      type: 'NINE_SET_STATE',
      props: {
        boardState,
      }
    });
  };
}
