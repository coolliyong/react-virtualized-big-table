import React, { Component } from "react";
import { connect } from "dva";
import "./IndexPage.css";
import ReactList from "./ReactList";
import BluePrintTable from "./BluePrintTable";

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.actionClick = this.actionClick.bind(this);
  }
  componentDidMount() {
    this.props.dispatch({
      type: "example/getInitList"
    });
  }

  scrollButtonFn = num => {
    console.log(num);
    this.props.dispatch({ type: "example/getInitList" });
  };

  action1 = e => {
    console.log("action1", e);
  };
  actionClick = (index, rowItem) => {
    console.log(index, rowItem);
  };
  render() {
    const columnData = [
      // {
      //   title: "选择", //表头名
      //   dataKey: "name", // 字段
      //   width:40,
      //   render: ({ index, rowItem }) => {
      //     return (
      //       <label htmlFor="">
      //         <input type="checkbox" />
      //       </label>
      //     );
      //   }
      // },
      {
        title: "title", //表头名
        dataKey: "name", // 字段
        width: 100
      },
      {
        width: 100,
        title: "age", //表头名
        dataKey: "age" // 字段
      },
      {
        title: "sex", //表头名
        dataKey: "sex" // 字段
      },
      {
        title: "height", //表头名
        dataKey: "height" // 字段
      },
      {
        title: "game", //表头名
        dataKey: "game" // 字段
      },
      {
        title: "操作", //表头名
        dataKey: "name", // 字段
        render: ({ index, rowItem }) => {
          return (
            <button onClick={e => this.actionClick(index, rowItem)}>
              index:{index}
            </button>
          );
        }
      }
    ];

    return (
      <div>
        <br />
        <button onClick={e=>this.scrollButtonFn(e)}>点击加载</button>
        <br />
        <br />
        <br />
        <div style={{ width: "1000px" }}>
          <ReactList
            columnData={columnData}
            scrollButtonFn={num => this.scrollButtonFn(num)}
            data={this.props.list}
          />
        </div>
        <br />
        <br />
        <br />
        <div>
          {/* <BluePrintTable columnData={columnData} /> */}
        </div>
        {/* <Scroll></Scroll> */}
      </div>
    );
  }
}

const mapStateToProps = ({ example }) => {
  return {
    list: example.list
  };
};
export default connect(mapStateToProps)(IndexPage);
