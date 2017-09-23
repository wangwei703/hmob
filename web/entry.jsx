// import "utils";

import App from './app';
import React from "react";
import ReactDOM from "react-dom";

window.DPR=window.devicePixelRatio||1;
ReactDOM.render(
  <App />,
  document.querySelector(".main")
);
