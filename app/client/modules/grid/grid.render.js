
import React, { Component } from 'react';
import { GridCell } from './comps';
import { Comps, Utils } from '../../';
const {
  Chooser
} = Comps;
const {
  GridUtil
} = Utils;

const renderButtons = function(){
  return (
    <div>
      <button onClick={this._next.bind(this, {strategy:'BFS'})}>{'BFS'}</button>
      <button onClick={this._next.bind(this, {strategy:'DFS'})}>{'DFS'}</button>
      <button onClick={this._next.bind(this, {strategy:'greedy'})}>{'greedy'}</button>
      <button onClick={this._next.bind(this, {strategy:'uniform'})}>{'uniform'}</button>
      <button onClick={this._next.bind(this, {strategy:'astar'})}>{'astar'}</button>
      <button onClick={this._reset.bind(this)}>{'reset'}</button>
      <br/>
      <button onClick={this._computeAll.bind(this)}>{'computall'}</button>
    </div>
  );
};

const renderCells = function(params){
  const { rows,columns,gridState, onClick } = params;
  return GridUtil.getGridKeys({rows,columns}).map((key)=>{
    const { x, y } = GridUtil.keyToCoor({key});
    return (
      <GridCell
        key={key}
        onClick={onClick}
        x={x}
        y={y}
        {...gridState[key]}
      />
    );
  });
};

const renderTable = function(params){
  const {
    state: { resultTable },
    actions: { paintCells, updateCells, clearPath }
  } = this.props;

  const tableRows = resultTable.map((row, i)=>{
    const {
      strategy, expansions, cost, path
    } = row;
    return (
      <tr key={i}>
        <td>{strategy}</td>
        <td>{expansions}</td>
        <td>{cost}</td>
        <td> <button onClick={()=>{
          const { gridState } = this.props.state;
          clearPath({gridState});
          updateCells({coordinates: path});
          paintCells({coordinates: path});
        }}>{'show'}</button> </td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>{'Algorithm'}</th>
          <th>{'Expansions'}</th>
          <th>{'Cost'}</th>
          <th>{'Path'}</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  );
};

const renderGridChoosers = function(){
  const {
    actions : {
      setGridState,
    }
  } = this.props;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row'
    }}>

      <Chooser
        onClick={()=>{
          setGridState({gridName:'grid_1',rows:5,columns:5})
          let self = this;
          setTimeout(function(){
            self._computeAll.call(self);
          },0)
          
        }}
        text={'grid_1'}
      />

      <Chooser
        onClick={()=>{
          setGridState({gridName:'grid_2',rows:8,columns:8})
          let self = this;
          setTimeout(function(){
            self._computeAll.call(self);
          },0)
        }}
        text={'grid_2'}
      />
    </div>
  );

};

export {
  renderButtons,
  renderCells,
  renderTable,
  renderGridChoosers,
};
