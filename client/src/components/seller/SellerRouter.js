import React from "react";
import { Switch, Route } from "react-router-dom";

import Index from "./Index";
import SellerForm from "./SellerForm";

function SellerRouter(props) {
  const { path } = props.match;

  return (
    <>
      <div className="App">
        <div className="center-card">
          <div className="container">
            <Switch>
              <Route exact path={`${path}`} component={Index} />
              <Route path={`${path}/:id`} component={SellerForm} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerRouter;
