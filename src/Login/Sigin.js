import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";

const SIGIN_USER = gql`
  mutation($email: String, $password: String) {
    SiginUser(password: $password, email: $email) {
      token
      email
    }
  }
`;

const initalState = {
  email: "",
  password: "",
  formError: {
    email: "",
    password: ""
  }
};

const emailRegex = RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

class Sigin extends Component {
  state = { ...initalState };

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "dist/js/content.js";
    script.async = true;
    document.body.appendChild(script);
  }

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;

    let formError = this.state.formError;

    switch (name) {
      case "email":
        formError.email =
          emailRegex.test(value) && value.length > 0
            ? ""
            : "Invalid Email Address";
        break;
      case "password":
        formError.password =
          value.length < 6 ? "Minimum of 6 characters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formError, [name]: value }, () => console.log(this.state));
    // console.log(name, " - ", value);
  };

  clearState = () => {
    this.setState({ ...initalState });
  };

  submitHandeler = (event, SiginUser) => {
    event.preventDefault();
    SiginUser().then(async ({ data }) => {
      console.log(data);
      localStorage.setItem("token", data.SiginUser.token);
      await this.props.refetch();
      this.clearState();
      // this.props.history.push("/");
    });
    // console.log(this.props.refetch);
  };

  validateForm = () => {
    const { password, email } = this.state;

    const isInValid = !password || !email;

    return isInValid;
  };

  render() {
    const { email, password, formError } = this.state;
    return (
      <React.Fragment>
        <Mutation mutation={SIGIN_USER} variables={{ email, password }}>
          {(SiginUser, { data, loading, error }) => {
            return (
              <React.Fragment>
                <form
                  className="login-form"
                  onSubmit={event => this.submitHandeler(event, SiginUser)}
                >
                  {error && (
                    <div className="alert alert-danger alert-dismissible">
                      <a
                        href="/login"
                        className="close"
                        data-dismiss="alert modal"
                        aria-label="close"
                        // data-dismiss="modal"
                      >
                        x
                      </a>
                      <strong>
                        {" "}
                        <span
                          className="fa fa-exclamation-triangle
"
                        />
                        {"   "}
                        {error.graphQLErrors.map(x => x.message) ||
                          "Invalid Details"}
                      </strong>{" "}
                    </div>
                  )}
                  {data && (
                    <div className="alert alert-success alert-dismissible">
                      <a
                        href="/"
                        className="close"
                        data-dismiss="alert modal"
                        aria-label="close"
                        // data-dismiss="modal"
                      >
                        x
                      </a>
                      <strong>
                        {" "}
                        <span
                          className="glyphicon glyphicon-ok
"
                        />{" "}
                        Successful !. Please the click Close button to login
                      </strong>{" "}
                    </div>
                  )}
                  <div
                    className={
                      formError.email ? "input-group has-error" : "input-group "
                    }
                  >
                    <span className="input-group-addon">
                      <i className="fa fa-envelope" />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </div>
                  {formError.email.length > 0 && (
                    <span className="errorMessage">
                      {" "}
                      <i
                        className="fa fa-exclamation-triangle"
                        aria-hidden="true"
                      >
                        {"   "}
                        {formError.email}
                      </i>
                    </span>
                  )}
                  <br />
                  <div
                    className={
                      formError.password
                        ? "input-group has-error"
                        : "input-group "
                    }
                  >
                    <span className="input-group-addon">
                      <span className="glyphicon glyphicon-lock" />
                    </span>
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                      value={password}
                    />

                    <span id="showPassword" className="input-group-btn">
                      <button
                        className="btn btn-default reveal"
                        type="button"
                        id="button"
                      >
                        <i
                          className="glyphicon glyphicon-eye-open"
                          id="eyeIcon"
                        />
                      </button>
                    </span>
                  </div>
                  {formError.password.length > 0 && (
                    <span className="errorMessage">
                      <i
                        className="fa fa-exclamation-triangle"
                        aria-hidden="true"
                      >
                        {"   "}
                        {formError.password}
                      </i>
                    </span>
                  )}
                  <hr />
                  <div className="form-check">
                    <button
                      type="submit"
                      className="btn btn-login float-right"
                      title={
                        this.validateForm()
                          ? "Button disabled due to no input on the form"
                          : "Enabled !"
                      }
                      disabled={loading || this.validateForm()}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </React.Fragment>
            );
          }}
        </Mutation>
      </React.Fragment>
    );
  }
}
export default withRouter(Sigin);
