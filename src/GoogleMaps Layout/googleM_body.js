import React, { Component } from "react";
import Header from "../Event layout/Header";
import Menu from "../Event layout/Menu";
import GoogleBody from "./GoogleBody";
import Footer from "../Event layout/Footer";

const googleM_body = ({ session }) => {
  return (
    <React.Fragment>
      <Header session={session} />
      <Menu session={session} />
      <GoogleBody />
      <Footer />
    </React.Fragment>
  );
};

export default googleM_body;
