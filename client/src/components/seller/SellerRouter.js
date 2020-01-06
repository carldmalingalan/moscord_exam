import React from "react";
import { Switch, Route } from "react-router-dom";

import Index from "./Index";

function SellerRouter(props) {
  const { path } = props.match;

  return (
    <>
      <div className="App">
        <div className="center-card">
          <div className="container">
            <Switch>
              <Route path={`${path}`}>
                <Index />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerRouter;
