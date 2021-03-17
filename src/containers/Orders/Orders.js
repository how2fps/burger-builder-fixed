import React, { useEffect } from "react";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = (props) => {
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, []);
  let orders = <Spinner />;

  if (!props.loading) {
    orders = props.orders.map((orders) => {
      let ingredients = "";
      for (let key in orders.ingredients) {
        ingredients +=
          key[0].toUpperCase() +
          key.substring(1) +
          ": " +
          orders.ingredients[key].toString() +
          ", ";
      }
      return (
        <Order key={orders.id} ingredients={ingredients} price={orders.price} />
      );
    });
  }
  return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    purchased: state.order.purchased,
    token: state.auth.idToken,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
