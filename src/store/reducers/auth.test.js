import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      idToken: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectUrl: "/",
    });
  });

  it("should store token on login", () => {
    expect(
      reducer(
        {
          idToken: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectUrl: "/",
        },
        {
          type: actionTypes.LOGIN_SUCCESS,
          idToken: "some idToken",
          userId: "some userId",
        }
      )
    ).toEqual({
      idToken: "some idToken",
      userId: "some userId",
      error: false,
      loading: false,
      authRedirectUrl: "/",
    });
  });
});
