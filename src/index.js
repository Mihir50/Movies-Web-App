import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { GlobalState } from "./Global/Context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <GlobalState>
    <App />
  </GlobalState>,
  rootElement
);
