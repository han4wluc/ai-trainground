
import React, { Component } from 'react';
import { GridCell } from './comps';
import { Comps, Utils } from '../../';
const {
  CommonGrid,
  Chooser,
} = Comps;
const {
  GridUtil
} = Utils;

const renderButtons = function(){

  const {
    state: { gridState },
    actions: { setResultTable, stepNext, clearPath }
  } = this.props;

  let self = this;
  const buttons = ['BFS', 'DFS', 'greedy', 'uniform', 'astar'].map((strategy)=>{
    return (
      <button
        key={strategy}
        onClick={()=>{
          stepNext({searchTree:self._searchTree,strategy});
        }}
      >
        {strategy}
      </button>
    );
  });

  return (
    <div>
      {buttons}
      <button onClick={clearPath.bind(null,{
        gridState:this.props.state.gridState,
        searchTree: this._searchTree,
      })}>{'reset'}</button>
      <br/>
      <button
        onClick={setResultTable.bind(null,{gridState})}
      >
        {'computall'}
      </button>
    </div>
  );
};

const _renderCells = function(params){
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
          clearPath({gridState,searchTree:this._searchTree});
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
      changeGrid,
    }
  } = this.props;

  const gridChoosers = ['GRID_1', 'GRID_2'].map((gridName)=>{
    return (
      <Chooser
        key={gridName}
        onClick={()=>{
          changeGrid({gridName:gridName,searchTree:this._searchTree});
        }}
        text={gridName}
      />
    );
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row'
    }}>
      {gridChoosers}
    </div>
  );

};

const renderGrid = function(params){
  const {
    gridState,
    columns,
    rows,
  } = this.props.state;

  const {
    incrementCellCost
  } = this.props.actions;

  const cells = _renderCells(
    {gridState,columns,rows,onClick:(params)=>{
      incrementCellCost({
        ...params,
        searchTree: this._searchTree,
        gridState: this.props.state.gridState,
      });
    }}
  );

  return (
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
  );
};

export {
  renderButtons,
  renderGrid,
  renderTable,
  renderGridChoosers,
};
