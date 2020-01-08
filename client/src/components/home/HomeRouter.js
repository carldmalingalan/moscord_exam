import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Index from "./index";
import { Layout } from "antd";
import CustomHeader from "./CustomHeader";
import ShowAdded from "./ShowAdded";

function HomeRouter(props) {
  const { path } = props.match;
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Layout>
        <CustomHeader setVisible={setVisible} />
        <ShowAdded isVisible={visible} setVisible={setVisible} />
        <div className="App">
          <div className="center-card">
            <div className="container">
              <Switch>
                <Route path={`${path}`} component={Index} />
              </Switch>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default HomeRouter;
