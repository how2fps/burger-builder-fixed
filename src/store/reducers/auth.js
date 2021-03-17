import * as actionTypes from "../actions/actionTypes";

const initialState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectUrl: "/",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        idToken: action.idToken,
        userId: action.userId,
        error: false,
        loading: false,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case actionTypes.LOGOUT: {
      return {
        ...state,
        userId: null,
        idToken: null,
      };
    }
    case actionTypes.SET_AUTH_REDIRECT: {
      return {
        ...state,
        authRedirectUrl: action.path,
      };
    }
    default:
      return state;
  }
};

export default reducer;
