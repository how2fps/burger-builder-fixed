import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
  const checkoutCancelled = () => {
    props.history.goBack();
  };
  const checkoutContinued = () => {
    props.history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;
  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <React.Fragment>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          onCheckoutCancelled={checkoutCancelled}
          onCheckoutContinued={checkoutContinued}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </React.Fragment>
    );
  }
  return <div>{summary}</div>;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default withRouter(connect(mapStateToProps)(Checkout));
