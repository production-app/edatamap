import React, { Component } from "react";
import Header from "../Event layout/Header";
import Menu from "../Event layout/Menu";
import Layout from "./Layout";
import Footer from "../Event layout/Footer";

const MainChart = ({ session }) => {
  return (
    <React.Fragment>
      <Header session={session} />
      <Menu session={session} />
      <Layout />
      <Footer />
    </React.Fragment>
  );
};
export default MainChart;
