import React from "react";
import Sigin from "../Login/Sigin";
import Signout from "./Signout";

const Header = ({ session }) => {
  return (
    <React.Fragment>
      <header className="main-header">
        {/* Logo */}

        <a href="/" className="logo">
          {/* mini logo for sidebar mini 50x50 pixels */}
          <span className="logo-mini">
            <b>e</b>DM
          </span>
          {/* logo for regular state and mobile devices */}

          <span className="logo-lg">
            <img
              src="dist/img/edatamap_logo.png"
              className="img-circle"
              width="30px"
              height="30px"
              alt="User "
              style={{ width: "34px" }}
            />{" "}
            &nbsp;
            <b>eData</b>Map
          </span>
        </a>
        {/* Header Navbar: style can be found in header.less */}
        <nav className="navbar navbar-static-top">
          {/* Sidebar toggle button*/}
          <a
            href="#"
            className="sidebar-toggle"
            data-toggle="push-menu"
            role="button"
          >
            <span className="sr-only">Toggle navigation</span>
          </a>
          {/* Navbar Right Menu */}
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              {/* Messages: style can be found in dropdown.less*/}
              <li className="dropdown messages-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-envelope-o" />
                  <span className="label label-success">4</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="header">You have 4 messages</li>
                  <li>{/* inner menu: contains the actual data */}</li>
                  <li className="footer"></li>
                </ul>
              </li>
              {/* Notifications: style can be found in dropdown.less */}
              <li className="dropdown notifications-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-bell-o" />
                  <span className="label label-warning">10</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="header">You have 10 notifications</li>
                  <li>{/* inner menu: contains the actual data */}</li>
                  <li className="footer"></li>
                </ul>
              </li>
              {/* Tasks: style can be found in dropdown.less */}
              <li className="dropdown tasks-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-flag-o" />
                  <span className="label label-danger">9</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="header">You have 9 tasks</li>
                  <li>{/* inner menu: contains the actual data */}</li>
                  <li className="footer"></li>
                </ul>
              </li>
              {/* User Account: style can be found in dropdown.less */}
              <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img
                    src="dist/img/user2-160x160.jpg"
                    className="user-image"
                    alt="User "
                  />
                  <span className="hidden-xs">
                    {" "}
                    <em>Welcome, </em> {"     "}
                    <strong>{session.GetUserProfile.username}</strong>{" "}
                  </span>
                </a>
                <ul className="dropdown-menu">
                  {/* User image */}
                  <li className="user-header">
                    <img
                      src="dist/img/user2-160x160.jpg"
                      className="img-circle"
                      alt="User "
                    />
                    <p>
                      {session.GetUserProfile.email}
                      {localStorage.setItem(
                        "bio",
                        session.GetUserProfile.email
                      )}

                      <small>Member in 2019</small>
                    </p>
                  </li>
                  {/* Menu Body */}
                  <li className="user-body">
                    <div className="row" />
                    {/* /.row */}
                  </li>
                  {/* Menu Footer*/}
                  <li className="user-footer">
                    <div className="pull-left">
                      <a href="URL" className="btn btn-default btn-flat">
                        Profile
                      </a>
                    </div>
                    <div className="pull-right">
                      <Signout />
                    </div>
                  </li>
                </ul>
              </li>
              {/* Control Sidebar Toggle Button */}
              <li>
                <a href="URL" data-toggle="control-sidebar">
                  <i className="fa fa-gears" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Header;
