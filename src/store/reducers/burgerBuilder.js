import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngA = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      const updatedIngsA = updateObject(state.ingredients, updatedIngA);
      const updatedSA = {
        ingredients: updatedIngsA,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };
      return updateObject(state, updatedSA);

    case actionTypes.REMOVE_INGREDIENT:
      const updatedIngS = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      };
      const updatedIngsS = updateObject(state.ingredients, updatedIngS);
      const updatedSS = {
        ingredients: updatedIngsS,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };
      return updateObject(state, updatedSS);

    case actionTypes.SET_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
        building: false,
      };
    }
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
