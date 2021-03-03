import React from "react";

import classes from "./NavigationItems.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem to="/" exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem to="/orders">Orders</NavigationItem>
    </ul>
  );
};

export default navigationItems;
