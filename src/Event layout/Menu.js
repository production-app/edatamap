import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Menu = ({ session }) => {
  return (
    <React.Fragment>
      <aside className="main-sidebar">
        {/* sidebar: style can be found in sidebar.less */}
        <section className="sidebar">
          {/* Sidebar user panel */}
          <div className="user-panel">
            <div className="pull-left image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle"
                alt="User "
              />
            </div>
            <div className="pull-left info">
              <p>{session.GetUserProfile.username} </p>
              <a href="">
                <i className="fa fa-circle text-success" /> Online
              </a>
            </div>
          </div>
          {/* search form 
    <form action="#" method="get" className="sidebar-form">
      <div className="input-group">
        <input type="text" name="q" className="form-control" placeholder="Search..." />
        <span className="input-group-btn">
          <button type="submit" name="search" id="search-btn" className="btn btn-flat">
            <i className="fa fa-search" />
          </button>
        </span>
      </div>
    </form> */}
          {/* /.search form */}
          {/* sidebar menu: : style can be found in sidebar.less  
          .skin-blue .sidebar-menu>li.active>a {
    border-left-color: #aa0a35;
    .activeRoute {
       border-left-color: #aa0a35;
    }
}
          */}
          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">Navigation</li>
            <li className="">
              <NavLink
                to="/"
                activeStyle={{
                  borderLeftColor: "#aa0a35",
                  background: "#1e282c"
                }}
                exact
              >
                <i className="fa fa-dashboard" /> <span>Dashboard</span>
              </NavLink>
              <ul className="treeview-menu" />
            </li>
            <li className="">
              <NavLink
                to="/map"
                activeStyle={{
                  borderLeftColor: "#aa0a35",
                  background: "#1e282c"
                }}
              >
                <i className="glyphicon glyphicon-map-marker" />{" "}
                <span>ePlotter</span>
              </NavLink>
            </li>

            <li className="treeview">
              <NavLink
                to="/eChart"
                activeStyle={{
                  borderLeftColor: "#aa0a35",
                  background: "#1e282c"
                }}
              >
                <i className="glyphicon glyphicon-map-marker" />{" "}
                <span>eChart</span>
              </NavLink>
            </li>

            <li>
              <a href="">
                <i className="fa fa-book" /> <span>Documentation</span>
              </a>
            </li>
            <li className="header">LABELS</li>
            <li>
              <a href="">
                <i className="fa fa-circle-o text-red" /> <span>Important</span>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fa fa-circle-o text-yellow" />{" "}
                <span>Warning</span>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fa fa-circle-o text-aqua" />{" "}
                <span>Information</span>
              </a>
            </li>
          </ul>
        </section>
        {/* /.sidebar */}
      </aside>
    </React.Fragment>
  );
};

export default Menu;
