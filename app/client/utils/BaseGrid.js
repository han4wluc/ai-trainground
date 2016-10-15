
import _ from 'lodash';

class BaseGrid {

  static keyToCoor(params){
    const { key } = params;
    const r = /x(\d+)y(\d+)/g;
    const match = r.exec(key);
    const x = parseInt(match[1],10);
    const y = parseInt(match[2],10);
    return { x, y };
  }

  static coorToKey(params){
    const { x, y } = params;
    return `x${x}y${y}`;
  }

  constructor(params) {

    const { gridState } = params;

    if(!gridState){
      throw new Error('gridState is required in constructor');
    }

    this._gridState = gridState;

  }

  _getAdjacentCells(params){
    const {
      coordinate,
      excludeWalls = true,
    } = params;

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

  _getCoordinateWith(params){
    const { propName } = params;
    // return function(propName){
      for (var key in this._gridState){
        const cell = this._gridState[key];
        if(cell[propName]){
          return BaseGrid.keyToCoor({key});
        }
      }
    // };
  }

  _getGridKeys(){
    return Object.keys(this._gridState);
  }

}

export default BaseGrid;
