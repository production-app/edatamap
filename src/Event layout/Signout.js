import React from "react";
import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";

const Signout = ({ history }) => {
  const handleSignOut = (client, history) => {
    localStorage.setItem("token", "");
    localStorage.setItem("bio", "");
    console.log(client);
    client.resetStore();
    history.push("/login");
  };

  return (
    <ApolloConsumer>
      {client => {
        return (
          <React.Fragment>
            <button
              className="btn btn-primary active"
              onClick={() => handleSignOut(client, history)}
            >
              {" "}
              Sign Out {"  "}
              <span className="glyphicon glyphicon-log-out"> </span>{" "}
            </button>
          </React.Fragment>
        );
      }}
    </ApolloConsumer>
  );
};
export default withRouter(Signout);
