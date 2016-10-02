
import React, { Component } from 'react';
import _ from 'lodash';

import Cell from './Cell';

export default class Grid extends Component {

  static propTypes = {
    columns: React.PropTypes.number.isRequired,
    rows: React.PropTypes.number.isRequired,
  }

  render() {

    const {
      rows,
      columns
    } = this.props;

    const cells = [];

    _.range(rows).forEach((iy)=>{
      const top = iy * 40;
      _.range(columns).forEach((ix)=>{
        const left = ix * 40;
        const cell = (
          <Cell
            key={`${iy}_${ix}`}
            style={{
              position: 'absolute',
              backgroundColor:'#ccc',
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
