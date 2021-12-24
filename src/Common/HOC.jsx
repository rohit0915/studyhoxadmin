import React, { Fragment, Component } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";

import Header from "./Header/Header";
const HOC = (Wcomponent) => {
  return class extends Component {
    render() {
      return (
        <Fragment>
          <div className="app-container-hoc main-margin">
            <Header {...this.props} />
            <div className="d-flex">
              <Sidebar {...this.props} />

              <Wcomponent {...this.props} />
            </div>
            {/* <Footer {...this.props} /> */}
          </div>
        </Fragment>
      );
    }
  };
};

export default HOC;
