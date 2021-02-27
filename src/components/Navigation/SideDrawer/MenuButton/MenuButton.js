import React from "react";

import classes from "./MenuButton.css";

const MenuButton = (props) => {
  return (
    <button className={classes.MenuButton} onClick={props.clickHandler}>
      <i className="fas fa-bars"></i>
    </button>
  );
};

export default MenuButton;
