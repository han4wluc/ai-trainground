
import grid from './modules/grid/grid.reducer';
import nine from './modules/nine/nine.reducer';
import ttt from './modules/ttt/ttt.reducer';
import nav from './modules/nav/nav.reducer';
import border from './modules/border/border.reducer';
import maze from './modules/maze/maze.reducer';
import mdp from './modules/mdp/mdp.reducer';
import miniMaze from './modules/miniMaze/miniMaze.reducer';
import nn from './modules/nn/nn.reducer';
// import nnt from './modules/nnt/nnt.reducer';
import * as nnt from './modules/nnt/reducers';

const {
  nntLinearRegression,
  nntLogisticRegression,
} = nnt;

/**YEOMAN_HOOK_1**/

export {
  grid,
  nine,
  ttt,
  nav,
  border,
  maze,
  mdp,
  miniMaze,
  nn,
  // nnt,
  nntLinearRegression,
  nntLogisticRegression,
  /**YEOMAN_HOOK_2**/
};
