
import React, { Component } from 'react';
import _ from 'lodash';

export default class CommonGrid extends Component {

  static propTypes = {
    borderWidth: React.PropTypes.number.isRequired,
    cells: React.PropTypes.array.isRequired,
    columns: React.PropTypes.number.isRequired,
    rows: React.PropTypes.number.isRequired,
    size: React.PropTypes.number.isRequired,
    style: React.PropTypes.object,
  }

  _renderCells(params){
    const { rows, columns, borderWidth, size, cells } = params;
    const components = [];
    let i = 0;
    _.range(rows).forEach((iy)=>{
      const top = iy * size;
      _.range(columns).forEach((ix)=>{
        const left = ix * size;

        console.log(left, top);

        const comp = (
          <div
            key={`${ix}_${iy}`}
            style={{
              position: 'absolute',
              // backgroundColor: 'red',
              width: `${size}px`,
              height: `${size}px`,
              left: `${left+ix*borderWidth}px`,
              top: `${top+iy*borderWidth}px`,
              border: `${borderWidth}px solid black`,
            }}
          >
            {cells[i]}
          </div>
        );

        i++;

        components.push(comp);

      });
    });
    return components;
  }

  render() {

    const {
      rows,
      columns,
      cells,
      borderWidth,
      size,
      style,
    } = this.props;

    const width = size * columns + borderWidth*(columns+1);
    const height = size * rows + borderWidth*(rows+1);

    const components = this._renderCells({rows,columns,cells,borderWidth,size});


    return (
      <div style={{
          backgroundColor:'#ccc',
          // border: '2px solid #bbb',
          width: `${width}px`,
          height: `${height}px`,
          display: 'block',
          position: 'relative',
          float: 'left',
          overflow: 'hidden',
          ...style,
        }}
      >
        {components}
      </div>
    );
  }
}
