import React from "react";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(
    (ingredientKey) => {
      return (
        <li key={ingredientKey}>
          <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span>:{" "}
          {props.ingredients[ingredientKey]}
        </li>
      );
    }
  );
  return (
    <React.Fragment>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout?</p>
      <p>
        Total price is: <strong>${props.price}</strong>
      </p>
      <Button clicked={props.modalClosed} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.purchaseContinue} btnType="Success">
        CONFIRM
      </Button>
    </React.Fragment>
  );
};

export default OrderSummary;
