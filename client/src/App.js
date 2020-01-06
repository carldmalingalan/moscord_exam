import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "antd/dist/antd.css";
function App() {
  return (
    <Provider store={store}>
      <>
        <Router>
          <Switch>{/* <Route path="/seller" component={} /> */}</Switch>
        </Router>
      </>
    </Provider>
  );
}

export default App;
