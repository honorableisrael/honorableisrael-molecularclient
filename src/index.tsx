import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  HashRouter as Switch,
  Route,
  BrowserRouter,
  HashRouter,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import "./index.css"

const history = createBrowserHistory();

ReactDOM.render(
  <HashRouter>
    <App history={history} />
  </HashRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
