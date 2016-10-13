
const computeManhattanDistance = function(params){
  const { start, end } = params;
  const {
    x: sx,
    y: sy,
  } = start;
  const {
    x: ex,
    y: ey,
  } = end;
  const horizontalDistance = Math.abs(sx - ex);
  const verticalDistance = Math.abs(sy - ey);
  return horizontalDistance + verticalDistance;
};

export {
  computeManhattanDistance,
};
