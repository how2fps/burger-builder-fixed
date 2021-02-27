import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import MenuButton from "../SideDrawer/MenuButton/MenuButton";

import classes from "./Toolbar.modules.css";

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <MenuButton clickHandler={props.sideDrawerOpenHandler} />
      <Logo />
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
