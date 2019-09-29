import React, { Component } from "react";
import { Button } from "reactstrap";
//import "bootstrap/dist/css/bootstrap.min.css";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { Alert } from "reactstrap";
//import withSession from "../Session/withSession";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import "./table.css";

class Content extends Component {
  constructor(props) {
    super(props);

    this.titleRef = React.createRef();
    this.locationRef = React.createRef();
    this.longeRef = React.createRef();
    this.latRef = React.createRef();
    this.eventRef = React.createRef();
  }

  render() {
    return (
    <React.Fragment>

<div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <h1>
              Dashboard
              <small>Version 2.0</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fa fa-dashboard" /> Home
                </a>
              </li>
              <li className="active">Dashboard</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            {/* Info boxes */}
            <div className="row">
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="info-box">
                  <span className="info-box-icon bg-aqua">
                    <i className="ion ion-ios-gear-outline" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">CPU Traffic</span>
                    <span className="info-box-number">
                      90<small>%</small>
                    </span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="info-box">
                  <span className="info-box-icon bg-red">
                    <i className="fa fa-google-plus" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Likes</span>
                    <span className="info-box-number">41,410</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              {/* fix for small devices only */}
              <div className="clearfix visible-sm-block" />
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="info-box">
                  <span className="info-box-icon bg-green">
                    <i className="ion ion-ios-cart-outline" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Sales</span>
                    <span className="info-box-number">760</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="info-box">
                  <span className="info-box-icon bg-yellow">
                    <i className="ion ion-ios-people-outline" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">New Members</span>
                    <span className="info-box-number">2,000</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
            <div className="row">
              <div className="col-md-12">
                <div className="box">
                  <div className="box-header with-border">
                    <h3 className="box-title">
                      <span className="glyphicon glyphicon-pencil" /> Log Events
                      Table {"      "}
                      <Button
                        type="button"
                        className="btn btn-default"
                        data-toggle="modal"
                        data-target="#modal-default"
                      >
                        Create Incidence logs
                      </Button>
                    </h3>
                    <div className="box-tools pull-right">
                      <button
                        type="button"
                        className="btn btn-box-tool"
                        data-widget="collapse"
                      >
                        <i className="fa fa-minus" />
                      </button>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-box-tool dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <i className="fa fa-wrench" />
                        </button>
                        <ul className="dropdown-menu" role="menu">
                          <li>
                            <a href="#">Action</a>
                          </li>
                          <li>
                            <a href="#">Another action</a>
                          </li>
                          <li>
                            <a href="#">Something else here</a>
                          </li>
                          <li className="divider" />
                          <li>
                            <a href="#">Separated link</a>
                          </li>
                        </ul>
                      </div>
                      <button
                        type="button"
                        className="btn btn-box-tool"
                        data-widget="remove"
                      >
                        <i className="fa fa-times" />
                      </button>
                    </div>
                  </div>
                  {/* /.box-header */}
                  <div className="box-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="table-responsive">
                         

                                <table className="table table-hover">
                                  <tbody>
                                    <tr>
                                      <th>ID</th>
                                      <th>Title</th>
                                      <th>Location</th>
                                      <th>Event-Cause</th>
                                      <th>Creator /Usename </th>
                                      <th>Action(s)</th>
                                    </tr>
                                    {bio.map(event => (
                                      <tr key={event._id}>
                                        <td />
                                        <td> {event.title} </td>
                                        <td> {event.location} </td>
                                        <td> {event.eventCause} </td>
                                        <td>
                                          {" "}
                                          {event.creator.email} /{" "}
                                          {event.creator.username}{" "}
                                        </td>
                                        <td>
                                          {" "}
                                          <button
                                            type="button"
                                            className="btn btn-info"
                                            data-toggle="modal"
                                            data-target="#modal-info"
                                            onClick={}
                                          >
                                            Views
                                          </button>
                                          {"   "}
                                          <Button
                                            color="danger"
                                            onClick={this.handleDelete.bind(
                                              this,
                                              event._id
                                            )}
                                          >
                                            Delete
                                          </Button>
                                          {"   "}
                                          <Button color="warning">Edit</Button>
                                          {"     "}
                                        </td>
                                      </tr>
                                 
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <th>ID</th>
                                      <th>Title</th>
                                      <th>Location</th>
                                      <th>Event-Cause</th>
                                      <th>Creator /Usename </th>
                                      <th>Action(s)</th>
                                    </tr>
                                  </tfoot>
                                </table>
                           
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ./box-body */}

                  {/* /.box-footer */}
                </div>
                {/* /.box */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
            {/* Main row */}

            {/* /.row */}
          </section>
          {/* /.content */}
        </div>

        {/* /Modal */}

        {/* /Modal  Biodun*/}
        <div className="modal modal-info fade" id="modal-info">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title">View Event Details </h4>
              </div>
              <div className="modal-body">
                <p>
                  {" "}
                  <strong>Title: </strong> 
                </p>
                <p>
                  {" "}
                  <strong> Event-Cause : </strong> - {}{" "}
                </p>
                <p>
                  {" "}
                  <strong> Location : </strong> - {}{" "}
                </p>
                <p>
                  {" "}
                  <strong>
                    {" "}
                    Date :-{" "}
                    
                   {" "}
                  </strong>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline pull-left"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
            {/* /.modal-content */}
          </div>
          {/* /.modal-dialog */}
        </div>

        {/* /Modal  Biodun*/}

        
              <div
                className="modal fade"
                id="modal-default"
                style={{ display: "none" }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <Button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </Button>
                      <h4 className="modal-title">Create incident log</h4>
                    </div>
                    <div className="modal-body">
                      <form
                        role="form"
                        onSubmit={}
                      >
                        

                        <div className="box-body">
                          <div className="form-group">
                            <label htmlFor="title">
                              Title {"   "} (
                              <span
                                style={{ fontSize: "1rem", color: "#6b8e23" }}
                              >
                                Title like - BB Cuts, Drop Cable cut, Feeder
                                Cable
                              </span>
                              )
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              onChange={this.handleChange}
                              value={title}
                              placeholder="Title/Description detail of the incident"
                            />
                          </div>
                          <div className="row">
                            <div className="col-xs-4" style={{}}>
                              <label htmlFor="Address/ Location">
                                Address/ Location {"   "}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="location"
                                placeholder="Location"
                                onChange={this.handleChange}
                                value={location}
                                //{className="alert alert-success alert-dismissible"}
                              />
                            </div>
                            <div className="col-xs-7">
                              <label htmlFor="Administrative Zones">
                                Administrative Zones
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="administrative"
                                placeholder="Ikeja| Apapa| Surelere| Ikoyi| Victoria
                                Island|"
                                onChange={this.handleChange}
                                //value={administrative}
                                //{className="alert alert-success alert-dismissible"}
                              />
                            </div>
                          </div>
                          <br />

                          <div className="row">
                            <div className="col-xs-4">
                              <label htmlFor="Latitude">Latitude</label>
                              <input
                                type="number"
                                className="form-control"
                                name="lat"
                                placeholder="Latitude"
                                onChange={this.handleChange}
                                data-type="Float"
                                step="any"
                                value={lat}
                              />
                            </div>
                            {"      "}
                            <div className="col-xs-4">
                              <label htmlFor="Longitude">Longitude</label>
                              <input
                                type="number"
                                className="form-control"
                                name="long"
                                placeholder="Longitude"
                                onChange={this.handleChange}
                                data-type="float"
                                step="any"
                                value={long}
                              />
                            </div>
                          </div>

                          {"      "}
                          <br />

                          <div className="form-group">
                            <label htmlFor="eventCause">Event-Cause</label>
                            <input
                              type="text"
                              className="form-control"
                              name="eventCause"
                              value={eventCause}
                              onChange={this.handleChange}
                              placeholder="Nature of the cause"
                            />
                          </div>
                        </div>
                        {/* /.box-body */}
                        <div className="box-footer">
                          <Button
                            type="submit"
                            className="btn btn-primary"
                            onSubmit={this.handleSubmit}
                          >
                            Submit
                          </Button>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-default pull-left"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                  {/* /.modal-content */}
                </div>
                {/* /.modal-dialog */}
              </div>

                                    
    </React.Fragment>
    )
  }
}

export default Content;
