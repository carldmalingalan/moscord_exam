import React, { useState, useEffect } from "react";
import {
  Layout,
  Descriptions,
  Typography,
  Button,
  Tooltip,
  Icon,
  Row,
  Col
} from "antd";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { sellerFind, sellerUpdate } from "../../actions/sellers";
import SellerProductTbl from "./SellerProductTbl";
import AddProduct from "./AddProduct";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function SellerForm(props) {
  const { id } = props.match.params;

  const { sellerFind, info, notif, sellerUpdate } = props;
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [mob, setMob] = useState("");
  const [email, setEmail] = useState("");
  const [landline, setLandline] = useState("");
  const [visible, setVisible] = useState(false);

  function onSave() {
    const sellerObj = { id, username, fullname, address, mob, email, landline };
    sellerUpdate(sellerObj);
  }

  useEffect(() => {
    if (notif.status === "error") {
      sellerFind({ id });
    }
  }, [notif]);

  useEffect(() => {
    sellerFind({ id });
  }, []);

  useEffect(() => {
    if (info) {
      const { username, fullname, email, address, contact } = info;
      const { mob, landline } = contact;
      setUsername(username);
      setFullname(fullname);
      setAddress(address);
      setEmail(email);
      setMob(mob);
      setLandline(landline || "N/A");
    }
  }, [info]);

  return !id ? (
    <Redirect to="/seller" />
  ) : (
    <>
      <Content className="content-canvas">
        <div className="main-canvas">
          <div style={{ paddingBottom: "15px" }}>
            <Link to="/seller">
              <Button type="primary" icon="caret-left">
                Go back
              </Button>
            </Link>
          </div>

          <Descriptions title="Seller Information" layout="vertical">
            <Descriptions.Item label="Username">
              <Paragraph editable={{ onChange: str => setUsername(str) }}>
                {username}
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Fullname">
              <Paragraph editable={{ onChange: str => setFullname(str) }}>
                {fullname}
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <Paragraph editable={{ onChange: str => setEmail(str) }}>
                {email}
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Address" span={3}>
              <Paragraph editable={{ onChange: str => setAddress(str) }}>
                {address}
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Mobile No.">
              <Paragraph editable={{ onChange: str => setMob(str) }}>
                {mob}
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Landline" span={2}>
              <Paragraph editable={{ onChange: str => setLandline(str) }}>
                {landline}
              </Paragraph>
            </Descriptions.Item>
          </Descriptions>
          <Button
            type="danger"
            onClick={() => {
              onSave();
            }}
          >
            Save
          </Button>
        </div>

        <div className="main-canvas">
          <Row>
            <Col span={12}>
              <Title level={4}>Seller Products</Title>
            </Col>
            <Col span={12}>
              <div style={{ float: "right" }}>
                <Tooltip placement="top" title="Add product">
                  <Icon
                    type="plus-circle"
                    className="custom-btn"
                    style={{ fontSize: 30 }}
                    onClick={() => setVisible(prev => !prev)}
                  />
                </Tooltip>
              </div>
            </Col>
          </Row>

          <SellerProductTbl sellerId={id} />
          <AddProduct
            isVisible={visible}
            setVisible={setVisible}
            sellerId={id}
          />
        </div>
      </Content>
    </>
  );
}

const mapStateToProps = state => ({
  notif: state.notif,
  info: state.seller.solo
});

export default connect(mapStateToProps, { sellerFind, sellerUpdate })(
  SellerForm
);
