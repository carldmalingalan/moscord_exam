import React from "react";
import { Layout } from "antd";
import SearchBar from "./SearchBar";
import ItemsComp from "./ItemsComp";

const { Content } = Layout;

function index() {
  return (
    <>
      <Content className="content-canvas">
        <div className="main-canvas">
          <SearchBar />
        </div>
        <div className="main-canvas">
          <ItemsComp />
        </div>
      </Content>
    </>
  );
}

export default index;
