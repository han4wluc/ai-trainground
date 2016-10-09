
import React, { Component } from 'react';
import * as mazeActions from './maze.action';
import { Utils, Comps} from '../../';

import { MazeCell } from './comps';

const { Setup, GridUtil } = Utils;

const {
  CommonGrid
} = Comps;

class MazeContainer extends Component {

  constructor(props) {
    super(props);
  }

  _renderCells(params){
    const { mazeState, rows, columns } = params;

    // console.log('mazeState', mazeState);
    // const cells = _.range(5*5).map(()=>{
    const cells = [];
    _.range(rows).forEach((iy)=>{
      _.range(columns).forEach((ix)=>{

        const key = `x${ix}y${iy}`;
        let backgroundColor = '#ccc';
        let text = '';
        let children = null;

        if(mazeState[key].isWall){
          backgroundColor = 'black';
        }

        if(mazeState[key].backgroundColor){
          backgroundColor = mazeState[key].backgroundColor;
        }

        if(mazeState[key].reward !== undefined){
          text = mazeState[key].reward;
        }

        let image;
        if(mazeState[key].isPlayer){

          const direction = mazeState[key].direction;
          let degree = '0';
          if(direction === 'bottom'){
            degree = '90';
          }
          if(direction === 'left'){
            degree = '180';
          }
          if(direction === 'top'){
            degree = '270';
          }

          image = (
            <img
              style={{
                position: 'absolute',
                top: '25%',
                left: '25%',
                width: '50%',
                transform: `rotate(${degree}deg)`,
              }}
              src='./app/static/images/pacman.png'
            />
          );
        }

        children = (
          <div>
            {mazeState[key].reward}
            {image}
          </div>
        );

        cells.push(
          <MazeCell
            style={{
              backgroundColor,
            }}
          >
            {children}
          </MazeCell>
        );
      });
    });
    return cells;
  }

  render(){

    const {
      state: {
        mazeState,
        columns,
        rows,
      }
    } = this.props;

    const cells = this._renderCells({mazeState,columns,rows});

    return (
      <div>
        <CommonGrid
          columns={columns}
          rows={rows}
          size={50}
          cells={cells}
          borderWidth={4}
        />
      </div>
    );
  }
}

export default Setup.customConnect('maze', mazeActions, MazeContainer);
