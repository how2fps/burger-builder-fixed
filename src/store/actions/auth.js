import * as actionTypes from "./actionTypes";
import axios from "axios";

export const login = (data, setSubmitting, resetForm, signUpMode) => {
  return (dispatch) => {
    setSubmitting(true);
    dispatch(loginStart());
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQLVFZRlcHcZNmx8PRjIOxvaZVHzlYks4";
    if (!signUpMode) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQLVFZRlcHcZNmx8PRjIOxvaZVHzlYks4";
    }
    const authData = {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    };
    axios
      .post(url, authData)
      .then((res) => {
        const expirationDate = new Date(
          new Date().getTime() + Number(res.data.expiresIn) * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(checkAuthTimeout(res.data.expiresIn));
        dispatch(loginSuccess(res.data.idToken, res.data.localId));
        setSubmitting(false);
        resetForm();
      })
      .catch((err) => {
        dispatch(loginFail());
        setSubmitting(false);
      });
  };
};

export const loginSuccess = (idToken, userId) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    idToken: idToken,
    userId: userId,
  };
};

export const loginFail = () => {
  return {
    type: actionTypes.LOGIN_FAIL,
  };
};

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const setAuthRedirect = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT,
    path: path,
  };
};

export const authCheckLocalStorage = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(loginSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
