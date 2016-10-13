
import React, { Component } from 'react';
import * as gridActions from './grid.action';

import { Utils, Comps, } from '../../';

import * as GridRender from './grid.render';

import _ from 'lodash';

const { Setup, GridUtil, SearchTree } = Utils;

const { Chooser, CommonGrid } = Comps;
import { GridCell } from './comps';

class GridContainer extends Component {

  static propTypes = {
    actions: React.PropTypes.object,
    state: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._initTree.call(this);
    this._computeAll.call(this);
  }

  _reset() {
    const {
      // resetToInitialState
      clearPath,
    } = this.props.actions;
    // resetToInitialState();
    clearPath();
    this._initTree.call(this);
  }

  _initTree(){
    const {
      gridState
    } = this.props.state;

    this._searchTree = new SearchTree({
      gridState,
      strategy: 'BFS',
    });
  }

  _next(params) {

    const {
      strategy
    } = params;

    const {
      state: {
        gridState
      },
      actions: {
        updateCell,
        paintCells
      }
    } = this.props;

    // this._searchTree._strategy = strategy;
    if(strategy){
      this._searchTree.setStrategy({strategy});
    }

    const res = this._searchTree.next({gridState});

    if(res.goalReached){
      paintCells({coordinates: res.path.slice(1,-1)});
      return;
    }

    if(res.exhausted){
      return;
    }

    updateCell(res.coordinate);

    return;
  }

  _onClickCell(params){
    const {
      incrementCellCost
    } = this.props.actions;
    const { x, y } = params;

    incrementCellCost({x,y});
  }

  _computeAll(){
    const {
      state: { gridState },
      actions: { setResultTable }
    } = this.props;

    const resultTable = [];
    ['BFS', 'DFS', 'greedy', 'uniform', 'astar'].forEach((strategy)=>{
      const searchTree = new SearchTree({
        gridState,
        strategy,
      });

      let res = {};
      let i = 0;
      while(!res.goalReached && i < 1000){
        i++;
        res = searchTree.next({
          gridState,
        });

        if(res.goalReached){
          resultTable.push({
            strategy,
            expansions: res.expansions,
            cost: res.cost,
            path: res.path,
          });
        }
      }
    });

    setResultTable({resultTable});

  }

  // _renderGridChoosers(){
  //   const {
  //     actions : {
  //       setGridState,
  //     }
  //   } = this.props;

  //   return (
  //     <div style={{
  //       display: 'flex',
  //       flexDirection: 'row'
  //     }}>

  //       <Chooser
  //         onClick={()=>{
  //           setGridState({gridName:'grid_1',rows:5,columns:5})
  //           let self = this;
  //           setTimeout(function(){
  //             self._computeAll.call(self);
  //           },0)
            
  //         }}
  //         text={'grid_1'}
  //       />

  //       <Chooser
  //         onClick={()=>{
  //           setGridState({gridName:'grid_2',rows:8,columns:8})
  //           let self = this;
  //           setTimeout(function(){
  //             self._computeAll.call(self);
  //           },0)
  //         }}
  //         text={'grid_2'}
  //       />
  //     </div>
  //   );

  // }

  // _renderTable(){

  //   const {
  //     state: { resultTable },
  //     actions: { paintCells, updateCells, clearPath }
  //   } = this.props;

  //   const tableRows = resultTable.map((row, i)=>{
  //     const {
  //       strategy, expansions, cost, path
  //     } = row;
  //     return (
  //       <tr key={i}>
  //         <td>{strategy}</td>
  //         <td>{expansions}</td>
  //         <td>{cost}</td>
  //         <td> <button onClick={()=>{
  //           clearPath();
  //           updateCells({coordinates: path});
  //           paintCells({coordinates: path});
  //         }}>{'show'}</button> </td>
  //       </tr>
  //     );
  //   });

  //   return (
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>{'Algorithm'}</th>
  //           <th>{'Expansions'}</th>
  //           <th>{'Cost'}</th>
  //           <th>{'Path'}</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {tableRows}
  //       </tbody>
  //     </table>
  //   );
  // }

  // _renderCells(params){
  //   const { rows,columns,gridState, onClick } = params;
  //   return GridUtil.getGridKeys({rows,columns}).map((key)=>{
  //     const { x, y } = GridUtil.keyToCoor({key});
  //     return (
  //       <GridCell
  //         key={key}
  //         onClick={onClick}
  //         x={x}
  //         y={y}
  //         {...gridState[key]}
  //       />
  //     );
  //   });
  // }

  // _renderButtons(){
  //   return (
  //     <div>
  //       <button onClick={this._next.bind(this, {strategy:'BFS'})}>{'BFS'}</button>
  //       <button onClick={this._next.bind(this, {strategy:'DFS'})}>{'DFS'}</button>
  //       <button onClick={this._next.bind(this, {strategy:'greedy'})}>{'greedy'}</button>
  //       <button onClick={this._next.bind(this, {strategy:'uniform'})}>{'uniform'}</button>
  //       <button onClick={this._next.bind(this, {strategy:'astar'})}>{'astar'}</button>
  //       <button onClick={this._reset.bind(this)}>{'reset'}</button>
  //       <br/>
  //       <button onClick={this._computeAll.bind(this)}>{'computall'}</button>
  //     </div>
  //   );
  // }

  render(){
    const {
      gridState,
      columns,
      rows,
    } = this.props.state;

    const cells = GridRender.renderCells(
      {gridState,columns,rows,onClick:this._onClickCell.bind(this)}
    );

    return (
      <div>
        <div style={{
          display: 'flex'
        }}>
          <CommonGrid
            columns={columns}
            rows={rows}
            size={50}
            cells={cells}
            borderWidth={4}
          />
        </div>

        {GridRender.renderGridChoosers.call(this)}
        {GridRender.renderButtons.call(this)}
        {GridRender.renderTable.call(this)}

      </div>
    );
  }
}

export default Setup.customConnect('grid', gridActions, GridContainer);
