import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { withRouter, NavLink } from "react-router-dom";

const SIGUP_USER = gql`
  mutation($username: String, $email: String, $password: String) {
    SignupUser(username: $username, password: $password, email: $email) {
      token
    }
  }
`;

const initalState = {
  username: "",
  email: "",
  password: "",
  txtPasswordconfirm: "",
  formError: {
    email: "",
    password: "",
    username: "",
    password2: ""
  }
};

const emailRegex = RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

class Signup extends Component {
  state = { ...initalState };

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "dist/js/content.js";
    script.async = true;
    document.body.appendChild(script);
    // console.log("Biodun");
  }

  clearState = () => {
    this.setState({ ...initalState });
  };

  submitHandler = (event, SignupUser) => {
    event.preventDefault();

    SignupUser().then(async ({ data }) => {
      //console.log(data);
      localStorage.setItem("token", data.SignupUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push("/login");
    });
  };

  validateForm = () => {
    const {
      username,
      password,
      email,
      txtPasswordconfirm,
      formError
    } = this.state;

    if (
      this.state.formError.email ||
      this.state.formError.username ||
      this.state.formError.password
    ) {
      return true;
    }

    const isInValid =
      !username || !password || !email || password !== txtPasswordconfirm;

    return isInValid;
  };

  handlerChange = e => {
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
      case "username":
        formError.username =
          value.length > 2 ? "" : "Minimum of 3 characters required";
        break;
      case "password":
        formError.password =
          value.length < 6 ? "Minimum of 6 characters required" : "";
        break;
      case "txtPasswordconfirm":
        formError.password2 =
          value.length < 3 ||
          this.state.password !== this.state.txtPasswordconfirm
            ? ""
            : "Please Not Match";
        break;
      default:
        break;
    }

    this.setState({ formError, [name]: value });
    // console.log(name, " - ", value);
  };

  render() {
    const {
      username,
      password,
      email,
      txtPasswordconfirm,
      formError
    } = this.state;

    return (
      <React.Fragment>
        <Mutation
          mutation={SIGUP_USER}
          variables={{ username, password, email }}
        >
          {(SignupUser, { data, loading, error }) => {
            return (
              <React.Fragment>
                <form
                  className="login-form"
                  onSubmit={event => this.submitHandler(event, SignupUser)}
                >
                  {data && (
                    <div
                      className="alert alert-success alert-dismissible"
                      style={{ marginTop: "-24px" }}
                    >
                      <NavLink
                        to="/login"
                        className="close"
                        data-dismiss="alert modal"
                        aria-label="close"
                        // data-dismiss="modal"
                      >
                        x
                      </NavLink>
                      <strong>
                        {" "}
                        <span
                          className="glyphicon glyphicon-ok
"
                        />{" "}
                      </strong>
                      <b>Thank you </b> <em>! </em> Login into your Mail to{" "}
                      {"  "}
                      <b>CONFIRM</b> your email{" "}
                      <img
                        className="m_2338821669216609622center m_2338821669216609622fixedwidth CToWUd a6T"
                        border={0}
                        src="https://ci4.googleusercontent.com/proxy/FpdwewvXsvtpBvFcE8v2fzMo7H5kwG_kg8VbAjUDk9obrdUx5hu3GNwScPcjMDXLY5la-T7znnnLv9OBgc2jonL-yt_5UjCbT9Zbw7_DLxa2dciwRHDwPaYUaINiNaE=s0-d-e1-ft#https://beefree.io/wp-content/themes/bee2017/img/beepro-signup/bee-plane.gif"
                        alt="Image"
                        title="Image"
                        style={{
                          /* textDecoration: 'none', */ border: 0,
                          height: "auto",
                          width: "23%",
                          maxWidth: 180,
                          display: "block",
                          margin: "-19px 0px -37px 59px"
                        }}
                        width={180}
                        tabIndex={0}
                      />{" "}
                    </div>
                  )}
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
                        <span className="glyphicon glyphicon-remove-sign" />{" "}
                        {""}
                        {error.graphQLErrors.map(x => x.message) ||
                          "Invalid Details"}{" "}
                        {"  "}
                      </strong>
                    </div>
                  )}
                  <div
                    className={
                      formError.username
                        ? "input-group has-error"
                        : "input-group "
                    }
                  >
                    <span className="input-group-addon">
                      <span className="glyphicon glyphicon-user" />
                    </span>
                    <input
                      type="text"
                      id="txt_firstCapital"
                      className="form-control"
                      placeholder="Username"
                      name="username"
                      onChange={this.handlerChange}
                      value={username}
                    />
                  </div>
                  {formError.username.length > 0 && (
                    <span className="errorMessage">
                      {" "}
                      <i
                        className="fa fa-exclamation-triangle"
                        aria-hidden="true"
                      >
                        {"   "}
                        {formError.username}
                      </i>
                    </span>
                  )}
                  <br />
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
                      placeholder="Email"
                      name="email"
                      onChange={this.handlerChange}
                      value={email}
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
                      onChange={this.handlerChange}
                      value={password}
                      placeholder="Password"
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
                      {" "}
                      <i
                        className="fa fa-exclamation-triangle"
                        aria-hidden="true"
                      >
                        {"   "}
                        {formError.password}
                      </i>
                    </span>
                  )}
                  <br />
                  <div className="input-group">
                    <span className="input-group-addon">
                      <span className="glyphicon glyphicon-lock" />
                    </span>
                    <input
                      id="passwords"
                      type="password"
                      className="form-control"
                      name="txtPasswordconfirm"
                      onChange={this.handlerChange}
                      value={txtPasswordconfirm}
                      placeholder="Confirm Password"
                    />
                    <span id="showPassword" className="input-group-btn">
                      <button
                        className="btn btn-default reveal"
                        type="button"
                        id="buttons"
                      >
                        <i
                          className="glyphicon glyphicon-eye-open"
                          id="eyeIcon"
                        />
                      </button>
                    </span>
                  </div>
                  {formError.password2.length > 0 && (
                    <span className="errorMessage">
                      {" "}
                      <i
                        className="fa fa-exclamation-triangle"
                        aria-hidden="true"
                      >
                        {"   "}
                        {formError.password2}
                      </i>
                    </span>
                  )}
                  <br />
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

export default withRouter(Signup);
