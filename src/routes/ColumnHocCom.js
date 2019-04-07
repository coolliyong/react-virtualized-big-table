import { Component } from "react";
const ColumnHocCom = PropComponent => {
  return class extends Component {
    render() {
      return (
          <div>
              <PropComponent {...this.props} />
          </div>
      );
    }
  };
};

export default ColumnHocCom;
