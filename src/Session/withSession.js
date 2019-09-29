import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const GET_USER_PROFILE = gql`
  query {
    GetUserProfile {
      username
      email
    }
  }
`;

const withSession = Component => props => (
  <Query query={GET_USER_PROFILE}>
    {({ data, loading, refetch }) => {
      //localStorage.setItem("data", { GetUserProfile });
      if (loading) return null;
      // console.log({  });
      localStorage.setItem("data", { GET_USER_PROFILE });
      //console.log(refetch);

      return <Component {...props} refetch={refetch} session={data} />;
    }}
  </Query>
);

export default withSession;
