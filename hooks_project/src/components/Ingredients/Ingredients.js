import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";
const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  //Loading error and State Batching
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  //useEffect here to load data whenever the component mounts. AFter component rendering the first time,
  //when we setUserIngredients, it updates the state
  //Therefore, component render again => go into infinite loop.
  // to stop infinite loop, useEffect take the second argument is array dependency.
  //add an empty array like ComponentDidMount.

  // useEffect(() => {
  //   fetch("https://react-hooks-update.firebaseio.com/ingredients.json")
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       const loadedIngredients = [];
  //       for (const key in responseData) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount,
  //         });
  //         console.log(loadedIngredients);
  //       }
  //       setUserIngredients(loadedIngredients);
  //     });
  // }, []);

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", userIngredients);
  }, [userIngredients]);

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
    //fetch by default will send a GET req, need to specify the method: POST, Body: Json.stringify convert json format.
    //firebase will generate id for us.
    fetch("https://reacthooksection.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" },
    }) //fetch return data, update the ingredients when the fetch is finished
      .then((response) => {
        //right after POST req done
        setIsLoading(false);
        //extract the body to get the id

        return response.json();
      })
      // once response is parsed from response.json setUserIngredients update ingredients locally
      //responseData.name is something firebase generated.
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  //
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []);

  const removeIngredientHandler = (ingredientId) => {
    fetch(
      `https://reacthooksection.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        setUserIngredients((prevIngredients) =>
          prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
        );
      })
      .catch((error) => {
        // by default each error has message property
        setError("Something went wrong");
        setIsLoading(false);
      });
  };
  const clearError = () => {
    setError(null);
  };
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />
      {/* when components mount, filteredIngredienthandler register again, therefore
      it updates with new ingredients. Solution useCallback for filtered Ingredientshandler */}
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
