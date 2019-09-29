import React, { Component, useState } from "react";
import "./modal.css";
import ReactModal from "react-modal-resizable-draggable";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

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
    modalIsOpen: false
  };

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

    fetch("http://localhost:8888/graphql", {
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
          markers: resdata.data.EventList.allEvents,
          show: "HH"
        });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    const { markers } = this.state;
    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>
            Real Time Map
            <small>preview incident location</small>
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
                  <button
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
                  </button>
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
                <WrappedMap
                  markers={markers}
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCHs4Jwbs2CoI7u8NujfRVr4GkWR7cSPbg`}
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
