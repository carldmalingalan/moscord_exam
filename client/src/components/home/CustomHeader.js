import React, { useState, useEffect } from "react";
import { Layout, Badge, Icon, Button } from "antd";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
const { Header } = Layout;

function CustomHeader(props) {
  const { itemCount, setVisible } = props;
  const [count, setCount] = useState(itemCount);

  useEffect(() => {
    setCount(itemCount);
  }, [itemCount]);

  return (
    <>
      <Header
        style={{
          backgroundColor: "#FFF"
        }}
      >
        <div style={{ float: "left" }}>
          <NavLink to="/seller">
            <Button type="primary" ghost>
              Seller
            </Button>
          </NavLink>
          <NavLink to="/seller" style={{ marginLeft: "5px" }}>
            <Button type="danger" ghost>
              Reports
            </Button>
          </NavLink>
        </div>
        <div style={{ float: "right" }}>
          <span style={{ cursor: "pointer" }}>
            <Badge count={count && count.length}>
              <Icon
                type="shopping-cart"
                style={{ fontSize: "25px" }}
                onClick={() => {
                  setVisible(prev => !prev);
                }}
              />
            </Badge>
          </span>
        </div>
      </Header>
    </>
  );
}

const mapStateToProps = state => ({
  itemCount: state.cart.itemsInside
});

export default connect(mapStateToProps)(CustomHeader);
