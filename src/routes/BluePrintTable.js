import React, { Component } from "react";
import { connect } from "dva";
import { Cell, Column, Table } from "@blueprintjs/table";
import List from "react-virtualized/dist/commonjs/List";
import '@blueprintjs/table/lib/css/table.css';

class BluePrintTable extends Component {
  cellRenderer = (rowIndex,colIndex) => {
    return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>;
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
    const test = this.test();
    return (
      <div>
        <Table numRows={20}>
        {test}
        {/* <Column name="Dollars" cellRenderer={this.cellRenderer} />
        <Column name="Dollars" cellRenderer={this.cellRenderer} /> */}
        
          
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
