
import React, { Component } from 'react';
import ReactDom from 'react-dom';

export default class DirectedGraph extends Component {

  static propTypes = {
    links: React.PropTypes.array,
    nodes: React.PropTypes.array,
  }

  componentDidMount(){
    const el = ReactDom.findDOMNode(this);
    const svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', '100%')
      .attr('height', '300px');

    svg.append('g')
      .attr('class', 'd3-points');


    // const defs = svg.append('defs');
    // const marker = defs.append('marker')
    //   .attr('id', 'arrow')
    //   .attr('markerWidth', 10)
    //   .attr('markerHeight', 10)
    //   .attr('refx', 0)
    //   .attr('refy', 3)
    //   .attr('orient', 'auto')
    //   .attr('markerUnits', 'strokeWidth');

    // marker.append('path')
    //   .attr('d', 'M0,0 L0,6 L9,3 z')
    //   .attr('fill', '#f00');


    const { nodes, links } = this.props;

    this._update.call(this,{nodes, links});
  }

  componentDidUpdate() {
    const { nodes, links } = this.props;
    this._update.call(this,{nodes, links});
  }

  _update(params){

    const { nodes, links } = params;

    const el = ReactDom.findDOMNode(this);

    const g = d3.select(el).selectAll('.d3-points');

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
// marker-end="url(#arrow)"

    line.exit()
        .remove();

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

  render(){
    return (
      <div className="directed-graph"></div>
    );
  }
}
