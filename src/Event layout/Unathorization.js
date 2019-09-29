import React, { Component } from 'react'

export default class Unathorization extends Component {
    componentDidMount() {
        document.title = " <eIM> | NotFound  ";
      }
    
    render() {
        return (
            <React.Fragment>


  <header className="main-header">
    {/* Logo */}
    <a href="../../index2.html" className="logo">
      {/* mini logo for sidebar mini 50x50 pixels */}
      <span className="logo-mini"><b>e</b>IM</span>
      {/* logo for regular state and mobile devices */}
      <span className="logo-lg"><b>eIncidence</b>Map</span>
    </a>
    {/* Header Navbar: style can be found in header.less */}
    <nav className="navbar navbar-static-top">
      {/* Sidebar toggle button*/}
      <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </a>
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
              <li>
                {/* inner menu: contains the actual data */}
                <ul className="menu">
                  <li>{/* start message */}
                    <a href="#">
                      <div className="pull-left">
                        <img src="../../dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                      </div>
                      <h4>
                        Support Team
                        <small><i className="fa fa-clock-o" /> 5 mins</small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                  </li>
                  {/* end message */}
                  <li>
                    <a href="#">
                      <div className="pull-left">
                        <img src="../../dist/img/user3-128x128.jpg" className="img-circle" alt="User Image" />
                      </div>
                      <h4>
                        AdminLTE Design Team
                        <small><i className="fa fa-clock-o" /> 2 hours</small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="pull-left">
                        <img src="../../dist/img/user4-128x128.jpg" className="img-circle" alt="User Image" />
                      </div>
                      <h4>
                        Developers
                        <small><i className="fa fa-clock-o" /> Today</small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="pull-left">
                        <img src="../../dist/img/user3-128x128.jpg" className="img-circle" alt="User Image" />
                      </div>
                      <h4>
                        Sales Department
                        <small><i className="fa fa-clock-o" /> Yesterday</small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="pull-left">
                        <img src="../../dist/img/user4-128x128.jpg" className="img-circle" alt="User Image" />
                      </div>
                      <h4>
                        Reviewers
                        <small><i className="fa fa-clock-o" /> 2 days</small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="footer"><a href="#">See All Messages</a></li>
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
              <li>
                {/* inner menu: contains the actual data */}
                <ul className="menu">
                  <li>
                    <a href="#">
                      <i className="fa fa-users text-aqua" /> 5 new members joined today
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-warning text-yellow" /> Very long description here that may not fit into the
                      page and may cause design problems
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-users text-red" /> 5 new members joined
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-shopping-cart text-green" /> 25 sales made
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-user text-red" /> You changed your username
                    </a>
                  </li>
                </ul>
              </li>
              <li className="footer"><a href="#">View all</a></li>
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
              <li>
                {/* inner menu: contains the actual data */}
                <ul className="menu">
                  <li>{/* Task item */}
                    <a href="#">
                      <h3>
                        Design some buttons
                        <small className="pull-right">20%</small>
                      </h3>
                      <div className="progress xs">
                        <div className="progress-bar progress-bar-aqua" style={{width: '20%'}} role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
                          <span className="sr-only">20% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  {/* end task item */}
                  <li>{/* Task item */}
                    <a href="#">
                      <h3>
                        Create a nice theme
                        <small className="pull-right">40%</small>
                      </h3>
                      <div className="progress xs">
                        <div className="progress-bar progress-bar-green" style={{width: '40%'}} role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
                          <span className="sr-only">40% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  {/* end task item */}
                  <li>{/* Task item */}
                    <a href="#">
                      <h3>
                        Some task I need to do
                        <small className="pull-right">60%</small>
                      </h3>
                      <div className="progress xs">
                        <div className="progress-bar progress-bar-red" style={{width: '60%'}} role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
                          <span className="sr-only">60% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  {/* end task item */}
                  <li>{/* Task item */}
                    <a href="#">
                      <h3>
                        Make beautiful transitions
                        <small className="pull-right">80%</small>
                      </h3>
                      <div className="progress xs">
                        <div className="progress-bar progress-bar-yellow" style={{width: '80%'}} role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
                          <span className="sr-only">80% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  {/* end task item */}
                </ul>
              </li>
              <li className="footer">
                <a href="#">View all tasks</a>
              </li>
            </ul>
          </li>
          {/* User Account: style can be found in dropdown.less */}
          <li className="dropdown user user-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <img src="../../dist/img/user2-160x160.jpg" className="user-image" alt="User Image" />
              <span className="hidden-xs">Alexander Pierce</span>
            </a>
            <ul className="dropdown-menu">
              {/* User image */}
              <li className="user-header">
                <img src="../../dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                <p>
                  Alexander Pierce - Web Developer
                  <small>Member since Nov. 2012</small>
                </p>
              </li>
              {/* Menu Body */}
              <li className="user-body">
                <div className="row">
                  <div className="col-xs-4 text-center">
                    <a href="#">Followers</a>
                  </div>
                  <div className="col-xs-4 text-center">
                    <a href="#">Sales</a>
                  </div>
                  <div className="col-xs-4 text-center">
                    <a href="#">Friends</a>
                  </div>
                </div>
                {/* /.row */}
              </li>
              {/* Menu Footer*/}
              <li className="user-footer">
                <div className="pull-left">
                  <a href="#" className="btn btn-default btn-flat">Profile</a>
                </div>
                <div className="pull-right">
                  <a href="#" className="btn btn-default btn-flat">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
          {/* Control Sidebar Toggle Button */}
          <li>
            <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears" /></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  {/* Left side column. contains the logo and sidebar */}
  <aside className="main-sidebar">
    {/* sidebar: style can be found in sidebar.less */}
    <section className="sidebar">
      {/* Sidebar user panel */}
      <div className="user-panel">
        <div className="pull-left image">
          <img src="../../dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
        </div>
        <div className="pull-left info">
          <p>Alexander Pierce</p>
          <a href="#"><i className="fa fa-circle text-success" /> Online</a>
        </div>
      </div>
      {/* search form */}
      <form action="#" method="get" className="sidebar-form">
        <div className="input-group">
          <input type="text" name="q" className="form-control" placeholder="Search..." />
          <span className="input-group-btn">
            <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search" />
            </button>
          </span>
        </div>
      </form>
      {/* /.search form */}
      {/* sidebar menu: : style can be found in sidebar.less */}
      <ul className="sidebar-menu" data-widget="tree">
        <li className="header">MAIN NAVIGATION</li>
        <li className="treeview">
          <a href="#">
            <i className="fa fa-dashboard" /> <span>Dashboard</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span>
          </a>
          <ul className="treeview-menu">
            <li><a href="../../index.html"><i className="fa fa-circle-o" /> Dashboard v1</a></li>
            <li><a href="../../index2.html"><i className="fa fa-circle-o" /> Dashboard v2</a></li>
          </ul>
        </li>
        <li className="treeview">
          <a href="#">
            <i className="fa fa-files-o" />
            <span>Layout Options</span>
            <span className="pull-right-container">
              <span className="label label-primary pull-right">4</span>
            </span>
          </a>
          <ul className="treeview-menu">
            <li><a href="../layout/top-nav.html"><i className="fa fa-circle-o" /> Top Navigation</a></li>
            <li><a href="../layout/boxed.html"><i className="fa fa-circle-o" /> Boxed</a></li>
            <li><a href="../layout/fixed.html"><i className="fa fa-circle-o" /> Fixed</a></li>
          </ul>
        </li>
       
        <li className="treeview">
          <a href="#">
            <i className="fa fa-laptop" />
            <span>UI Elements</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span>
          </a>
          <ul className="treeview-menu">
            <li><a href="../UI/general.html"><i className="fa fa-circle-o" /> General</a></li>
            <li><a href="../UI/icons.html"><i className="fa fa-circle-o" /> Icons</a></li>
            <li><a href="../UI/buttons.html"><i className="fa fa-circle-o" /> Buttons</a></li>
            <li><a href="../UI/sliders.html"><i className="fa fa-circle-o" /> Sliders</a></li>
            <li><a href="../UI/timeline.html"><i className="fa fa-circle-o" /> Timeline</a></li>
            <li><a href="../UI/modals.html"><i className="fa fa-circle-o" /> Modals</a></li>
          </ul>
        </li>
        <li className="treeview">
          <a href="#">
            <i className="fa fa-edit" /> <span>Forms</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span>
          </a>
          <ul className="treeview-menu">
            <li><a href="../forms/general.html"><i className="fa fa-circle-o" /> General Elements</a></li>
            <li><a href="../forms/advanced.html"><i className="fa fa-circle-o" /> Advanced Elements</a></li>
            <li><a href="../forms/editors.html"><i className="fa fa-circle-o" /> Editors</a></li>
          </ul>
        </li>
        <li className="treeview">
          <a href="#">
            <i className="fa fa-table" /> <span>Tables</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span>
          </a>
          <ul className="treeview-menu">
            <li><a href="../tables/simple.html"><i className="fa fa-circle-o" /> Simple tables</a></li>
            <li><a href="../tables/data.html"><i className="fa fa-circle-o" /> Data tables</a></li>
          </ul>
        </li>
        <li>
          <a href="../calendar.html">
            <i className="fa fa-calendar" /> <span>Calendar</span>
            <span className="pull-right-container">
              <small className="label pull-right bg-red">3</small>
              <small className="label pull-right bg-blue">17</small>
            </span>
          </a>
        </li>
        <li>
          <a href="../mailbox/mailbox.html">
            <i className="fa fa-envelope" /> <span>Mailbox</span>
            <span className="pull-right-container">
              <small className="label pull-right bg-yellow">12</small>
              <small className="label pull-right bg-green">16</small>
              <small className="label pull-right bg-red">5</small>
            </span>
          </a>
        </li>
       
        <li><a href="https://adminlte.io/docs"><i className="fa fa-book" /> <span>Documentation</span></a></li>
        <li className="header">LABELS</li>
        <li><a href="#"><i className="fa fa-circle-o text-red" /> <span>Important</span></a></li>
        <li><a href="#"><i className="fa fa-circle-o text-yellow" /> <span>Warning</span></a></li>
        <li><a href="#"><i className="fa fa-circle-o text-aqua" /> <span>Information</span></a></li>
      </ul>
    </section>
    {/* /.sidebar */}
  </aside>
  {/* Content Wrapper. Contains page content */}
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <section className="content-header">
      <h1>
        404 Error Page
      </h1>
      <ol className="breadcrumb">
        <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
        <li><a href="#">Examples</a></li>
        <li className="active">404 error</li>
      </ol>
    </section>
    {/* Main content */}
    <section className="content">
      <div className="error-page">
        <h2 className="headline text-yellow"> 404</h2>
        <div className="error-content">
          <h3><i className="fa fa-warning text-yellow" /> Oops! Page not found.</h3>
          <p>
            We could not find the page you were looking for.
            Meanwhile, you may <a href="../../index.html">return to dashboard</a> or try using the search form.
          </p>
          <form className="search-form">
            <div className="input-group">
              <input type="text" name="search" className="form-control" placeholder="Search" />
              <div className="input-group-btn">
                <button type="submit" name="submit" className="btn btn-warning btn-flat"><i className="fa fa-search" />
                </button>
              </div>
            </div>
            {/* /.input-group */}
          </form>
        </div>
        {/* /.error-content */}
      </div>
      {/* /.error-page */}
    </section>
    {/* /.content */}
  </div>
  {/* /.content-wrapper */}
  <footer className="main-footer">
    <div className="pull-right hidden-xs">
      <b>Version</b> 2.4.0
    </div>
    <strong>Copyright © 2014-2016 <a href="https://adminlte.io">Almsaeed Studio</a>.</strong> All rights
    reserved.
  </footer>
  {/* Control Sidebar */}
  <aside className="control-sidebar control-sidebar-dark">
    {/* Create the tabs */}
    <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
      <li><a href="#control-sidebar-home-tab" data-toggle="tab"><i className="fa fa-home" /></a></li>
      <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i className="fa fa-gears" /></a></li>
    </ul>
    {/* Tab panes */}
    <div className="tab-content">
      {/* Home tab content */}
      <div className="tab-pane" id="control-sidebar-home-tab">
        <h3 className="control-sidebar-heading">Recent Activity</h3>
        <ul className="control-sidebar-menu">
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon fa fa-birthday-cake bg-red" />
              <div className="menu-info">
                <h4 className="control-sidebar-subheading">Langdon's Birthday</h4>
                <p>Will be 23 on April 24th</p>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon fa fa-user bg-yellow" />
              <div className="menu-info">
                <h4 className="control-sidebar-subheading">Frodo Updated His Profile</h4>
                <p>New phone +1(800)555-1234</p>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon fa fa-envelope-o bg-light-blue" />
              <div className="menu-info">
                <h4 className="control-sidebar-subheading">Nora Joined Mailing List</h4>
                <p>nora@example.com</p>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon fa fa-file-code-o bg-green" />
              <div className="menu-info">
                <h4 className="control-sidebar-subheading">Cron Job 254 Executed</h4>
                <p>Execution time 5 seconds</p>
              </div>
            </a>
          </li>
        </ul>
        {/* /.control-sidebar-menu */}
        <h3 className="control-sidebar-heading">Tasks Progress</h3>
        <ul className="control-sidebar-menu">
          <li>
            <a href="javascript:void(0)">
              <h4 className="control-sidebar-subheading">
                Custom Template Design
                <span className="label label-danger pull-right">70%</span>
              </h4>
              <div className="progress progress-xxs">
                <div className="progress-bar progress-bar-danger" style={{width: '70%'}} />
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <h4 className="control-sidebar-subheading">
                Update Resume
                <span className="label label-success pull-right">95%</span>
              </h4>
              <div className="progress progress-xxs">
                <div className="progress-bar progress-bar-success" style={{width: '95%'}} />
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <h4 className="control-sidebar-subheading">
                Laravel Integration
                <span className="label label-warning pull-right">50%</span>
              </h4>
              <div className="progress progress-xxs">
                <div className="progress-bar progress-bar-warning" style={{width: '50%'}} />
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <h4 className="control-sidebar-subheading">
                Back End Framework
                <span className="label label-primary pull-right">68%</span>
              </h4>
              <div className="progress progress-xxs">
                <div className="progress-bar progress-bar-primary" style={{width: '68%'}} />
              </div>
            </a>
          </li>
        </ul>
        {/* /.control-sidebar-menu */}
      </div>
      {/* /.tab-pane */}
      {/* Stats tab content */}
      <div className="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
      {/* /.tab-pane */}
      {/* Settings tab content */}
      <div className="tab-pane" id="control-sidebar-settings-tab">
        <form method="post">
          <h3 className="control-sidebar-heading">General Settings</h3>
          <div className="form-group">
            <label className="control-sidebar-subheading">
              Report panel usage
              <input type="checkbox" className="pull-right" defaultChecked />
            </label>
            <p>
              Some information about this general settings option
            </p>
          </div>
          {/* /.form-group */}
          <div className="form-group">
            <label className="control-sidebar-subheading">
              Allow mail redirect
              <input type="checkbox" className="pull-right" defaultChecked />
            </label>
            <p>
              Other sets of options are available
            </p>
          </div>
          {/* /.form-group */}
          <div className="form-group">
            <label className="control-sidebar-subheading">
              Expose author name in posts
              <input type="checkbox" className="pull-right" defaultChecked />
            </label>
            <p>
              Allow the user to show his name in blog posts
            </p>
          </div>
          {/* /.form-group */}
          <h3 className="control-sidebar-heading">Chat Settings</h3>
          <div className="form-group">
            <label className="control-sidebar-subheading">
              Show me as online
              <input type="checkbox" className="pull-right" defaultChecked />
            </label>
          </div>
          {/* /.form-group */}
          <div className="form-group">
            <label className="control-sidebar-subheading">
              Turn off notifications
              <input type="checkbox" className="pull-right" />
            </label>
          </div>
          {/* /.form-group */}
          <div className="form-group">
            <label className="control-sidebar-subheading">
              Delete chat history
              <a href="javascript:void(0)" className="text-red pull-right"><i className="fa fa-trash-o" /></a>
            </label>
          </div>
          {/* /.form-group */}
        </form>
      </div>
      {/* /.tab-pane */}
    </div>
  </aside>
  {/* /.control-sidebar */}
  {/* Add the sidebar's background. This div must be placed
     immediately after the control sidebar */}
  <div className="control-sidebar-bg" />






            </React.Fragment>

        )
    }
}
