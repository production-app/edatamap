import React, { Component } from "react";
import { Button } from "reactstrap";
//import "bootstrap/dist/css/bootstrap.min.css";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { Alert } from "reactstrap";
//import withSession from "../Session/withSession";
import { Link, NavLink } from "react-router-dom";
import { Query } from "react-apollo";
import "./table.css";
import $ from "jquery";
import Pagination from "./Pagination";
import Geocode from "react-geocode";

const EVENT_LISTS = gql`
  query {
    EventList {
      allEvents {
        _id
        title
        location
        eventCause
        createdDate
        creator {
          email
          username
        }
      }
      totalPosts
    }
  }
`;

const DELETE_EVENT = gql`
  mutation($_id: ID!) {
    deleteEvents(_id: $_id) {
      _id
      title
      location
      eventCause
      createdDate
    }
  }
`;

const CREATE_EVENTS = gql`
  mutation(
    $title: String
    $eventCause: String
    $location: String
    $lat: Float
    $long: Float
  ) {
    createEvents(
      title: $title
      eventCause: $eventCause
      location: $location
      lat: $lat
      long: $long
    ) {
      title
      long
      lat
      location
      eventCause
    }
  }
`;

const UPADTE_EVENTS = gql`
  mutation($id: ID!, $title: String!, $location: String!) {
    updateEvents(_id: $id, title: $title, location: $location) {
      _id
      title
      location
    }
  }
`;

const initalState = {
  title: "",
  location: "",
  eventCause: "",
  lat: "",
  long: "",
  showInfo: true,
  events: [],
  eventValue: "",
  modal: false,
  bio: [],
  updates: false,
  counts: "",
  page: "",
  todos: [],
  gecoder: "",
  search: ""
};

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString("en-US");
  const newTime = new Date(date).toLocaleTimeString("en-US");

  return ` ${newDate} at ${newTime}`;
};

class Body extends Component {
  componentDidMount() {
    document.title = " <eDM/> | Dashboard  ";
    this.queryHandler();

    const script = document.createElement("script");

    script.src = "dist/js/content.js";
    script.async = true;
    document.body.appendChild(script);
  }

  constructor(props) {
    super(props);
    this.state = {
      ...initalState,
      currentPage: 1,
      todosPerPage: 7,
      upperPageBound: 3,
      lowerPageBound: 0,
      isPrevBtnActive: "disabled",
      isNextBtnActive: "",
      pageBound: 3,
      totalPages: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnNextClick = this.btnNextClick.bind(this);
    this.btnPrevClick = this.btnPrevClick.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
    this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
  }

  handleClick(event) {
    let listid = Number(event.target.id);
    this.setState({
      currentPage: listid
    });
    $("ul li.active").removeClass("active");
    $("ul li#" + listid).addClass("active");
    this.setPrevAndNextBtnClass(listid);
  }
  setPrevAndNextBtnClass(listid) {
    let totalPage = Math.ceil(
      this.state.todos.length / this.state.todosPerPage
    );
    this.setState({ totalPages: totalPage });
    this.setState({ isNextBtnActive: "disabled" });
    this.setState({ isPrevBtnActive: "disabled" });
    if (totalPage === listid && totalPage > 1) {
      this.setState({ isPrevBtnActive: "" });
    } else if (listid === 1 && totalPage > 1) {
      this.setState({ isNextBtnActive: "" });
    } else if (totalPage > 1) {
      this.setState({ isNextBtnActive: "" });
      this.setState({ isPrevBtnActive: "" });
    }
  }
  btnIncrementClick() {
    this.setState({
      upperPageBound: this.state.upperPageBound + this.state.pageBound
    });
    this.setState({
      lowerPageBound: this.state.lowerPageBound + this.state.pageBound
    });
    let listid = this.state.upperPageBound + 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  }
  btnDecrementClick() {
    this.setState({
      upperPageBound: this.state.upperPageBound - this.state.pageBound
    });
    this.setState({
      lowerPageBound: this.state.lowerPageBound - this.state.pageBound
    });
    let listid = this.state.upperPageBound - this.state.pageBound;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  }
  btnPrevClick() {
    if ((this.state.currentPage - 1) % this.state.pageBound === 0) {
      this.setState({
        upperPageBound: this.state.upperPageBound - this.state.pageBound
      });
      this.setState({
        lowerPageBound: this.state.lowerPageBound - this.state.pageBound
      });
    }
    let listid = this.state.currentPage - 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  }
  btnNextClick() {
    if (this.state.currentPage + 1 > this.state.upperPageBound) {
      this.setState({
        upperPageBound: this.state.upperPageBound + this.state.pageBound
      });
      this.setState({
        lowerPageBound: this.state.lowerPageBound + this.state.pageBound
      });
    }
    let listid = this.state.currentPage + 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  }

  clicks = (e, parameter) => {
    e.preventDefault();
    //console.log(parameter);
    //console.log(e);
    // console.log(this.state.eventValue._id);

    const _id = this.state.eventValue._id;
    const title = this.state.title || this.state.eventValue.title;
    const location = this.state.location || this.state.eventValue.location;
    const eventCause =
      this.state.eventCause || this.state.eventValue.eventCause;
    //console.log(title);

    const result5 = {
      query: `
     mutation {
    updateEvents(_id: "${_id}", title: "${title}", location: "${location}", eventCause: "${eventCause}") {
      _id
      title
      location
    }
  }
   `
    };

    //"https://edmserver.herokuapp.com/graphql"

    fetch("https://edmserver.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(result5)
    })
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        const confirmupdate = window.confirm("Are sure to Update ?");
        if (!confirmupdate) {
          return false;
        }
        console.log(resdata);
        this.props.history.push("/");
        //this.clearState();
        this.setState({ ...initalState, updates: true });
      })
      .catch(err => console.log(err));
  };

  handelerGeocoder = e => {
    e.preventDefault();

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey("AIzaSyCHs4Jwbs2CoI7u8NujfRVr4GkWR7cSPbg");

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();

    // Get address from latidude & longitude.
    Geocode.fromLatLng(this.state.lat, this.state.long).then(
      response => {
        const address = response.results[0].formatted_address;
        this.setState({ gecoder: address });
        //console.log(address);
      },
      error => {
        console.error(error);
      }
    );
  };

  SearchText = e => {
    this.setState({ search: e.target.value });
    //console.log(this.state.search);
  };

  handleDelete = (event, parameter) => {
    const confirmdelete = window.confirm("Are sure to delete ?");
    if (!confirmdelete) {
      return false;
    }
    const eventId = event;
    const result2 = {
      query: `
      mutation {
        deleteEvents(_id: "${eventId}" ) {
          _id
          title
          location
          eventCause
          createdDate
        }
      
      }
      
      `
    };

    fetch("https://edmserver.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(result2)
    })
      .then(res => {
        return res.json();
      })
      .then(resdata2 => {
        // console.log(resdata2);
        this.setState(prevState => {
          const updateDelete = prevState.todos.filter(event => {
            return event._id !== eventId;
          });
          return { todos: updateDelete };
        });
      })
      .catch(err => {
        throw err;
      });
  };

  handeler = (event, parameter) => {
    //alert(event);
    const values = event;
    // console.log(values);
    //console.log(parameter);

    const result2 = {
      query: `
      query {
        GetSingleValue(_id: "${values}") {
          _id
          title
          lat
          long
          location
          labelling
          eventCause
          createdDate        
        }
      }
      
      `
    };

    fetch("https://edmserver.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(result2)
    })
      .then(res => {
        return res.json();
      })
      .then(resdata2 => {
        this.setState({ eventValue: resdata2.data.GetSingleValue });
      })
      .catch(err => {
        throw err;
      });
  };

  handleChange = e => {
    e.preventDefault();
    // const values = e.target.value;
    // console.log(typeof values);
    const { name, value } = e.target;
    this.setState({ [name]: value });
    // this.setState({ showInfo: !this.state.showInfo });
  };

  clearState = () => {
    this.setState({ ...initalState });
  };

  handleSubmit = (event, createEvents) => {
    event.preventDefault();
    //console.log(event.target.name);
    createEvents().then(async ({ data }) => {
      // this.setState({ bio: data });
      localStorage.setItem("token", data.createEvents.token);
      // this.state({ events: this.state.bio });
      // console.log(this.state.bio);
      //await this.props.refetch();
      this.clearState();
      // this.props.history.push("/");
    });

    // console.log(user);
  };

  queryHandler = () => {
    const result3 = {
      query: `
      query {
        EventList(page: ${localStorage.getItem("page")}) {
          allEvents {
            _id
            title
            location
            eventCause
            createdDate
            labelling
            creator {
              email
              username
            }
          }
          totalPosts
        }
      }
      
      `
    };

    fetch("https://edmserver.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(result3)
    })
      .then(res => {
        return res.json();
      })
      .then(resdata2 => {
        //  console.log(resdata2);
        this.setState({
          todos: resdata2.data.EventList.allEvents,
          counts: resdata2.data.EventList.totalPosts
        });
        //localStorage.setItem(this.state.bio);
        // console.log();
      })
      .catch(err => {
        throw err;
      });
  };

  enabledHandler2(updates) {
    if (updates) {
      console.log(updates);
      return true;
    }
    return false;
  }

  enabledHandler = (event, parameter) => {
    //const getValue = "luth";
    // const getValue2 = localStorage.getItem("token");
    // console.log(event);

    const userEmail = localStorage.getItem("bio");

    //console.log(y);
    if (event !== userEmail) {
      return true;
    }
  };

  render() {
    const {
      title,
      location,
      eventCause,
      eventValue,
      labelling,
      updates,
      counts,
      currentPage,
      todosPerPage,
      upperPageBound,
      lowerPageBound,
      isPrevBtnActive,
      isNextBtnActive,
      totalPages
    } = this.state;
    let todos = this.state.todos;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    let currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
    const lat = +this.state.lat;
    const long = +this.state.long;
    const Perpage = 10;
    let page = +this.state.page;
    page = 1;
    //const Pages = 0 || 1;
    const count = Math.ceil(counts / Perpage);

    let search = this.state.search;

    if (search.length > 0) {
      currentTodos = currentTodos.filter(function(todo) {
        return todo.location.toLowerCase().match(search);
      });
    }

    let renderTodos = currentTodos.map((todo, index) => {
      return (
        <tr key={todo._id}>
          <td>
            {" "}
            <input type="checkbox" className="control-input" />
          </td>
          <td> {todo.title} </td>
          <td> {todo.location} </td>
          <td> {todo.eventCause} </td>
          <td> {todo.labelling} </td>

          <td>
            {" "}
            {todo.creator.username} / {todo.creator.email}{" "}
          </td>

          <td>
            {" "}
            <button
              type="button"
              className="btn btn-info"
              data-toggle="modal"
              data-target="#modal-default2"
              onClick={this.handeler.bind(this, todo._id)}
            >
              <i className="fa fa-list-ul" aria-hidden="true">
                {"   "} View
              </i>
            </button>
            {"   "}
            <Button
              color="danger"
              disabled={this.enabledHandler(todo.creator.email)}
              onClick={this.handleDelete.bind(this, todo._id)}
            >
              <i className="fa fa-trash" aria-hidden="true">
                {"  "} Delete
              </i>
            </Button>
            {"   "}
            <Button
              type="button"
              className="btn btn-warning"
              data-toggle="modal"
              data-target="#modal-info2"
              disabled={this.enabledHandler(todo.creator.email)}
              onClick={this.handeler.bind(this, todo._id)}
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true">
                {" "}
                Edit
              </i>
            </Button>
            {"     "}
          </td>
        </tr>
      );
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      if (number === 1 && currentPage === 1) {
        return (
          <li key={number} className="active" id={number}>
            <a href="#" id={number} onClick={this.handleClick}>
              {number}
            </a>
          </li>
        );
      } else if (number < upperPageBound + 1 && number > lowerPageBound) {
        return (
          <li key={number} id={number}>
            <a href="#" id={number} onClick={this.handleClick}>
              {number}
            </a>
          </li>
        );
      }
    });
    let pageIncrementBtn = null;
    if (pageNumbers.length > upperPageBound) {
      pageIncrementBtn = (
        <li className="">
          <a href="#" onClick={this.btnIncrementClick}>
            {" "}
            &hellip;{" "}
          </a>
        </li>
      );
    }
    let pageDecrementBtn = null;
    if (lowerPageBound >= 1) {
      pageDecrementBtn = (
        <li className="">
          <a href="#" onClick={this.btnDecrementClick}>
            {" "}
            &hellip;{" "}
          </a>
        </li>
      );
    }
    let renderPrevBtn = null;
    if (isPrevBtnActive === "disabled") {
      renderPrevBtn = (
        <li className={isPrevBtnActive}>
          <span id="btnPrev"> Prev </span>
        </li>
      );
    } else {
      renderPrevBtn = (
        <li className={isPrevBtnActive}>
          <a href="#" id="btnPrev" onClick={this.btnPrevClick}>
            {" "}
            Prev{" "}
          </a>
        </li>
      );
    }
    let renderNextBtn = null;
    if (isNextBtnActive === "disabled") {
      renderNextBtn = (
        <li className={isNextBtnActive}>
          <span id="btnNext"> Next </span>
        </li>
      );
    } else {
      renderNextBtn = (
        <li className={isNextBtnActive}>
          <a href="#" id="btnNext" onClick={this.btnNextClick}>
            {" "}
            Next{" "}
          </a>
        </li>
      );
    }

    return (
      <React.Fragment>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <h1>Dashboard</h1>
            <ol className="breadcrumb">
              <li>
                <a href="url">
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
                    <div className="col-md-7">
                      <h3 className="box-title">
                        <span className="glyphicon glyphicon-pencil" /> Log
                        Table {"      "} {"        "}
                        <Button
                          type="button"
                          className="btn btn-warning"
                          data-toggle="modal"
                          data-target="#modal-default"
                        >
                          <i
                            className="fa fa-location-arrow "
                            aria-hidden="true"
                          >
                            {" "}
                            CREATE
                          </i>
                        </Button>
                      </h3>
                    </div>
                    <div className="col-md-5" style={{ display: "flex" }}>
                      <p
                        style={{
                          padding: "9px",
                          fontWeight: 700,
                          display: "inline"
                        }}
                      >
                        Search:{" "}
                      </p>{" "}
                      <input
                        className="form-control"
                        type="search"
                        placeholder="Location"
                        onChange={this.SearchText}
                        value={search}
                        style={{ width: "80%" }}
                      />{" "}
                    </div>

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
                            <a href="/">Action</a>
                          </li>
                          <li>
                            <a href="/">Another action</a>
                          </li>
                          <li>
                            <a href="/">Something else here</a>
                          </li>
                          <li className="divider" />
                          <li>
                            <a href="/">Separated link</a>
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
                          <React.Fragment>
                            <div className="table-responsive">
                              <table className="table table-hover">
                                <tbody>
                                  <tr>
                                    <th style={{ width: "0%" }}>S/N</th>
                                    <th style={{ width: "1%" }}>Name</th>
                                    <th style={{ width: "1%" }}>Location</th>
                                    <th>Node_Type</th>
                                    <th style={{ width: "0%" }}>Labelling</th>
                                    <th style={{ width: "0%" }}>
                                      Creator /Username{" "}
                                    </th>
                                    <th style={{ width: "1%" }}>Action(s)</th>
                                  </tr>
                                  {renderTodos.length > 0
                                    ? renderTodos
                                    : "No Data"}
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <th>S/N</th>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Node_Type</th>
                                    <th>Labelling</th>
                                    <th>Creator /Username </th>
                                    <th>Action(s)</th>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                            <div className="pagination">
                              <ul className="pagination">
                                {renderPrevBtn}
                                {pageDecrementBtn}
                                {renderPageNumbers}
                                {pageIncrementBtn}
                                {renderNextBtn}
                              </ul>
                              <br />
                              <br />

                              <p>Total items: {counts} </p>
                            </div>
                          </React.Fragment>
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
        <div className="modal modal-default fade" id="modal-default2">
          <div className="modal-dialog">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{ borderBottomColor: "#d91b60" }}
              >
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <img
                  src="dist/img/edatamap_logo.png"
                  className="img-circle"
                  width="30px"
                  height="30px"
                  alt="User "
                  style={{ width: "34px", display: "inline-block" }}
                />
                <h4
                  className="modal-title"
                  style={{ display: "inline-block", margin: "6px" }}
                >
                  {"   "}
                  <strong>View Logs</strong>
                </h4>
              </div>
              <div className="modal-body">
                <div>
                  {" "}
                  <strong>Title: </strong> - {eventValue.title}{" "}
                </div>
                <br />
                <div>
                  {" "}
                  <strong> Node_Type : </strong> - {eventValue.eventCause}{" "}
                </div>
                <br />
                <div>
                  {" "}
                  <strong> Location : </strong> - {eventValue.location}{" "}
                </div>
                <br />
                <p>
                  {" "}
                  <strong>
                    {" "}
                    Date :- {formatDate(eventValue.createdDate)}{" "}
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

        {/* /Modal  Update*/}

        <div className="modal modal-info2 fade" id="modal-info2">
          <div className="modal-dialog">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{ borderBottomColor: "#d91b60" }}
              >
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <img
                  src="dist/img/edatamap_logo.png"
                  className="img-circle"
                  width="30px"
                  height="30px"
                  alt="User "
                  style={{ width: "34px", display: "inline-block" }}
                />
                <h4
                  className="modal-title"
                  style={{ display: "inline-block", margin: "6px" }}
                >
                  {"   "}
                  <strong>Update Logs</strong>
                </h4>
              </div>
              <div className="modal-body">
                <form role="form" onSubmit={this.clicks}>
                  {updates && (
                    <div>
                      {" "}
                      <div className="alert alert-success alert-dismissible">
                        <a
                          href="/"
                          className="close"
                          data-dismiss="alert modal"
                          aria-label="close"
                          // data-dismiss="modal"
                        >
                          x
                        </a>
                        <strong>
                          {" "}
                          <i className="fa fa-check-square" /> Successful!
                        </strong>{" "}
                        Your data been logged
                      </div>{" "}
                    </div>
                  )}
                  <div className="box-body">
                    <div className="form-group">
                      <label htmlFor="title">
                        Title {"   "} (
                        <span style={{ fontSize: "1rem", color: "#6b8e23" }}>
                          Title like - BB Cuts, Drop Cable cut, Feeder Cable
                        </span>
                        )
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        onChange={this.handleChange}
                        defaultValue={eventValue.title}
                      />

                      <input
                        type="hidden"
                        readOnly={true}
                        id="txt"
                        className="form-control"
                        placeholder="Title/Description detail of the incident"
                      />

                      <div></div>
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
                          onChange={this.handleChange}
                          defaultValue={eventValue.location}

                          //{className="alert alert-success alert-dismissible"}
                        />
                      </div>
                      <div className="col-xs-7">
                        <label htmlFor="Administrative Zones">Node_Type</label>
                        <input
                          type="text"
                          className="form-control"
                          name="eventCause"
                          onChange={this.handleChange}
                          defaultValue={eventValue.eventCause}

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
                          id="lat"
                          onChange={this.handleChange}
                          defaultValue={eventValue.lat}
                        />
                      </div>
                      {"      "}
                      <div className="col-xs-4">
                        <label htmlFor="Longitude">Longitude</label>
                        <input
                          type="number"
                          className="form-control"
                          name="long"
                          onChange={this.handleChange}
                          defaultValue={eventValue.long}
                        />
                      </div>
                    </div>

                    {"      "}
                    <br />
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onSubmit={this.clicks.bind(this, eventValue._id)}
                      disabled={this.enabledHandler2(this.state.updates)}
                    >
                      <i className="fa fa-pencil-square-o" aria-hidden="true">
                        {" "}
                        {"  "}
                        Update
                      </i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* /.modal-content */}
          </div>
          {/* /.modal-dialog */}
        </div>

        {/* /Modal  Update*/}

        <Mutation
          mutation={CREATE_EVENTS}
          variables={{ title, location, eventCause, lat, long }}
          // update={this.updateCache}
        >
          {(createEvents, { data, error, loading }) => {
            return (
              <div
                className="modal fade"
                id="modal-default"
                style={{ display: "none" }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div
                      className="modal-header"
                      style={{ borderBottomColor: "#d91b60" }}
                    >
                      <Button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </Button>
                      <img
                        src="dist/img/edatamap_logo.png"
                        className="img-circle"
                        width="30px"
                        height="30px"
                        alt="User "
                        style={{ width: "34px", display: "inline-block" }}
                      />{" "}
                      {"  "}
                      <h4
                        className="modal-title"
                        style={{ display: "inline-block", margin: "6px" }}
                      >
                        {" "}
                        <strong>CREATE LOGS</strong>{" "}
                      </h4>
                    </div>
                    <div className="modal-body">
                      <form
                        role="form"
                        onSubmit={event =>
                          this.handleSubmit(event, createEvents)
                        }
                      >
                        {error ? (
                          <div className="alert alert-danger alert-dismissible">
                            <a
                              href="/"
                              data-dismiss="alert modal"
                              className="close"
                              aria-label="close"
                            >
                              x
                            </a>
                            <strong>
                              {" "}
                              <i className="fa fa-exclamation-triangle" />
                            </strong>{" "}
                            {error.graphQLErrors.map(x => x.message) ||
                              "Invalid Details"}
                          </div>
                        ) : (
                          " "
                        )}
                        {data ? (
                          <div className="alert alert-success alert-dismissible">
                            <a
                              href="/"
                              className="close"
                              data-dismiss="alert modal"
                              aria-label="close"
                              // data-dismiss="modal"
                            >
                              x
                            </a>
                            <strong>
                              {" "}
                              <i className="fa fa-check-square" /> Successful!
                            </strong>{" "}
                            Your data been logged
                          </div>
                        ) : (
                          " "
                        )}

                        <div className="box-body">
                          <div className="form-group">
                            <label htmlFor="title">
                              Title {"   "} (
                              <span style={{ fontSize: "1rem", color: "grey" }}>
                                POLES/ HANDHOLES Description - HH_2, P_3
                              </span>
                              )
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              onChange={this.handleChange}
                              value={title}
                              placeholder="Description of Handholes/Poles (HH2, P_3)"
                            />
                            <input
                              type="hidden"
                              readOnly={true}
                              id="txt"
                              className="form-control"
                              value={lat + "," + long}
                            />

                            <div></div>
                          </div>
                          <div className="row">
                            <div className="col-xs-12">
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
                          </div>
                          <br />
                          <label htmlFor="Node_Type">
                            Node_Type {"   "} ({" "}
                            <span style={{ fontSize: "1rem", color: "grey" }}>
                              MST HH/ CLOSURE HH
                            </span>
                            )
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="eventCause"
                            placeholder="Node_Type - Closure_HH Poles"
                            onChange={this.handleChange}
                            value={eventCause}
                            //{className="alert alert-success alert-dismissible"}
                          />
                          <br></br>
                          <div>
                            {" "}
                            <h5>
                              <strong>
                                Reverse your coordinates below to readable
                                address. Clicking the button
                              </strong>
                            </h5>{" "}
                          </div>
                          <br />
                          <div className="row">
                            <div className="col-xs-4">
                              <label htmlFor="Latitude">
                                Latitude (<b style={{ color: "red" }}> * </b>)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="lat"
                                id="lat"
                                placeholder="Latitude"
                                onChange={this.handleChange}
                                data-type="Float"
                                step="any"
                                value={lat}
                              />
                            </div>
                            {"      "}
                            <div className="col-xs-4">
                              <label htmlFor="Longitude">
                                Longitude (<b style={{ color: "red" }}> * </b>)
                              </label>
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
                          <br></br>
                          <div>
                            <strong>
                              {" "}
                              <i
                                className="fa fa-map-pin"
                                style={{
                                  fontSize: "14px",
                                  padding: "2px",
                                  margin: "7px"
                                }}
                                aria-hidden="true"
                              >
                                {"    "}
                                {this.state.gecoder || "No Data yet"}
                              </i>{" "}
                            </strong>
                          </div>
                          <Button className="y" onClick={this.handelerGeocoder}>
                            {" "}
                            <span className="glyphicon glyphicon-map-marker"></span>{" "}
                            Reverse Geocoder{" "}
                          </Button>
                        </div>
                        {/* /.box-body */}
                        <div className="box-footer">
                          <Button
                            type="submit"
                            className="btn btn-success"
                            onSubmit={this.handleSubmit}
                          >
                            <i className="fa fa-cloud" aria-hidden="true">
                              {"  "}
                              SUBMIT
                            </i>
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* /.modal-content */}
                </div>
                {/* /.modal-dialog */}
              </div>
            );
          }}
        </Mutation>
      </React.Fragment>
    );
  }
}

export default withRouter(Body);
