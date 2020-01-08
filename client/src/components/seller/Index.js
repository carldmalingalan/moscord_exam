import React, { useState } from "react";
import { Layout, Typography, Icon, Tooltip, Row, Col, Button } from "antd";
import SellerTable from "./SellerTable";
import AddSeller from "./AddSeller";
import { Link } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

function Index(props) {
  const { path } = props.match;
  const [addBtn, setAddBtn] = useState(false);
  return (
    <>
      <Content className="content-canvass">
        <div className="main-canvas">
          <Row gutter={16}>
            <Col span={12}>
              <Link to="/home" style={{ display: "inline-block" }}>
                <Button icon="caret-left" type="primary">
                  Go back
                </Button>
              </Link>
              <Title level={2}>Sellers</Title>
            </Col>
            <Col span={12}>
              <div style={{ float: "right" }}>
                <Tooltip placement="top" title="Add seller">
                  <Icon
                    type="plus-circle"
                    className="custom-btn"
                    style={{ fontSize: 40, margin: "20px 15px 0 0" }}
                    onClick={() => {
                      setAddBtn(prev => !prev);
                    }}
                  />
                </Tooltip>
              </div>
            </Col>
          </Row>
        </div>
        <div className="main-canvas">
          <AddSeller
            drawerVisible={addBtn}
            setVisible={() => {
              setAddBtn(prev => !prev);
            }}
          />
          <SellerTable _basePath={path} />
        </div>
      </Content>
    </>
  );
}

export default Index;
