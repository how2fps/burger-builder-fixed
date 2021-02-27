import React from "react";
import classes from "./Burger.css";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  const ingredientsArray = [];
  let ingredients;
  let ingredientsKey;
  for (const [key, value] of Object.entries(props.ingredients)) {
    let count = 0;
    for (let i = 0; i < value; i++) {
      count += 1;
      ingredientsKey = key + count;
      ingredientsArray.push([key, ingredientsKey]);
    }
  }
  if (ingredientsArray.length === 0) {
    ingredients = <p>Please input ingredients!</p>;
  } else {
    ingredients = ingredientsArray.map((e) => {
      return <BurgerIngredient type={e[0]} key={e[1]} />;
    });
  }
  // Object.entries(props.ingredients)
  //   .map(([ingredient, count]) =>
  //     Array.from({ length: count }).map((_, i) => (
  //       <BurgerIngredient type={ingredient} key={`${ingredient}${i}`} />
  //     ))
  //   )

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"bread-top"} />
      {ingredients}
      <BurgerIngredient type={"bread-bottom"} />
    </div>
  );
};

export default burger;
