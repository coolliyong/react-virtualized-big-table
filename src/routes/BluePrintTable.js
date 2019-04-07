import React, { Component } from "react";
import { connect } from "dva";
import { Cell, Column, Table } from "@blueprintjs/table";
import List from "react-virtualized/dist/commonjs/List";
import '@blueprintjs/table/lib/css/table.css';

class BluePrintTable extends Component {

  cellRenderer = (rowIndex,colIndex) => {
    const list = this.props.list;
    const columnData = this.props.columnData;
    const dataKey = columnData[colIndex].dataKey;
    const text = list[rowIndex][dataKey];
    return <Cell>{text}</Cell>;
  }

  rowRenderer(...args){
    console.log(args);
            // <Column name="Dollars2" cellRenderer={this.cellRenderer} />,
        // <Column name="Dollars2" cellRenderer={this.cellRenderer} />
    return (
        <Column name="Dollars" cellRenderer={this.cellRenderer} />
    )
  }
  test(){
    const height = 700;
    const rowHeight = 40;
    const width = 800;
      return (
        //  <List
        //   rowCount={this.props.list.length}
        //   width={width}
        //   height={height}
        //   rowHeight={rowHeight}
        //   rowRenderer={this.rowRenderer}
        //   overscanRowCount={3}
        // />
        <Column name="Dollars" cellRenderer={this.cellRenderer} />
      )
  }

  render() {
    const list = this.props.list;
    const test = this.test();
    return (
      <div>
        <Table numRows={list.length}>
        <Column name="name" cellRenderer={this.cellRenderer} />
        <Column name="age" cellRenderer={this.cellRenderer} />
        <Column name="sex" cellRenderer={this.cellRenderer} />
        <Column name="height" cellRenderer={this.cellRenderer} />
        <Column name="game" cellRenderer={this.cellRenderer} />
        
          
        </Table>
      </div>
    );
  }
}

const mapStateToProps = ({ example }) => {
  return {
    list: example.list
  };
};

export default connect(mapStateToProps)(BluePrintTable);
