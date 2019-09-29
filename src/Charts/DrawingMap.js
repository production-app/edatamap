/* global google */
import React from "react";
import { Map, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { Button } from "reactstrap";
import { Polyline } from "react-google-maps";
import $ from "jquery";

const LoadingContainer = props => <div>Fancy loading container!</div>;

var polylines = [];

class DrawingMap extends React.Component {
  constructor(props) {
    super(props);
    this.initMap = this.initMap.bind(this);
  }

  initMap(mapProps, map) {
    var self = this;
    var selectedShape;
    const { google } = mapProps;

    //add drawing control
    var drawingControl = new google.maps.drawing.DrawingManager({
      drawingMode: null,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYLINE]
      },
      polylineOptions: {
        editable: true,
        draggable: false,
        geodesic: true
      }
    });
    drawingControl.setMap(map);

    google.maps.event.addListener(drawingControl, "polylinecomplete", function(
      polyline
    ) {
      // polylines.push(polyline);
      var polylinePath = polyline.getPath().getArray();
      $.each(polylinePath, function(key, latlng) {
        var lat = latlng.lat();
        var lon = latlng.lng();
        console.log(lat, lon, key);
        // str_input += lat + ' ' + lon + ',';
      });

      //console.log("polyline : " + polylinePath.getArray());
    });

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(40.854885, -88.081807),
      map: map,
      title: "Place the marker for your location!", //The title on hover to display
      draggable: true //this makes it drag and drop
    });

    window.google.maps.event.addListener(marker, "dragend", e => {
      let position = marker.getPosition();
      console.log(marker.position.lat().toFixed(5));
    });
  }

  render() {
    return (
      <div>
        <Button type="button" id="delete-button">
          Delete
        </Button>
        <Map
          google={this.props.google}
          onReady={this.initMap}
          onClick={this.onMapClicked}
          initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }}
          zoom={15}
          yesIWantToUseGoogleMapApiInternals
        ></Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCHs4Jwbs2CoI7u8NujfRVr4GkWR7cSPbg",
  libraries: ["drawing"],
  LoadingContainer: LoadingContainer
})(DrawingMap);
