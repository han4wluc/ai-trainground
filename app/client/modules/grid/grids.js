
import Utils from '../../utils';
const {
  GridUtil
}  = Utils;

export default {
  GRID_1: {
    columns: 5,
    rows: 5,
    gridState: {
      ...GridUtil.generateInitialGridState({columns:5,rows:5}),
      'x1y1': {
        isStart: true,
        cost: 0,
      },
      'x3y4': {
        isGoal: true,
        cost: 0,
      },
    },
  },
  GRID_2: {
    columns: 8,
    rows: 8,
    gridState: {
      ...GridUtil.generateInitialGridState({columns:8,rows:8}),
      'x1y2': {
        isStart: true,
        cost: 0,
      },
      'x2y2': {
        cost: 0,
        isWall: true,
      },
      'x2y3': {
        cost: 0,
        isWall: true,
      },
      'x2y4': {
        cost: 3,
      },
      'x2y5': {
        cost: 2,
      },
      'x5y5': {
        isGoal: true,
        cost: 0,
      }
    },
  }
};
