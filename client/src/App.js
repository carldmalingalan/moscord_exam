import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SellerRouter from "./components/seller/SellerRouter";

import "antd/dist/antd.css";
import StandardNotif from "./components/notif/StandardNotif";
function App() {
  return (
    <Provider store={store}>
      <>
        <StandardNotif />
        <Router>
          <Switch>
            <Route path="/seller" component={SellerRouter}></Route>
          </Switch>
        </Router>
      </>
    </Provider>
  );
}

export default App;
