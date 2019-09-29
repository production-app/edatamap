import React from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";
import { DrawingManager } from "@react-google-maps/api";

const Sample = () => {
  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey="AIzaSyCHs4Jwbs2CoI7u8NujfRVr4GkWR7cSPbg"
    >
      <GoogleMap
        id="circle-example"
        mapContainerStyle={{
          height: "400px",
          width: "800px"
        }}
        zoom={15}
        center={{
          lat: 6.45041,
          lng: 3.43533
        }}
      >
        <Polyline
          onDrag={e => {
            console.log("polyline: ", e);
          }}
          onClick={e => console.log(e)}
          onLoad={e => {
            console.log(e);
          }}
          onUnmount={e => {
            console.log(e);
          }}
          path={[
            { lat: 6.45041, lng: 3.43533 },
            { lat: 6.45041, lng: 3.43533 }
          ]}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            clickable: false,
            draggable: true,
            editable: true,
            visible: true,
            radius: 30000,
            paths: [{ lat: 6.45041, lng: 3.43533 }],
            zIndex: 1
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default Sample;
