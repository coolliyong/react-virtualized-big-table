import React, { Component } from "react";
import clsx from "clsx";
import { Column, Table } from "react-virtualized";
import Grid from "react-virtualized/dist/commonjs/Grid";
import List from "react-virtualized/dist/commonjs/List";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import ScrollSync from "react-virtualized/dist/commonjs/ScrollSync";
import scrollbarSize from "dom-helpers/util/scrollbarSize";
import _ from 'lodash';

// import styles from "react-virtualized/styles.css"; // only needs to be imported once
import styles from "./ScrollSync.example.css";
class ReactList extends Component {
  constructor(props){
    super(props);
    this.state = {
      scrollBottomNum:0,
    }
    this._renderBodyCell = this._renderBodyCell.bind(this);
    this._renderHeaderCell = this._renderHeaderCell.bind(this);
    this._renderLeftSideCell = this._renderLeftSideCell.bind(this);
    this._renderLeftHeaderCell = this._renderLeftHeaderCell.bind(this);
    this.onElScroll = this.onElScroll.bind(this);
    this.onElScroll = _.debounce(this.onElScroll,80);
  }
  _renderBodyCell({ columnIndex, key, rowIndex, style }) {
    if (columnIndex < 1) {
      return;
    }

    return this._renderLeftSideCell({ columnIndex, key, rowIndex, style });
  }

  _renderHeaderCell({ columnIndex, key, rowIndex, style }) {
    if (columnIndex < 1) {
      return;
    }

    return this._renderLeftHeaderCell({ columnIndex, key, rowIndex, style });
  }

  _renderLeftHeaderCell({ columnIndex, key, style }) {
    return (
      <div className={styles.headerCell} key={key} style={style}>
        {`${this.props.titles[columnIndex]}`}
      </div>
    );
  }

  _renderLeftSideCell({ columnIndex, key, rowIndex, style }) {
    const list = this.props.data;
    const rowClass =
      rowIndex % 2 === 0
        ? columnIndex % 2 === 0
          ? styles.evenRow
          : styles.oddRow
        : columnIndex % 2 !== 0
        ? styles.evenRow
        : styles.oddRow;
    const classNames = clsx(rowClass, styles.cell); 
    const title = _.get(this.props,['titles',columnIndex]); // titles 的 index 
    const _key = _.get(this.props,['values',title]); // titles 对应的  values
    const val = _.get(list,[rowIndex,_key]); // 读取当前是第N 行 的 对应字段
    return (
      <div
       className={classNames} key={key} style={style}>
        {`${val}`}
      </div>
    );
  }
  //节流 80 wait
  onElScroll = (scrollObj)=>{
    console.log('onElScroll',scrollObj);
    //如果总高度 <= 视口高度、则不算
    if(scrollObj.scrollHeight <= scrollObj.clientHeight){ 
      return void 0;
    }
    // 滚动高度 >=  总高度 - 视口高度 / 3 - 视口高度
    if(parseInt(scrollObj.scrollTop +scrollObj.clientHeight) >= parseInt(scrollObj.scrollHeight - scrollObj.clientHeight / 3)){
      console.log('还有视口的3/1触底');
      const scrollBottomNum = ++this.state.scrollBottomNum;
      this.setState({
        scrollBottomNum:scrollBottomNum,
      });
      this.props.scrollButtonFn(scrollBottomNum);
    }
  }


  render() {
    const list = this.props.data;
    let columnWidth = 150, //列宽度
    columnCount = this.props.titles.length, // 列 数量
    height = 400, // 高度
    overscanColumnCount = 0,
    overscanRowCount = 5,
    rowHeight = 40,
    rowCount = list.length, // 行数
    _columnCount = 3,
    _rowCount = 3;
    return (
      <div>
        <ScrollSync>
          {(args) => {
            const {clientHeight, clientWidth,onScroll,scrollHeight,scrollLeft,scrollTop,scrollWidth} = args;
            const leftBackgroundColor = {
              r:"30",
              g:"144",
              b:"255"
            };
            const leftColor = "#ffffff";
            const topBackgroundColor = {
              r:"46",
              g:"139",
              b:"87"
            };
            const topColor = "#ffffff";
            const middleBackgroundColor = {
              r:"255",
              g:"215",
              b:"0"
            };
            const middleColor = "#ffffff";

            return (
              <div className={styles.GridRow}>
                <div
                  className={styles.LeftSideGridContainer}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    color: leftColor,
                    backgroundColor: `rgb(${topBackgroundColor.r},${
                      topBackgroundColor.g
                    },${topBackgroundColor.b})`
                  }}
                >
                  <Grid
                    name="grid1"
                    cellRenderer={this._renderLeftHeaderCell}
                    className={styles.HeaderGrid}
                    width={columnWidth}
                    height={rowHeight}
                    rowHeight={rowHeight}
                    columnWidth={columnWidth}
                    rowCount={_rowCount}
                    columnCount={_columnCount}
                    // rowCount={1}
                    // columnCount={1}
                  />
                </div>
                <div
                  className={styles.LeftSideGridContainer}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: rowHeight,
                    color: leftColor,
                    backgroundColor: `rgb(${leftBackgroundColor.r},${
                      leftBackgroundColor.g
                    },${leftBackgroundColor.b})`
                  }}
                >
                  <Grid
                    name="grid2"
                    onScroll={this.onElScroll}
                    overscanColumnCount={overscanColumnCount}
                    overscanRowCount={overscanRowCount}
                    cellRenderer={this._renderLeftSideCell}
                    columnWidth={columnWidth}
                    // columnCount={1}
                    columnCount={_columnCount}
                    className={styles.LeftSideGrid}
                    height={height}
                    rowHeight={rowHeight}
                    rowCount={rowCount}
                    scrollTop={scrollTop}
                    width={columnWidth}
                  />
                </div>
                <div className={styles.GridColumn}>
                  <AutoSizer >
                    {({ width }) => (
                      <div>
                        <div style={{
                            backgroundColor: `rgb(${topBackgroundColor.r},${ topBackgroundColor.g },${topBackgroundColor.b})`,
                            color: topColor,
                            height: rowHeight,
                            width: width - scrollbarSize()
                          }}
                        >
                          <Grid
                            name="grid3"
                            className={styles.HeaderGrid}
                            columnWidth={columnWidth}
                            columnCount={columnCount}
                            height={rowHeight}
                            overscanColumnCount={overscanColumnCount}
                            cellRenderer={this._renderHeaderCell}
                            rowHeight={rowHeight}
                            // rowCount={1}
                            rowCount={_rowCount}
                            scrollLeft={scrollLeft}
                            width={width - scrollbarSize()}
                          />
                        </div>
                        <div
                          className="aaaaaaaa"
                          style={{
                            backgroundColor: `rgb(${middleBackgroundColor.r},${
                              middleBackgroundColor.g
                            },${middleBackgroundColor.b})`,
                            color: middleColor,
                            height,
                            width
                          }}
                        >
                          <Grid
                            name="grid4"
                            className={styles.BodyGrid}
                            columnWidth={columnWidth}
                            columnCount={columnCount}
                            height={height}
                            onScroll={onScroll}
                            // onScroll={this.onElScroll}
                            overscanColumnCount={overscanColumnCount}
                            overscanRowCount={overscanRowCount}
                            cellRenderer={this._renderBodyCell}
                            rowHeight={rowHeight}
                            rowCount={rowCount}
                            width={width}
                          />
                        </div>
                      </div>
                    )}
                  </AutoSizer>
                </div>
              </div>
            );
          }}
        </ScrollSync>
      </div>
    );
  }

  __render() {
    const listRender = this.listRender();
    const testRender = this.testRender();
    const tableRender = this.tableRender();
    return ;
  }

  rowRenderer = ({ index, isScrolling, key, style }) => {
    return (
      <div key={key} style={style}>
        <div>{this.props.data[index].name}</div>
        <div>{this.props.data[index].age}</div>
      </div>
    );
  };

  listRender = () => {
    const height = 700;
    const rowHeight = 40;
    const width = 800;
    return (
      <div>
        <button onClick={e => this.add()} className="button">
          点击加载
        </button>
        <h2>Details</h2>
        <List
          rowCount={this.props.data.length}
          width={width}
          height={height}
          rowHeight={rowHeight}
          rowRenderer={this.rowRenderer}
          overscanRowCount={3}
        />
      </div>
    );
  };

  tableRender = () => {
    return (<div>123</div>)
    return (
      <div>
        <h2>Details</h2>
        <Table
          width={500}
          height={300}
          headerHeight={20}
          rowHeight={40}
          rowCount={this.props.data.length}
          rowGetter={({ index }) => this.props.data[index]}
        >
          <Column label="name" dataKey="name" width={100} />

          <Column width={200} label="age" dataKey="age" />
        </Table>
      </div>
    );
  };
}
export default ReactList;
