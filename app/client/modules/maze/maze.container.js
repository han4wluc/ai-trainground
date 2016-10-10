
import React, { Component } from 'react';
import * as mazeActions from './maze.action';
import { Utils, Comps} from '../../';

import { MazeCell } from './comps';

const { Setup, GridUtil } = Utils;

const {
  CommonGrid
} = Comps;

import { MazeSearch } from './utils';

class MazeContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('didmount');

    document.onkeydown = checkKey;

    const {
      state: { mazeState },
      actions: { move, displayUtility }
    } = this.props;

    let self = this;
    function checkKey(e) {

      const { mazeState } = self.props.state;

      e = e || window.event;


      // console.log(e.keyCode)

      let direction;

      if (e.keyCode == '38') {
          // up arrow
          direction = 'top';
      }
      else if (e.keyCode == '40') {
          // down arrow
          direction = 'bottom';
      }
      else if (e.keyCode == '37') {
         // left arrow
         direction = 'left';
      }
      else if (e.keyCode == '39') {
         // right arrow
         direction = 'right';
      }

      move({mazeState,direction,reward:self.props.state.reward});

    }


    this._mazeSearch = new MazeSearch({mazeState});
    const utilities = this._mazeSearch.next();
    displayUtility({utilities})
  }

  componentWillUnmount(){
    console.log('willunmount')
    document.onkeydown = undefined;
  }

  _renderCells(params){
    const { mazeState, rows, columns, utilities } = params;

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

        const utility = utilities[key];

        children = (
          <div
            style={{
              top: '0px,'
            }}
          >
            {/*mazeState[key].reward*/}
            {/*utility*/}
            {image}
          </div>
        );

        cells.push(
          <MazeCell
            crossed={true}
            utility={utility}
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
        reward,
        utilities,
      },
      actions: { calc, reset }
    } = this.props;

    const cells = this._renderCells({mazeState,columns,rows,utilities});

    return (
      <div>
        <CommonGrid
          columns={columns}
          rows={rows}
          size={80}
          cells={cells}
          borderWidth={4}
        />
        <div>{`Reward: ${reward}`}</div>
        <button onClick={reset}>{'reset'}</button>
        <button onClick={calc}>{'calc'}</button>
      </div>
    );
  }
}

export default Setup.customConnect('maze', mazeActions, MazeContainer);
