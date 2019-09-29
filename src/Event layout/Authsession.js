import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Redirect } from "react-router-dom";

const GET_USER_PROFILE = gql`
  query {
    GetUserProfile {
      username
      email
    }
  }
`;

const Authsession = conditionFun => Component => props => (
  <Query query={GET_USER_PROFILE}>
    {(data, loading) => {
      if (loading) return null;
      console.log("Biodun -", data);

      return conditionFun(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/notfound" />
      );
    }}
  </Query>
);

export default Authsession;
