import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";

export const BurgerBuilder = (props) => {
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredient();
  }, []);

  const purchaseHandler = () => {
    if (props.isAuth) {
      setIsPurchasing(true);
    } else {
      props.onSetAuthRedirect("/checkout");
      props.history.push("/authenticate");
    }
  };

  const updatePurchaseState = () => {
    const sum = Object.keys(props.ings)
      .map((ingredientName) => {
        return props.ings[ingredientName];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseCancelHandler = () => {
    setIsPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...props.ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] === 0;
  }

  let burger = props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

  let orderSummary = null;

  if (props.ings) {
    burger = (
      <React.Fragment>
        <Burger ingredients={props.ings} />

        <BuildControls
          isAuth={props.isAuth}
          price={props.totalPrice.toFixed(2)}
          removeIngredient={props.onIngredientRemoved}
          addIngredient={props.onIngredientAdded}
          disabledInfo={disabledInfo}
          purchasable={updatePurchaseState()}
          purchaseHandler={purchaseHandler}
        />
      </React.Fragment>
    );

    orderSummary = (
      <OrderSummary
        price={props.totalPrice.toFixed(2)}
        ingredients={props.ings}
        modalClosed={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler}
      />
    );
  }

  return (
    <React.Fragment>
      <Modal show={isPurchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
