import React, { Component, useState } from "react";
import "./modal.css";
import ReactModal from "react-modal-resizable-draggable";
import $ from "jquery";
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";
import Geosuggest from "react-geosuggest";
import "./Geosuggust.css";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const Maps = props => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [pathCable, setpathCable] = useState(null);
  const [lats, setlats] = useState(null);
  const [longs, setlongs] = useState(null);
  // console.log(props);
  const { markers, show } = props;
  //console.log(show);

  //console.log(markers);

  const getPaths = polyline => {
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

  return (
    <div>
      <div
        style={{
          position: "absolute",
          marginTop: "-608px",
          marginLeft: "567px"
        }}
      >
        <Geosuggest
          // ref={el => this._geoSuggest = el}
          placeholder="Start typing!"
          //initialValue="Hamburg"
          // fixtures={fixtures}
          onSuggestSelect={place => {
            const { lat, lng } = place.location;
            console.log(lat);
            setlats(lat);
            setlongs(lng);
          }}
          location={new window.google.maps.LatLng(53.558572, 9.9278215)}
          radius={20}
        />
      </div>
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 6.45041, lng: 3.43533 }}
      >
        {console.log(longs)}
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
              url:
                point.eventCause == "Handhole"
                  ? "dist/img/MST.png"
                  : "dist/img/Pole2.png",
              scaledSize: new window.google.maps.Size(30, 30)
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

        <DrawingManager
          //defaultDrawingMode={google.maps.drawing.OverlayType.POLYLINE}
          defaultOptions={{
            drawingControl: true,
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.TOP_CENTER
              //drawingModes: [google.maps.drawing.OverlayType.POLYLINE]
            }
          }}
          //onOverlayComplete={this.handleOverlayComplete}
          onPolylineComplete={value => {
            let polylinePath = value.getPath().getArray();
            $.each(polylinePath, function(key, latlng) {
              var lat = latlng.lat();
              var lon = latlng.lng();
              let latlong = [];
              latlong.push(lat, lon);
              //console.log(latlong);
              // console.log(`lat: ${lat}, long: ${lon}`);
              // str_input += lat + ' ' + lon + ',';
              setpathCable(latlong);
            });
          }}
        />
      </GoogleMap>
    </div>
  );
  // console.log(props);
  {
    console.log(pathCable);
  }
  // console.log(value.getPath().getArray())
};

const WrappedMap = withScriptjs(withGoogleMap(Maps));

class GoogleBody extends Component {
  state = {
    markers: [],
    show: [],
    shows: [],
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
        //console.log(resdata);
        for (let i = 0; i < resdata.data.EventList.allEvents.length; i++) {
          //console.log(i);

          let e;

          e += resdata.data.EventList.allEvents[i].eventCause + ",";

          this.setState({
            markers: resdata.data.EventList.allEvents,
            show: this.state.shows
          });
        }
        // console.log(this.state.show);
      })

      .catch(err => {
        throw err;
      });
  }

  render() {
    const { markers } = this.state;
    return (
      <div className="">
        <WrappedMap
          markers={markers}
          // show={shows}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCHs4Jwbs2CoI7u8NujfRVr4GkWR7cSPbg`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
export default GoogleBody;
