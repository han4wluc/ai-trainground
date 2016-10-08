
import React, { Component } from 'react';
import * as mazeActions from './maze.action';
import { Utils, Comps} from '../../';

const { Setup } = Utils;
const {
  CommonGrid
} = Comps;

class Cell extends Component {
  render(){

    return (
      <div style={{
        color: this.props.color,
      }}>
        {'hello'}
      </div>
    );

  }
}

class MazeContainer extends Component {

  constructor(props) {
    super(props);

    const cells = _.range(5*5).map(()=>{
      return (
        <Cell color={'blue'}/>
      );
    });

    this.state = {
      cells
    };
  }

  render(){
    return (
      <div>
        <CommonGrid
          columns={5}
          rows={5}
          size={50}
          cells={this.state.cells}
          borderWidth={10}
        />
      </div>
    );
  }
}

export default Setup.customConnect('maze', mazeActions, MazeContainer);
