import React from "react";
import { DrawingManager } from "@react-google-maps/api";

const DrawingManagers = () => (
  <DrawingManager
    onLoad={drawingManager => {
      console.log(drawingManager);
    }}
    onPolygonComplete={polygon => console.log({ polygon })}
  />
);

export default DrawingManagers;
