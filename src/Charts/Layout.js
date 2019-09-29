import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import File from "./File";
import Map from "./Map";
import ReactDynamicModal from "react-draggable-resizable-modal";
import Sample from "./Sample";

let x;
let y;

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: [],
      eventChart1: "",
      eventChartz: "",
      chartData: "",
      isOpen: false
    };
  }

  openModal = () => {
    this.setState({ isOpen: true });
  };
  closeModal = () => {
    this.setState({ isOpen: false });
  };

  componentWillMount() {
    // console.log("Biodun");

    const result = {
      query: `
                query {
                    EventList {
                      allEvents{
                        _id
                        title
                        location
                      }
                      countIkeja
                      countYaba
                     countLekki
                    }
                  }
                `
    };

    fetch("https://edmserver.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(result)
    })
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        console.log(resdata);

        this.setState({
          events: resdata.data.EventList.allEvents,
          eventChart1: resdata.data.EventList.countIkeja,
          eventChartz: resdata.data.EventList.countYaba
        });
      })

      .catch(err => {
        throw err;
      });

    const data = props => {
      return {
        labels: [
          "Victoria Island",
          "Lekki",
          "Yaba",
          "Surulere",
          "Ikoyi",
          "Ajah",
          "Ikeja"
        ],

        datasets: [
          {
            label: "Events Cuts",
            backgroundColor: [
              "rgba(255,99,132, 0.6)",
              "rgba(54,162,235,0.6)",
              "rgba(255,206,86,0.6) ",
              "rgba(75,192,192,0.6)",
              "rgba(153,102,255,0.6 ) "
            ],
            // borderColor: "rgba(255,99,132,1)",
            // borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [
              0,
              5,
              localStorage.getItem("lekki"),
              1,
              50,
              20,
              localStorage.getItem("Ikeja")
            ]
          }
        ]
      };
    };
    this.setState({ chartData: data });
  }

  render() {
    const { events } = this.state;
    const { eventChart1 } = this.state;
    const { eventChartz } = this.state;

    x = localStorage.getItem("lekki");

    localStorage.setItem("lekki", this.state.eventChart1);
    localStorage.setItem("Ikeja", this.state.eventChartz);
    return (
      <React.Fragment>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <h1>
              Dashboard
              <small />
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
                      <span className="glyphicon glyphicon-pencil" /> Chart
                      Table {"      "}{" "}
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
                        <div className="table-responsive" />
                      </div>
                    </div>
                  </div>
                  {/* ./box-body */}

                  <React.Fragment>
                    <div style={{ width: "400px", height: "400px" }}>
                      <Bar
                        data={this.state.chartData}
                        options={{ maintainAspectRatio: false }}
                        height={450}
                        width={600}
                      />

                      {/* <File></File> */}

                      {/* <Sample></Sample> */}
                    </div>
                  </React.Fragment>

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
      </React.Fragment>
    );
  }
}
