import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from "./components/UI/Spinner/Spinner";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const LazyCheckout = React.lazy(() => import("./containers/Checkout/Checkout"));
const LazyOrders = React.lazy(() => import("./containers/Orders/Orders"));
const LazyAuth = React.lazy(() => import("./containers/Auth/Auth"));

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignUp();
  }, []);

  let routes = (
    <Switch>
      <Route path="/authenticate" component={LazyAuth} />
      <Route path="/" component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/checkout" component={LazyCheckout} />
        <Route path="/orders" component={LazyOrders} />
        <Route path="/authenticate" component={LazyAuth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <React.Suspense fallback={<Spinner />}>{routes}</React.Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckLocalStorage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
