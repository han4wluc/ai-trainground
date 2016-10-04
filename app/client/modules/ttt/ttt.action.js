
import _ from 'lodash';

export function makeMove(params) {
  const {
    player,
    key,
  } = params;

  return (dispatch, getState) => {

    const boardState = _.cloneDeep(getState().ttt.boardState);
    boardState[key] = player;

    console.log(boardState);

    dispatch({
      type: 'TTT_SET_STATE',
      props: {
        boardState,
      }
    });
  };


}
