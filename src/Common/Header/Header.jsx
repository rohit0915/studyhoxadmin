import React, { useState } from "react";

//material ui appbar
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

//css file
import "./Header.css";

//import image

import { height, width } from "@mui/system";

//import image

const Header = (props) => {
  /*local state */
  const [Sidebar, setSidebar] = useState(false);

  /*function to open a sidebar */
  const setLoadingnewside = () => {
    document.getElementById("mySidenav").style.width = "250px";
    setSidebar(true);
  };

  /*function to close a sidebar */
  const Closesidebar = () => {
    document.getElementById("mySidenav").style.width = "0px";
    setSidebar(false);
  };
  return (
    <div className="topheader">
      <AppBar position="fixed" className="MainHeader">
        <Toolbar className="header_padding">
          <div className="header_link_color">
            {/* <span className="logo_img">Logo</span> */}
            StudyHox
          </div>
          <div className="header_grow" />
          <div className="header_links">
            <span className="header_link_color">Home</span>
            <span className="logout_Pointer_cursor">Logout</span>

            {/* <span
              className="header_link_color"
              onClick={() => props.history.push("#")}
            >
              Create Crew
            </span>

            <span
              className="header_link_color"
              onClick={() => props.history.push("#")}
            >
              Login
            </span> */}
          </div>
          <div className="mobile_Burger_Menu">
            <span
              className="logout_Pointer_cursor mr-3 text-right mt-2"
              onClick={!Sidebar ? setLoadingnewside : Closesidebar}
            >
              <i class="fa fa-bars"></i>
            </span>

            <div id="mySidenav" className="sidenav">
              <div className="cross_icon_style">
                <i
                  class="fa fa-times cursor"
                  onClick={() => {
                    document.getElementById("mySidenav").style.width = "0px";
                    setSidebar(false);
                  }}
                ></i>
              </div>
              <span className="logout_Pointer_cursor">Dashboard</span>

              <span className="logout_Pointer_cursor">Orders</span>
              <span className="logout_Pointer_cursor">Products</span>
              <span className="logout_Pointer_cursor">Customers</span>
              <span className="logout_Pointer_cursor">Add Car Brands</span>
              <span className="logout_Pointer_cursor">Add Category</span>
              <span className="logout_Pointer_cursor">Add Blog</span>
              <span className="logout_Pointer_cursor">Add Exhaust</span>
              {/* <span
                className="logout_Pointer_cursor"
                onClick={() => props.history.push("#")}
              >
                Contact
              </span>
              <span
                className="logout_Pointer_cursor"
                onClick={() => props.history.push("#")}
              >
                Company
              </span>
              <span
                className="logout_Pointer_cursor"
                onClick={() => props.history.push("#")}
              >
                Trip
              </span>

              <span
                className="logout_Pointer_cursor"
                onClick={() => props.history.push("#")}
              >
                Login
              </span> */}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
