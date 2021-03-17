import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

function validateUsername(value) {
  let error;
  if (value === "admin") {
    error = "Nice try!";
  }
  if (value.length < 5) {
    error = "Longer plz";
  }
  if (value.length > 10) {
    error = "Shorter plz";
  }
  if (error) {
    return error;
  }
}
function validatePassword(value) {
  let error;
  if (value.length < 5) {
    error = "Password has to be longer than 5 characters.";
  }
  if (value.length > 10) {
    error = "Password has to be shorter than 10 characters.";
  }
  if (error) {
    return error;
  }
}

const Auth = (props) => {
  const [signUpMode, setSignUpMode] = useState(true);

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }
  }, []);

  const switchAuthModeHandler = () => {
    setSignUpMode(!signUpMode);
  };

  let form = (
    <React.Fragment>
      <Formik
        initialValues={{ email: "", password: "" }}
        validateOnBlur
        validateOnChange={false}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          props.login(data, setSubmitting, resetForm, signUpMode);
        }}>
        {({ values, isSubmitting }) => (
          <Form className={classes.Auth}>
            <h1>{signUpMode ? "Sign up" : "Log in"}</h1>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              validate={validateUsername}
            />
            <ErrorMessage className={classes.Error} name="email" />

            <Field
              name="password"
              type="password"
              placeholder="Password"
              validate={validatePassword}
            />
            <ErrorMessage name="password" />

            <div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>

            <pre style={{ textAlign: "left" }}>
              {JSON.stringify(values, null, 2)}
            </pre>
          </Form>
        )}
      </Formik>
      <button onClick={switchAuthModeHandler}>
        Switch to {signUpMode ? "login" : "sign up"}
      </button>
    </React.Fragment>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  let redirect = null;
  if (props.isAuth) {
    redirect = <Redirect to={props.authRedirectPath} />;
  }
  return (
    <div>
      {redirect}
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    isAuth: state.auth.idToken !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data, setSubmitting, resetForm, signUpMode) =>
      dispatch(actions.login(data, setSubmitting, resetForm, signUpMode)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirect("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
