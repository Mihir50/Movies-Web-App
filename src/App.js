import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'; 

import SearchBar from "./components/SearchBar/SearchBar";
import Trending from "./components/Trending/Trending";
import Header from "./components/Header/Header";
import WatchList from "./components/WatchList/WatchList";
import Watched from "./components/Watched/Watched";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Scroll from "./components/Scroll/Scroll";

import "./index.css";

export default function App() {

  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Scroll showBelow={250} />
          <Header />
          <Switch>
            <Route exact path="/" component={Trending} />
            <Route exact path="/searchbar" component={SearchBar} />
            <Route exact path="/watchlist" component={WatchList} />
            <Route exact path="/watched" component={Watched} />
            <Route exact path="/movie/:id" component={MovieDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

