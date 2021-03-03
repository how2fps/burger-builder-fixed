import React from "react";
import classes from "./Order.css";
const order = (props) => (
  <div className={classes.Order}>
    <p>Ingredients: {props.ingredients} </p>
    <p>
      Price: <strong>${props.price}</strong>
    </p>
  </div>
);

export default order;
