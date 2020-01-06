import React, { useState } from "react";
import { Layout, Typography, Icon, Tooltip, Row, Col } from "antd";
import SellerTable from "./SellerTable";
import AddSeller from "./AddSeller";

const { Content } = Layout;
const { Title } = Typography;

function Index() {
  const [addBtn, setAddBtn] = useState(false);
  return (
    <>
      <Content className="content-canvass">
        <div className="main-canvas">
          <Row gutter={16}>
            <Col span={12}>
              <Title level={2}>Sellers</Title>
            </Col>
            <Col span={12}>
              <div style={{ float: "right" }}>
                <Tooltip placement="top" title="Add seller">
                  <Icon
                    type="plus-circle"
                    className="custom-btn"
                    style={{ fontSize: 40 }}
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
          <SellerTable />
        </div>
      </Content>
    </>
  );
}

export default Index;
