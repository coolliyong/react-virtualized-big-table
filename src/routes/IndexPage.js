import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import ReactList from "./ReactList";
import Scroll from "./ScrollSync.example";
import BluePrintTable from "./BluePrintTable";

function IndexPage(props) {
  const titles = ["title", "age", "sex", "height", "game"];
  let values = {
    [titles[0]]: "name",
    [titles[1]]: "age",
    [titles[2]]: "sex",
    [titles[3]]: "height",
    [titles[4]]: "game"
  };
  return (
    <div className={styles.normal}>
      <br />
      <br />
      <br />
      {/* <BluePrintTable /> */}
      <br />
      <br />
      <br />
      <ReactList
        dispatch={props.dispatch}
        data={props.list}
        titles={titles}
        values={values}
      />
      <br />
      {/* <Scroll></Scroll> */}
      <br />
      <br />
      <br />
    </div>
  );
}

IndexPage.propTypes = {};

const mapStateToProps = ({ example }) => {
  return {
    list: example.list
  };
};
export default connect(mapStateToProps)(IndexPage);
