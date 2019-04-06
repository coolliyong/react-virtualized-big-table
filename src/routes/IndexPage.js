import React, { Component } from "react";
import { connect } from "dva";
import "./IndexPage.css";
import ReactList from "./ReactList";

class IndexPage extends Component {


  componentDidMount() {
    this.props.dispatch({
      type: "example/getInitList"
    });
  }

  scrollButtonFn = num => {
    console.log(num);
    this.props.dispatch({ type: "example/getInitList" });
  }

  render() {
    const titles = ["title", "age", "sex", "height", "game"];
    let values = {
      [titles[0]]: "name",
      [titles[1]]: "age",
      [titles[2]]: "sex",
      [titles[3]]: "height",
      [titles[4]]: "game"
    };
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        {/* <BluePrintTable /> */}
        <ReactList
          scrollButtonFn={num => this.scrollButtonFn(num)}
          data={this.props.list}
          titles={titles}
          values={values}
        />
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
