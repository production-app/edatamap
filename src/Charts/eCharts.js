import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

let x;
let y;

export default class eCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: [],
      eventChart1: "",
      eventChartz: "",
      chartData: ""
    };
  }

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

    //console.log(eventChartz);
    return (
      <React.Fragment>
        <div style={{ width: "400px", height: "400px" }}>
          <Bar
            data={this.state.chartData}
            options={{ maintainAspectRatio: false }}
            height={450}
            width={600}
          />
        </div>
      </React.Fragment>
    );
  }
}
