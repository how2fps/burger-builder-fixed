import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../../axios-orders";
import classes from "./ContactData.css";
import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Zip code",
      },
      value: "",
      validation: {
        required: true,
        maxLength: 6,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your email",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMode: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      valid: true,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    let order = {
      ingredients: props.ings,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId,
    };
    props.onOrderBurger(order, props.token);
  };

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules?.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules?.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules?.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let e in updatedOrderForm) {
      formIsValid = updatedOrderForm[e].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(true);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({ id: key, config: orderForm[key] });
  }
  let form = (
    <React.Fragment>
      <h4>Enter your Contact Data</h4>
      <form>
        {formElementsArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              changed={(event) => inputChangedHandler(event, formElement.id)}
              touched={formElement.config.touched}
            />
          );
        })}
        <Button
          disabled={!formIsValid}
          clicked={orderHandler}
          btnType="Success">
          ORDER
        </Button>
      </form>
    </React.Fragment>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return <div className={classes.ContactData}>{form}</div>;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => {
      dispatch(actions.purchaseBurger(orderData, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withErrorHandler(ContactData, axios)));
