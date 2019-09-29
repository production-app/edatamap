import React from "react";
import Header from "./Event layout/Header";
import Menu from "./Event layout/Menu";
import Footer from "./Event layout/Footer";
import Body from "./Event layout/Body";

const App = ({ session }) => {
  return (
    <React.Fragment>
      <Header session={session} />
      <Menu session={session} />
      <Body />
      <Footer />
    </React.Fragment>
  );
};

export default App;
