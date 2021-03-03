import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../../axios-orders";
import classes from "./ContactData.css";

import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";

class ContactData extends React.Component {
  state = {
    orderForm: {
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
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    let order = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    order = {
      ingredients: this.props.ings,
      price: this.props.totalPrice,
      orderData: formData,
    };
    this.setState({ loading: true });
    axios
      .post("/orders.json", order)
      .then(() => {
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  };

  checkValidity(value, rules) {
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
  }

  inputChangedHandler(event, inputIdentifier) {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let e in updatedOrderForm) {
      formIsValid = updatedOrderForm[e].valid && formIsValid;
    }
    console.log(formIsValid);
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({ id: key, config: this.state.orderForm[key] });
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
                changed={(event) =>
                  this.inputChangedHandler(event, formElement.id)
                }
                touched={formElement.config.touched}
              />
            );
          })}
          <Button
            disabled={!this.state.formIsValid}
            clicked={this.orderHandler}
            btnType="Success">
            ORDER
          </Button>
        </form>
      </React.Fragment>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

export default connect(mapStateToProps)(withRouter(ContactData));
