import React, { Component, useState } from "react";
import "./modal.css";
import ReactModal from "react-modal-resizable-draggable";
import * as Papa from "papaparse";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import Map from "./Map";
import Progress from "react-progressbar";

let cordinate2 = [];

const Maps = props => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  // console.log(props);
  const { markers, show } = props;
  console.log(markers);
  return (
    <GoogleMap defaultZoom={13} defaultCenter={{ lat: 6.45041, lng: 3.43533 }}>
      {markers.map(point => (
        // console.log(point.title),
        <Marker
          key={point._id}
          position={{
            lat: parseFloat(point.lat),
            lng: parseFloat(point.long) //"dist/img/Pole2.png",
          }}
          onClick={() => {
            setSelectedEvent(point);
          }}
          icon={{
            url: show === "HH" ? "dist/img/MST.png" : "dist/img/Pole2.png",
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))}

      {selectedEvent && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedEvent.lat),
            lng: parseFloat(selectedEvent.long)
          }}
          onCloseClick={() => {
            setSelectedEvent(null);
          }}
        >
          <div>
            <h6> {selectedEvent.title} </h6>
            <p> {selectedEvent.location}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
  // console.log(props);
};

const WrappedMap = withScriptjs(withGoogleMap(Maps));

class GoogleBody extends Component {
  state = {
    markers: [],
    show: "",
    modalIsOpen: false,
    file: "",
    shows: false,
    progresss: false,
    completed: 0
  };

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    let lat;
    let long;
    let title;
    let nodeType;
    let locations;

    Papa.parse(file, {
      header: true,
      complete: function(results) {
        results.data.forEach(row => {
          //const { name } = row;
          // console.log(row.Lat);
          lat = parseFloat(row.Lat);
          long = parseFloat(row.Long);
          title = row.Name;
          nodeType = row.NodeType;
          locations = row.Location;

          // console.log(volume);

          //Backend

          const result = {
            query: `   
       mutation {
       createEvents( title: "${title}"  eventCause: "${nodeType}" location:"${locations}"   lat: ${lat}  long: ${long}  ) {
        title
         long
         lat
         location
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
            .then(({ data }) => {
              console.log(data);
            })
            .catch(err => {
              // this.setState({ bio: false });
              // console.log(err);
            });
        });
      }
    });

    let self = this;

    let id = window.setInterval(function() {
      let diff = Math.random() * 10;

      self.setState({
        completed: self.state.completed + diff
      });

      if (self.state.completed > 99.3) {
        window.clearInterval(id);
      }
    }, 900);

    this.setState({ progresss: true });
  }

  openModal = e => {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  };
  closeModal = e => {
    e.preventDefault();
    this.setState({ modalIsOpen: false });
  };

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "dist/js/content.js";
    script.async = true;
    document.body.appendChild(script);

    document.title = " <eDM/> | eData Map  ";
    const result = {
      query: `
            query {
                EventList {
                  allEvents{
                    _id
                    title
                    location
                    eventCause
                    lat
                    long
                    creator{
                      email
                    }

                  }
                 
                  
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
        // console.log(resdata);
        this.setState({
          markers: resdata.data.EventList.allEvents
        });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    const { markers, shows, bio } = this.state;
    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <br />
        <section className="content-header">
          <br />

          <br />
          <h1>
            Real Time Map
            <small>preview the Event Logs</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-dashboard" /> Home
              </a>
            </li>
            <li>
              <a href="#">eMapper</a>
            </li>
            <li className="active" />
          </ol>
        </section>
        {/* Main content */}
        <section className="content">
          {/* /.row */}
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    <span className="glyphicon glyphicon-pencil" /> ePlotter{" "}
                  </h3>
                  <span style={{ fontSize: "13px", color: "black" }}>
                    {" "}
                    - Kindly click the button to include largeset of geosptial
                    records. Preferable format is .CSV ({" "}
                    <i
                      className="fa fa-file-excel-o"
                      aria-hidden="true"
                    ></i>{" "}
                    {"/"} {""}{" "}
                    <i className="fa fa-files-o" aria-hidden="true"></i> ){" "}
                  </span>
                  <form style={{ display: "inline-block" }}>
                    <input
                      className="fileInput"
                      type="file"
                      className="btn btn-info"
                      accept=".csv"
                      onChange={e => this._handleImageChange(e)}
                    />
                  </form>

                  {shows ? (
                    <div className="alert alert-success">
                      <strong>Success!</strong> You should{" "}
                    </div>
                  ) : (
                    ""
                  )}

                  {/* <button
                    type="button"
                    data-toggle="modal"
                    data-target=""
                    className="btn btn-info btn btn-secondary"
                    onClick={this.openModal}
                  >
                    <i className="fa fa-files-o" aria-hidden="true">
                      {" "}
                      Attach
                    </i>
                 </button> */}
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
                <div className="box-body table-responsive no-padding" />
                {/* /.box-body */}
                <div
                  style={{
                    //padding: "34px 24px 8px 45px",
                    background: "#e4e5e6"
                  }}
                >
                  {this.state.progresss ? (
                    <div className="progressbar-progress">
                      <Progress completed={this.state.completed} />
                      {!this.state.completed ? (
                        <div> Loading...</div>
                      ) : (
                        <div>Uploaded Successful, refresh for updates</div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Map
                  //center={{ lat: 6.45041, lng: 3.43533 }}
                  markers={markers}
                  zoom={16}
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHs4Jwbs2CoI7u8NujfRVr4GkWR7cSPbg&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `600px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />

                {/* /.box-body */}
              </div>
              {/* /.box */}
            </div>
          </div>
        </section>
        {/* /.content */}
      </div>
    );
  }
}
export default GoogleBody;
