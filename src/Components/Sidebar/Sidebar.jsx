import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useNavigate } from "react-router-dom";
const Sidebar = (props) => {
  let navigate = useNavigate();

  return (
    <div>
      <div className="proslider_mobile prosideclass mt-4 sidebar_height">
        <ProSidebar>
          <Menu iconShape="square">
            <MenuItem>Dashboard</MenuItem>
            <MenuItem onClick={() => navigate("/home")}>Dashboard</MenuItem>
            <MenuItem onClick={() => navigate("/student")}>
              Manage Student
            </MenuItem>
            <MenuItem onClick={() => navigate("/addCourse")}>
              Add Course
            </MenuItem>
            <MenuItem onClick={() => navigate("/assignment")}>
              Add Assignment
            </MenuItem>
            <MenuItem>Study Material</MenuItem>
            <MenuItem>Vedios</MenuItem>
            <MenuItem>Manage Student</MenuItem>
            <MenuItem>Payment</MenuItem>

            {/* <SubMenu title="Components-4">
              <MenuItem>Component 1</MenuItem>
            </SubMenu>
            <SubMenu title="Components-5">
              <MenuItem>Component 1</MenuItem>
            </SubMenu>
            <SubMenu title="Components-6">
              <MenuItem>Component 1</MenuItem>
            </SubMenu>
            <SubMenu title="Components-7">
              <MenuItem>Component 1</MenuItem>
            </SubMenu>
            <SubMenu title="Components-8">
              <MenuItem>Component 1</MenuItem>
            </SubMenu> */}
          </Menu>
        </ProSidebar>
      </div>
    </div>
  );
};

export default Sidebar;
