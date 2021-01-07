import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import user from "./reducers/user";
import Navigation from "./screens/Navigation";

const store = createStore(combineReducers({ user }));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
      </Router>
    </Provider>
  );
}

export default App;
