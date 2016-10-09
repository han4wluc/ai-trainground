
import React, { Component } from 'react';
import * as mdpActions from './mdp.action';
import { Utils, } from '../../';
import ReactDom from 'react-dom';

const { Setup } = Utils;


// http://jsfiddle.net/manojmcet/BcW8z/
// http://jsfiddle.net/manojmcet/wJVMx/
// http://bl.ocks.org/mbostock/1153292
// http://logogin.blogspot.sg/2013/02/d3js-arrowhead-markers.html
// https://www.dashingd3js.com/svg-paths-and-d3js

class MdpContainer extends Component {

  componentDidMount() {
    const el = ReactDom.findDOMNode(this);

var width = 960,
    height = 500;

    const svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', width)
      .attr('height', height);

    svg.append('g')
      .attr('class', 'd3-points');

    const g = d3.select(el).selectAll('.d3-points');

    var lineFunction = d3.svg.line()
                 .x(function(d) { return d.x; })
                 .y(function(d) { return d.y; })
                 .interpolate("basis");

    const getArc = function(params){
      const { x1,y1,x2,y2 } = params;
      const radius = (x2 - x1)/2;

      const coors = [1.35,1.3,1.2,1.1,1,0.9,0.8,0.7,0.68].map((r)=>{
        return {
          x: Math.sin(Math.PI*r) * radius + x1 + radius,
          y: (Math.cos(Math.PI*r) * radius * 1.3) + y1,
        };
      });

      return lineFunction(coors);

    };

    const x1 = 100;
    const y1 = 100;
    const x2 = 200;
    const y2 = 100;

    // const radius = (x2 - x1)/2;

    // const coors = [1.35,1.3,1.2,1.1,1,0.9,0.8,0.7,0.68].map((r)=>{
    //   return {
    //     x: Math.sin(Math.PI*r) * radius + x1 + radius,
    //     y: (Math.cos(Math.PI*r) * radius * 1.3) + y1,
    //   };
    // });

    // const lineData = [
    //   ...coors,
    // ];

    

    const nodes = [
      { id:1, x:x1, y:y1, color: 'red' },
      { id:2, x:x2, y:y2, color: 'white' },
    ];

    const links = [{
      fr: 1, to: 2,
    }, {
      fr: 2, to: 1,
    }];

    const linkss = links.map((l, i)=>{
      const pointFr = _.find(nodes, { id:l.fr });
      const pointTo = _.find(nodes, { id:l.to });
      return {
        id: i,
        x1: pointFr.x,
        y1: pointFr.y,
        x2: pointTo.x,
        y2: pointTo.y,
      };
    });


    var line = g.selectAll('.d3-line')
      .data(linkss, (d) => d.id);


    line.enter().append('path')
      .attr('class', 'd3-line')
      .attr('d', (d)=>{
        return getArc({x1:d.x1,y1:d.y1,x2:d.x2,y2:d.y2});
      })
      // .attr('d', lineFunction(lineData))
      // .attr('d', 'M 0 100 L 50 50 L 100 100')
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('marker-end', 'url(#arrow)')











    var cont = g.selectAll('g')
      .data(nodes, (d) => d.id + d.color);

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

    cont.exit()
      .remove();


  }

  _update(){
    const x1 = 0;
    const y1 = 100;
    const x2 = 100;
    const y2 = 100;

    const radius = (x2 - x1)/2;
    const x3 = Math.cos(Math.PI/4) * radius;
    const y3 = Math.sin(Math.PI/4) * radius;

  }

  render(){
    return (
      <div>{'Hello'}</div>
    );
  }
}

export default Setup.customConnect('mdp', mdpActions, MdpContainer);
