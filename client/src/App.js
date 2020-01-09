import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import SellerRouter from "./components/seller/SellerRouter";

import "antd/dist/antd.css";
import StandardNotif from "./components/notif/StandardNotif";
import HomeRouter from "./components/home/HomeRouter";
import ReportRouter from "./components/reports/ReportRouter";
function App() {
  return (
    <Provider store={store}>
      <>
        <StandardNotif />
        <Router>
          <Switch>
            <Route path="/home" component={HomeRouter} />
            <Route path="/seller" component={SellerRouter} />
            <Route path="/reports" component={ReportRouter} />
            <Route>
              <Redirect to="/home" />
            </Route>
          </Switch>
        </Router>
      </>
    </Provider>
  );
}

export default App;
