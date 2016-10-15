
import _ from 'lodash';

class BaseGrid {

  /**
   * Converts key to coordinate
   * ex: 'x1y1' -> { x:1, y:1 }
   */
  static keyToCoor({ key }){
    const match = /x(\d+)y(\d+)/g.exec(key);
    let [,x,y] = match;
    x = parseInt(x,10);
    y = parseInt(y,10);
    return { x, y };
  }

  /**
   * Converts coordinate to key
   * ex: { x:1, y:1 } -> 'x1y1'
   */
  static coorToKey(params){
    const { x, y } = params;
    return `x${x}y${y}`;
  }

  constructor({ gridState }) {
    if(!gridState){
      throw new Error('gridState is required in constructor');
    }
    this._gridState = gridState;
  }

  /**
   * Get the coordinates of the 4 cell adjacent to the input coordinate
   * @param coordinate: object, input coordinate
   * @param excludeWalls: bool, if true, do not return walls
   * @return array of coordinates
   */
  _getAdjacentCells({ coordinate, excludeWalls = true }){
    const gridState = this._gridState;

    const {x,y} = coordinate;

    const left   = { x:x-1, y     };
    const right  = { x:x+1, y     };
    const bottom = { x,     y:y-1 };
    const top    = { x,     y:y+1 };

    const finges = [left,right,bottom,top].filter((d)=>{
      const key = BaseGrid.coorToKey(d);
      const cellExists = !!gridState[key];

      if(!cellExists){
        return false;
      }

      const { isWall } = gridState[key];
      if(excludeWalls){
        return cellExists && !isWall;
      }
      return cellExists;
    });

    return finges;
  }

  /**
   * returns the first key of the cell with the propName
   */
  _getCoordinateWith(params){
    const { propName } = params;
    for (var key in this._gridState){
      const cell = this._gridState[key];
      if(cell[propName]){
        return BaseGrid.keyToCoor({key});
      }
    }
  }

  /**
   * Get all keys of the grid
   */
  _getGridKeys(){
    return Object.keys(this._gridState);
  }

}

export default BaseGrid;
