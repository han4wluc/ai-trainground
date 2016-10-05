
import React, { Component } from 'react';
import * as borderActions from './border.action';
import { Utils, } from '../../';
import ReactDom from 'react-dom';

const { Setup } = Utils;

class DirectedGraph extends Component {

  componentDidMount(){
    const el = ReactDom.findDOMNode(this);
    const svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', '100%')
      .attr('height', '300px');

    svg.append('g')
      .attr('class', 'd3-points');

    const g = d3.select(el).selectAll('.d3-points');

    const x1 = 80;
    const x2 = 160;
    const x3 = 240;

    const points = [
      { id:1, x:x1,  y:x2, color: 'white' },
      { id:2, x:x2,  y:x1, color: 'blue' },
      { id:3, x:x2,  y:x2, color: 'green' },

      { id:4, x:x3,  y:x1, color: 'green' },
      { id:5, x:x3,  y:x2, color: 'green' },
      { id:6, x:x3,  y:x3, color: 'green' },
    ];

    const links = [
      { fr:1, to:2 },
      { fr:1, to:3 },
      { fr:2, to:3 },
      { fr:2, to:4 },
      { fr:3, to:4 },
      { fr:3, to:5 },
      { fr:3, to:6 },
      { fr:4, to:5 },
      { fr:5, to:6 },
      // { fr:2, to:3 },
      // { fr:2, to:3 },
    ];

    const linkss = links.map((l, i)=>{
      const pointFr = _.find(points, { id:l.fr });
      const pointTo = _.find(points, { id:l.to });
      return {
        id: i,
        x1: pointFr.x,
        y1: pointFr.y,
        x2: pointTo.x,
        y2: pointTo.y,
      };
    });

    // const points = [10,20,30];

    var line = g.selectAll('.d3-line')
      .data(linkss, (d) => d.id);

    line.enter().append('line')
      .attr('class', 'd3-line')
      .attr('x1', (d)=>d.x1 )
      .attr('y1', (d)=>d.y1 )
      .attr('x2', (d)=>d.x2 )
      .attr('y2', (d)=>d.y2 )
      .attr('stroke-width', 2)
      .attr('stroke', 'black');

    line.exit()
        .remove();

    var cont = g.selectAll('g')
      .data(points, (d) => d.id);

    const entered = cont
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x},${d.y})`);

    entered.append('circle')
      // .attr('cx', (d, i) => d.x)
      // .attr('cy', (d, i) => d.y)
      .attr('stroke-width', 1)
      .attr('stroke', 'black')
      .attr('r', (d,i) => 20)
      .attr('fill', (d) => d.color);

    entered.append('text')
      .attr('dx', -4)
      .attr('dy', 4)
      .text((d)=>d.id);

  }

  render(){
    return (
      <div className="directed-graph"></div>
    );
  }
}

class BorderContainer extends Component {

  constructor(props) {
    super(props);

    // this.state = {
    //   data: sampleData,
    //   domain: {x: [0, 30], y: [0, 100]}
    // };
  }

  componentDidMount() {
    const self = this;
    // setTimeout(function(){
    //   self.setState({
    //     data: [{id: '5fbmzmtc', x: 1, y: 1, z: 6},
    //     {id: 's4f8phwm', x: 11, y: 45, z: 9}],
    //   })    
    // },5000)

  }

  render(){
    return (
      <div>
        {'Hello'}
        <DirectedGraph/>
        {/*<Chart
          data={this.state.data}
          domain={this.state.domain} />*/}
      </div>
    );
  }
}

export default Setup.customConnect('border', borderActions, BorderContainer);
