import React, { Component } from "react";
import * as Papa from "papaparse";
import axios from "axios";
import DrawingMap from "./DrawingMap";

export default class File extends Component {
  state = {
    file: ""
  };

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    let volume;

    Papa.parse(file, {
      header: true,
      complete: function(results) {
        results.data.forEach(row => {
          //const { name } = row;
          // console.log(row.Lat);
          volume = parseFloat(row.Lat);
          console.log(volume);

          //Backend

          const result = {
            query: `   
       mutation {
    createEvents( title: "Biodun Adebayo"  eventCause: "Apapa" location: "Festac"  lat: ${volume}  long: 3.3992  ) {
      title
      long
      lat
      location
      eventCause
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

          // const long = parseFloat(results.data.name);
          //console.log(volume);
          //  console.log(long);
        });
      }
    });
  }
  render() {
    return (
      <div>
        <form>
          <input
            className="fileInput"
            type="file"
            onChange={e => this._handleImageChange(e)}
          />
        </form>
        <DrawingMap />
      </div>
    );
  }
}
