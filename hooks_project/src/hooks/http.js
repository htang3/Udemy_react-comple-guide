import { useReducer, useCallback } from "react";

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};
const httpReducer = (currhttpState, action) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case "RESPONSE":
      return {
        ...currhttpState,
        loading: false,
        data: action.response,
        extra: action.extra,
      };
    case "ERROR":
      return { loading: false, error: action.errorData };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("shold not be reached");
  }
};
//we dont want useHttp run all the time
const useHttp = () => {
  //share the logic here, useHttp will rerender for every cycle.
  const [httpState, dispatchHTTP] = useReducer(httpReducer, initialState);
  const clear = useCallback(
    () =>
      dispatchHTTP({
        type: "CLEAR",
      }),
    []
  );
  const sendRequest = useCallback(
    (url, method, body, reqExtra, reqIdentifier) => {
      dispatchHTTP({ type: "SEND", identifier: reqIdentifier });
      fetch(url, {
        method: method,
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      })
        //reponse is what data get back from sending request
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          //set response: responseData
          dispatchHTTP({
            type: "RESPONSE",
            response: responseData,
            extra: reqExtra,
          });
        })
        .catch((error) => {
          // by default each error has message property
          // setError("Something went wrong");
          // setIsLoading(false);
          dispatchHTTP({
            type: "ERROR",
            errorData: error.message,
          });
        });
    },
    []
  );
  //return array, object ....
  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier,
    clear: clear,
  };
};

export default useHttp;
