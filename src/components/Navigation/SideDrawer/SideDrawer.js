import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from "./SideDrawer.modules.css";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.showSideDrawer) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <React.Fragment>
      <Backdrop show={props.showSideDrawer} clickHandler={props.clickHandler} />
      <div className={attachedClasses.join(" ")} onClick={props.clickHandler}>
        <Logo />
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;
