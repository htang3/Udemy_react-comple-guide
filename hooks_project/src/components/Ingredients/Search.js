import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";
import useHttp from "../../hooks/http";
import ErrorModal from "../UI/ErrorModal";

const Search = React.memo((props) => {
  //use object destructuring because function is object, extract onLoadIngredients
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  //useEffect will execute AFTER user enter something in Search
  useEffect(() => {
    const timer = setTimeout(() => {
      //set a check, enteredFilter is what user enter 500ms ago
      //if the enteredFilter is the same as the entered value 500ms ago, use Ref
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        sendRequest(
          "https://reacthooksection.firebaseio.com/ingredients.json" + query,
          "GET"
        );
        // fetch(
        //   "https://reacthooksection.firebaseio.com/ingredients.json" + query
        // )
        //   .then((response) => response.json())
        //   .then((responseData) => {
        //     const loadedIngredients = [];
        //     for (const key in responseData) {
        //       loadedIngredients.push({
        //         id: key,
        //         title: responseData[key].title,
        //         amount: responseData[key].amount,
        //       });
        //     }
        //     //props.onLoadIngredients(loadedIngredients)
        //     //we have props as a dependency, however, if we pass props into second arguments array,
        //     //component will change whenever something change to props
        //     //therefore, we we want to pass onLoadIngredients
        //     //to do it, use OBject destructuring above with props.
        //     onLoadIngredients(loadedIngredients);
        //   });
      }
    }, 500);
    //cleaning up function before useEffect run NEXT time
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, sendRequest, inputRef]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      onLoadIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, onLoadIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
