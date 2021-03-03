import React from "react";
import axios from "../../axios-orders";

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ id: key, ...res.data[key] });
        }
        console.log(fetchedOrders);
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }
  render() {
    let orders;
    orders = this.state.orders.map((orders) => {
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
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
