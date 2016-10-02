
export function updateCell(params) {

  const { x, y } = params;

  return {
    type: 'HOME_UPDATE_CELL',
    props: {
      key: `x${x}y${y}`,
    }
  };

}
