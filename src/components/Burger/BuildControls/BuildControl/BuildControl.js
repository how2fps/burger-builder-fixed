import React from "react";
import classes from "./BuildControl.css";

const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <span className={classes.Label}>{props.label}</span>
      <button
        onClick={props.removeIngredient}
        className={classes.Less}
        disabled={props.disabled}
      >
        Less
      </button>
      <button onClick={props.addIngredient} className={classes.More}>
        More
      </button>
    </div>
  );
};

export default buildControl;
