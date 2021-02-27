import React from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends React.Component {
  componentDidUpdate() {
    console.log("[Ordersummary ]Component did update");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingredientKey) => {
        return (
          <li key={ingredientKey}>
            <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span>
            : {this.props.ingredients[ingredientKey]}
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
          Total price is: <strong>${this.props.price}</strong>
        </p>
        <Button clicked={this.props.modalClosed} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.purchaseContinue} btnType="Success">
          CONFIRM
        </Button>
      </React.Fragment>
    );
  }
}

export default OrderSummary;
