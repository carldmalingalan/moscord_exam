import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Index from "./Index";

function ReportRouter(props) {
  return (
    <>
      <div className="App">
        <div className="center-card">
          <div className="container">
            <Switch>
              <Route exact path="/reports" component={Index} />
              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportRouter;
