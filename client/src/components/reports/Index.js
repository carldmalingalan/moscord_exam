import React from "react";
import { Layout, Typography, Row, Col, Button } from "antd";
import ReportEachProduct from "./ReportEachProduct";
import { Link } from "react-router-dom";
import ReportPerSeller from "./ReportPerSeller";

const { Content } = Layout;
const { Title } = Typography;

function Index(props) {
  return (
    <Content className="content-canvas">
      <div className="main-canvas">
        <Row>
          <Col span={24}>
            <Link to="/home">
              <Button type="primary" icon="caret-left">
                Go back
              </Button>
            </Link>
            <Title level={2}>Product Reports</Title>
          </Col>
          <Col span={24}>
            <ReportEachProduct />
          </Col>
        </Row>
      </div>
      <div className="main-canvas">
        <Row>
          <Col span={24}>
            <Title level={2}>Seller Reports</Title>
          </Col>
          <Col span={24}>
            <ReportPerSeller />
          </Col>
        </Row>
      </div>
    </Content>
  );
}

export default Index;
