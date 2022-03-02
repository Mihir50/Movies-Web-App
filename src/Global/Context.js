import React, { createContext, useEffect, useReducer } from "react";
import reducer from "./AppReducer";

const initialState = {
  watchList: localStorage.getItem("watchList")
    ? JSON.parse(localStorage.getItem("watchList"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};

const MovieContext = createContext(initialState);

const GlobalState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(state.watchList));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  const addToWatchList = (movie) => {
    dispatch({ type: "ADD_TO_WATCHLIST", payload: movie });
  };

  const addToWatched = (movie) => {
    dispatch({ type: "ADD_TO_WATCHED", payload: movie });
  };

  const removeFromWatchList = (movie) => {
    dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: movie });
  };

  const removeFromWatched = (movie) => {
    dispatch({ type: "REMOVE_FROM_WATCHED", payload: movie });
  };

  const moveToWatched = (movie) => {
    dispatch({ type: "MOVE_TO_WATCHED", payload: movie });
  };


  return (
    <MovieContext.Provider
      value={{
        watchList: state.watchList,
        watched: state.watched,
        addToWatchList,
        addToWatched,
        removeFromWatchList,
        removeFromWatched,
        moveToWatched
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export { GlobalState, MovieContext };
