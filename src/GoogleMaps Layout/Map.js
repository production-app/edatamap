/* global google */
import React, { Component, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";
import ReactDynamicModal from "react-draggable-resizable-modal";
const x = [];
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      path: [],
      paths: [],
      markers: [],
      show: ""
    };

    this.shapes = [];
    this.handleOverlayComplete = this.handleOverlayComplete.bind(this);
    this.deleteShapes = this.deleteShapes.bind(this);
  }

  openModal = () => {
    this.setState({ isOpen: true });
  };
  closeModal = () => {
    this.setState({ isOpen: false });
  };

  handleOverlayComplete(e) {
    const shape = e.overlay;
    shape.type = e.type;

    //const pos = shape.getPosition()

    const shap = e.type;

    console.log(e.type);

    google.maps.event.addListener(shape, "click", () => {
      this.toggleSelection(shape);
    });
    this.toggleSelection(shape);
    this.shapes.push(shape);
  }

  toggleSelection(shape) {
    //if (shape.getEditable() === true) shape.setEditable(false);
    // else shape.setEditable(true);
  }

  deleteShapes() {
    this.shapes.forEach(shape => shape.setMap(null));
  }

  getPaths = polyline => {
    var coordinates = polyline
      .getPath()
      .getArray()
      .toString();
    // console.log(coordinates[1]);
    console.log(coordinates);
    //  console.log(coordinates.length);
    //console.log(x.replace(]));
    //const y = coordinates.split();
    this.setState({ path: coordinates });
  };

  savePath = () => {
    const result = {
      query: `   
     
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
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "dist/js/content.js";
    script.async = true;
    document.body.appendChild(script);

    document.title = " <eDM/> | eDataMaps  ";
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
          markers: resdata.data.EventList.allEvents,
          show: "HH"
        });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    const { markers, show } = this.state;

    return (
      <div>
        <GoogleMap
          //onClick={this.deleteShapes}
          defaultZoom={this.props.zoom}
          defaultCenter={this.props.center}
        >
          {console.log(this.markers)}
          {markers.map(point => (
            // console.log(point.title),
            <Marker
              key={point._id}
              position={{
                lat: parseFloat(point.lat),
                lng: parseFloat(point.long) //"dist/img/Pole2.png",
              }}
              icon={{
                url: show === "HH" ? "dist/img/MST.png" : "dist/img/Pole2.png",
                scaledSize: new window.google.maps.Size(25, 25)
              }}
            />
          ))}
          <DrawingManager
            defaultDrawingMode={google.maps.drawing.OverlayType.POLYLINE}
            defaultOptions={{
              drawingControl: true,
              drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER
                //drawingModes: [google.maps.drawing.OverlayType.POLYLINE]
              }
            }}
            //onOverlayComplete={this.handleOverlayComplete}
            onPolylineComplete={value => console.log(this.getPaths(value))}
          />
        </GoogleMap>
      </div>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
