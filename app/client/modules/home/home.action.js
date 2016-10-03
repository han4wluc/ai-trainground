
export function updateCell(params) {
  const { x, y } = params;
  return {
    type: 'HOME_UPDATE_CELL',
    props: {
      key: `x${x}y${y}`,
    }
  };
}

export function incrementCellCost(params){
  const { x, y } = params;
  return {
    type: 'HOME_INCREMENT_CELL_COST',
    props: {
      key: `x${x}y${y}`,
    }
  };
}

export function paintCells(params){
  const {
    coordinates
  } = params;

  return {
    type: 'HOME_PAINT_CELLS',
    props: {
      coordinates: coordinates.map((c)=>{
        return `x${c.x}y${c.y}`;
      }),
    }
  };

}

export function resetToInitialState(){
  return {
    type: 'HOME_RESET_TO_INITIAL_STATE',
  };
}
