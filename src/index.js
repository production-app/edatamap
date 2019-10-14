import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GoogleMaps from "./GoogleMaps Layout/googleM_body";
import withSession from "./Session/withSession";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Echarts from "./Charts/eCharts";
import Login from "./Login/Login";
import Unathorization from "./Event layout/Unathorization";
import Charts from "./Charts/MainChart";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const client = new ApolloClient({
  uri: "https://edmserver.herokuapp.com/graphql",
  //"http://localhost:8888/graphql",
  // "https://edmserver.herokuapp.com/graphql",
  //uri: "http://d36073e0.ngrok.io/graphql",

  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    //console.log(headers["authorization"]);
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
    //console.log(request.headers["authorization"]);
  },
  onError: ({ networkError, graphQLErrors }) => {
    if (networkError) {
      console.log(networkError);
    }
    if (graphQLErrors) {
      console.log(graphQLErrors);
    }
  }
});

//const isAuthenticated = () => {
//  const token = localStorage.getItem("token");
//try {
//decode(token);
// } catch (err) {
// return false;
//}
//return true;
//};

//const PrivateRoute = ({ component: Component, ...rest }) => {
// return (
//  <Route
//// {...rest}
//    render={props =>
//  isAuthenticated() ? (
//  <Component {...props} />
// ) : (
// <Redirect
//   to={{
//     pathname: "/login"
//   }}
//  />
//  )
//  }
//    />
//  );
//};
//localStorage.getItem("token")
const x = localStorage.getItem("token");
//const x = "B";

const Root = ({ refetch, session }) => (
  <Router>
    <React.Fragment>
      <Switch>
        {x ? (
          <Route path="/" render={() => <App session={session} />} exact />
        ) : (
          <Route path="/login" component={Login} />
        )}
        <Route path="/map" render={() => <GoogleMaps session={session} />} />
        <Route path="/chart" component={Echarts} />
        <Route path="/eChart" render={() => <Charts session={session} />} />

        <Route path="/login" render={() => <Login refetch={refetch} />} />

        {!x && <Redirect from="/" to="/login" />}
      </Switch>
    </React.Fragment>
  </Router>
);

const Rootsession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Rootsession />
  </ApolloProvider>,
  document.getElementById("root")
);
