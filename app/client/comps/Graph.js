
import React, { Component } from 'react';
import ReactDom from 'react-dom';


var lineFunction = d3.svg.line()
             .x(function(d) { return d.x; })
             .y(function(d) { return d.y; })
             .interpolate("basis");

const getArc = function(params){
  const { x1,y1,x2,y2 } = params;
  const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))/2;
  // const radius = (x2 - x1) /2 ;

  const coors = [1.35,1.3,1.2,1.1,1,0.9,0.8,0.7,0.68].map((r)=>{
    return {
      x: Math.sin(Math.PI*r) * radius + x1 + radius,
      y: (Math.cos(Math.PI*r) * radius * 1.3) + y1,
    };
  });

  return lineFunction(coors);

};

export default class Graph extends Component {

  static propTypes = {
    links: React.PropTypes.array,
    nodes: React.PropTypes.array,
  }

  componentDidMount(){
    const element = ReactDom.findDOMNode(this);
    const svg = d3.select(element).append('svg')
      .attr('class', 'd3')
      .attr('width', '100%')
      .attr('height', '300px');

    svg.append('g')
      .attr('class', 'd3-points');

    const { nodes, links, graphType } = this.props;

    if(graphType === 'line'){
      this._updateLinksLine({nodes, links, element});
    } else if(graphType === 'mdp'){
      this._updateLinksMdp({nodes, links, element});
    }

    this._updateNodes({nodes, links, element});
  }

  componentDidUpdate() {
    const { nodes, links } = this.props;
    const element = ReactDom.findDOMNode(this);
    // this._updateLinks({nodes, links, element});
    this._updateNodes({nodes, links, element});
  }

  _updateNodes(params){
    const { nodes, links, element } = params;
    const g = d3.select(element).selectAll('.d3-points');
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

  _updateLinksLine(params){

    const { nodes, links, element } = params;
    const g = d3.select(element).selectAll('.d3-points');

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

    line.enter().append('line')
      .attr('class', 'd3-line')
      .attr('x1', (d)=>d.x1 )
      .attr('y1', (d)=>d.y1 )
      .attr('x2', (d)=>d.x2 )
      .attr('y2', (d)=>d.y2 )
      // .attr('x2', (d)=> {
      //   const diffX = d.x2 - d.x1;
      //   const diffY = d.y2 - d.y1;

      //   let diagonalMultiplier = 0;
      //   if(Math.abs(diffX) > 10 && Math.abs(diffY) > 10){
      //     diagonalMultiplier = 0.1;
      //   }

      //   return d.x1 + (diffX * (0.6 + diagonalMultiplier));
      // })
      // .attr('y2', (d)=> {
      //   const diffX = d.x2 - d.x1;
      //   const diffY = d.y2 - d.y1;

      //   let diagonalMultiplier = 0;
      //   if(Math.abs(diffX) > 10 && Math.abs(diffY) > 10){
      //     diagonalMultiplier = 0.1;
      //   }

      //   return d.y1 + (diffY*(0.6 + diagonalMultiplier));
      // })
      .attr('stroke-width', 2)
      .attr('stroke', 'black')
      .attr('marker-end', 'url(#arrow)');

    line.exit()
        .remove();
  }


// http://jsfiddle.net/manojmcet/BcW8z/
// http://jsfiddle.net/manojmcet/wJVMx/
// http://bl.ocks.org/mbostock/1153292
// http://logogin.blogspot.sg/2013/02/d3js-arrowhead-markers.html
// https://www.dashingd3js.com/svg-paths-and-d3js
  _updateLinksMdp(params){
    const { nodes, links, element } = params;
    const g = d3.select(element).selectAll('.d3-points');

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

    line.exit()
        .remove();
  }

  render(){
    return (
      <div className="directed-graph"></div>
    );
  }
}
