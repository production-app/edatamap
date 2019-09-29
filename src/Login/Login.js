import React, { Component } from "react";
import "./Login.css";
import "./Signup";
import Signup from "./Signup";
import Sigin from "./Sigin";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: true
    };
  }

  onHandler = e => {
    this.setState({ showInfo: !this.state.showInfo });
  };

  componentDidMount() {
    document.title = " <eDM/> | Authentication ";

    const script = document.createElement("script");

    script.src = "dist/js/content.js";
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    return (
      <React.Fragment>
        <section className="login-block">
          <div className="container">
            <div className="row">
              <div className="col-md-4 login-sec">
                {/* Login */}
                <div className="top-buttons">
                  <button
                    className={
                      this.state.showInfo
                        ? "to-signup top-active-button"
                        : "to-signin"
                    }
                    onClick={this.onHandler}
                  >
                    {" "}
                    Sign In{" "}
                  </button>
                  <button
                    className={
                      this.state.showInfo
                        ? "to-signin"
                        : "to-signup top-active-button"
                    }
                    onClick={this.onHandler}
                  >
                    {" "}
                    Sign Up{" "}
                  </button>
                </div>

                <div>
                  {" "}
                  <img
                    src="dist/img/edatamap_logo.png"
                    style={{
                      width: "79px",
                      marginLeft: "-44px",
                      marginTop: "-246px"
                    }}
                  ></img>{" "}
                </div>

                {this.state.showInfo ? (
                  <h2 className="text-center">Login Now</h2>
                ) : (
                  <h2 className="text-center">Register Now</h2>
                )}

                {this.state.showInfo ? (
                  <Sigin refetch={this.props.refetch} />
                ) : (
                  <Signup refetch={this.props.refetch} />
                )}

                <div className="copy-text" />
              </div>

              <div className="col-md-8 banner-sec">
                <div
                  id="myCarousel"
                  className="carousel slide"
                  data-ride="carousel"
                  data-interval="3000"
                >
                  {/* Indicators */}
                  <ol className="carousel-indicators">
                    <li
                      data-target="#myCarousel"
                      data-slide-to={0}
                      className="active"
                    />
                    <li data-target="#myCarousel" data-slide-to={1} />
                    <li data-target="#myCarousel" data-slide-to={2} />
                  </ol>
                  {/* Wrapper for slides */}
                  <div className="carousel-inner">
                    <div className="item active">
                      <img
                        src="dist/slide/continent-country-destination-269850.jpg"
                        alt="Los Angeles"
                        style={{ width: "100%" }}
                      />
                      <div className="carousel-caption">
                        <h3>eDataMap </h3>
                        <p>User frinedly App </p>
                      </div>
                    </div>
                    <div className="item">
                      <img
                        src="dist/slide/dashboard-direction-iphone-2420230.jpg"
                        alt="Chicago"
                        style={{ width: "100%" }}
                      />
                      <div className="carousel-caption">
                        <h3>eDataMap </h3>
                        <p>Realtime Geospatial inventory</p>
                      </div>
                    </div>
                    <div className="item">
                      <img
                        src="dist/slide/blur-colors-folded-793088.jpg"
                        alt="New York"
                        style={{ width: "100%" }}
                      />
                      <div className="carousel-caption">
                        <h3>eDataMap </h3>
                        <p>Real-time visualization charts </p>
                      </div>
                    </div>
                  </div>
                  {/* Left and right controls */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default Login;
