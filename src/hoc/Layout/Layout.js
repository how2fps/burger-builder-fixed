import React, { useState } from "react";
import { connect } from "react-redux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import classes from "./Layout.css";
const Layout = (props) => {
  let [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
    console.log("hi");
  };

  return (
    <React.Fragment>
      <SideDrawer
        showSideDrawer={showSideDrawer}
        clickHandler={sideDrawerToggleHandler}
        isAuth={props.isAuth}
      />
      <Toolbar
        sideDrawerOpenHandler={sideDrawerToggleHandler}
        isAuth={props.isAuth}
      />
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.idToken !== null,
  };
};

export default connect(mapStateToProps)(Layout);
