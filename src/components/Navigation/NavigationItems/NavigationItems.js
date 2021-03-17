import React from "react";

import classes from "./NavigationItems.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem to="/" exact>
        Burger Builder
      </NavigationItem>
      {props.isAuth ? (
        <React.Fragment>
          <NavigationItem to="/orders">Orders</NavigationItem>
          <NavigationItem to="/logout">Logout</NavigationItem>
        </React.Fragment>
      ) : (
        <NavigationItem to="/authenticate">Authenticate</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
