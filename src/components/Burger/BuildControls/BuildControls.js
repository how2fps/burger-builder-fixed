import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  {
    label: "Salad",
    type: "salad",
  },
  {
    label: "Bacon",
    type: "bacon",
  },
  {
    label: "Cheese",
    type: "cheese",
  },
  {
    label: "Meat",
    type: "meat",
  },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current price: <strong>${props.price}</strong>
      </p>
      {controls.map((e) => {
        return (
          <BuildControl
            removeIngredient={() => props.removeIngredient(e.type)}
            addIngredient={() => props.addIngredient(e.type)}
            key={e.label}
            label={e.label}
            disabled={props.disabledInfo[e.type]}
          />
        );
      })}
      <button
        onClick={props.purchaseHandler}
        disabled={!props.purchasable}
        className={classes.OrderButton}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
