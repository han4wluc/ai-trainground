
import MazeUtil from '../maze/utils/MazeUtil';

export function moveNext(params) {

  const { mazeState, direction } = params;
  const { mazeState:newMazeState, reward } = MazeUtil.nextMove({
    mazeState, direction, noise:false,
  });

  return {
    type: 'MINIMAZE_SET_STATE',
    props: {
      mazeState: newMazeState,
    }
  };
}

export function updateMazeState(params) {
  const { mazeState } = params;
  return {
    type: 'MINIMAZE_SET_STATE',
    props: {
      mazeState,
    }
  };
}

export function resetMaze(params) {
  return {
    type: 'MINIMAZE_RESET_MAZE',
  };
}

