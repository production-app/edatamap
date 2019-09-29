/* global google */
import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";
import ReactDynamicModal from "react-draggable-resizable-modal";
//const x = [];
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      path: [],
      paths: []
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
    var coordinates = polyline.getPath().getArray();
    //toString();
    // console.log(coordinates[1]);
    console.log(coordinates);
    //  console.log(coordinates.length);
    //console.log(x.replace(]));
    //const y = coordinates.split();
    this.setState({ path: coordinates });
    //console.log(this.state.path);
    //this.state.path.push(this.state.paths);
    //console.log(this.state.paths);
  };

  savePath = () => {
    const result = {
      query: `   
       mutation {
    createCables( lat: 3.000, lng:6.000, path: ${this.state.path}) {
     lat
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
        console.log(resdata);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <button onClick={this.savePath}> Save</button>
        <ReactDynamicModal
          initWidth={350}
          initHeight={350}
          onRequestClose={this.closeModal}
          isOpen={this.state.isOpen}
          data={
            <div className="body">
              <br></br>
              <p>{this.state.path}</p>
            </div>
          }
          headerValue={"Modal Header"}
          actions={
            <div>
              <button onClick={this.closeModal}>Close</button>
            </div>
          }
          footerText={"You can add some notes here"}
          style={{
            header: { color: "#fff", backgroundColor: "blue" },
            footer: { color: "blue" },
            actions: { textAlign: "right" }
          }}
        />

        <GoogleMap
          //onClick={this.deleteShapes}
          defaultZoom={this.props.zoom}
          defaultCenter={this.props.center}
        >
          <Marker position={{ lat: -34.397, lng: 150.644 }} draggable={true} />
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
        <button type="button" onClick={this.deleteShapes}>
          Delete
        </button>
        <button onClick={this.openModal}> Open modal </button>
      </div>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
