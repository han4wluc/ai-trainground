
import React, { Component } from 'react';
import _ from 'lodash';

import Cell from './Cell';

export default class Grid extends Component {

  static propTypes = {
    columns: React.PropTypes.number.isRequired,
    gridState: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func,
    rows: React.PropTypes.number.isRequired,
  }

  render() {

    const {
      rows,
      columns,
      onClick,
      gridState,
    } = this.props;

    const cells = [];

    _.range(rows).forEach((iy)=>{
      const top = iy * 40;
      _.range(columns).forEach((ix)=>{
        const left = ix * 40;

        const coor = `x${ix}y${iy}`;

        // let backgroundColor = '#ccc';
        const showDot = gridState[coor].showDot;
        let backgroundColor = gridState[coor].color || '#ccc';
        if(gridState[coor].isStart){
          backgroundColor = 'blue';
        }
        if(gridState[coor].isGoal){
          backgroundColor = 'green';
        }


        const cell = (
          <Cell
            key={`${iy}_${ix}`}
            onClick={onClick}
            x={ix}
            y={iy}
            showDot={showDot}
            style={{
              position: 'absolute',
              backgroundColor,
              // backgroundColor:'#ccc',
              left: `${left}px`,
              top: `${top}px`,
            }}
          />
        );
        cells.push(cell);
      });
    });

    const width = columns * 40 + 2;
    const height = rows * 40 + 2;

    return (
      <div style={{
          backgroundColor:'black',
          width: `${width}px`,
          height: `${height}px`,
          display: 'block',
          position: 'relative',
          float: 'left',
        }}
      >
        {cells}
      </div>
    );
  }
}
