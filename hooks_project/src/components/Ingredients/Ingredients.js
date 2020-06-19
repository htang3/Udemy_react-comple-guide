import React, { useReducer, useMemo, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";
const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};
//MOVED BELOW LOGIC TO hooks/http.js
// const httpReducer = (currhttpState, action) => {
//   switch (action.type) {
//     case "SEND":
//       return { loading: true, error: null };
//     case "RESPONSE":
//       return { ...currhttpState, loading: false };
//     case "ERROR":
//       return { loading: false, error: action.errorData };
//     case "CLEAR":
//       return { ...currhttpState, error: null };
//     default:
//       throw new Error("shold not be reached");
//   }
// };
const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  //const [userIngredients, setUserIngredients] = useState([]);
  //MOVED httpState and dispatchHttp into hooks/http.js
  //useHttp() does not send request, it just sets up our state and function.
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifier,
    clear,
  } = useHttp();
  //Loading error and State Batching
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");

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

  //sharing data
  useEffect(() => {
    if (!isLoading && reqIdentifier === "REMOVE_INGREDIENT") {
      dispatch({ type: "DELETE", id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === "ADD_INGREDIENT") {
      dispatch({
        type: "ADD",
        ingredient: {
          id: data.name,
          ...reqExtra,
        },
      });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const addIngredientHandler = useCallback(
    (ingredient) => {
      sendRequest(
        "https://reacthooksection.firebaseio.com/ingredients.json",
        "POST",
        JSON.stringify(ingredient),
        ingredient,
        "ADD_INGREDIENT"
      );

      //setIsLoading(true);
      // dispatchHTTP({
      //   type: "SEND",
      // });

      //fetch by default will send a GET req, need to specify the method: POST, Body: Json.stringify convert json format.
      //firebase will generate id for us.
      // fetch("https://reacthooksection.firebaseio.com/ingredients.json", {
      //   method: "POST",
      //   body: JSON.stringify(ingredient),
      //   headers: { "Content-Type": "application/json" },
      // }) //fetch return data, update the ingredients when the fetch is finished
      //   .then((response) => {
      //right after POST req done
      // setIsLoading(false);
      // dispatchHTTP({
      //   type: "RESPONSE",
      // });
      //extract the body to get the id

      //   return response.json();
      // })
      // once response is parsed from response.json setUserIngredients update ingredients locally
      //responseData.name is something firebase generated.
      // .then((responseData) => {
      // setUserIngredients((prevIngredients) => [
      //   ...prevIngredients,
      //   { id: responseData.name, ...ingredient },
      // ]);
      //       dispatch({
      //         type: "ADD",
      //         ingredient: {
      //           id: responseData.name,
      //           ...ingredient,
      //         },
      //       });
      //     });
      // }, []);
    },
    [sendRequest]
  );

  //
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    //setUserIngredients(filteredIngredients);
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const removeIngredientHandler = useCallback(
    (ingredientId) => {
      // dispatchHTTP({ type: "SEND" });
      sendRequest(
        `https://reacthooksection.firebaseio.com/ingredients/${ingredientId}.json`,
        "DELETE",
        null,
        ingredientId,
        "REMOVE_INGREDIENT"
      );
    },
    [sendRequest]
  );

  // const clearError = useCallback(() => {
  //   //dispatchHTTP({ type: "CLEAR" });
  // }, []);

  //useMemo
  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />
      {/* when components mount, filteredIngredienthandler register again, therefore
      it updates with new ingredients. Solution useCallback for filtered Ingredientshandler */}
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
