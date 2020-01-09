import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Drawer,
  Descriptions,
  Divider,
  Button,
  Spin,
  Typography,
  Icon
} from "antd";
import moment from "moment";
import { proceedItem } from "../../actions/home";

const { Title } = Typography;
function ShowAdded(props) {
  const { itemsIn, isVisible, setVisible, proceedItem } = props;
  const [items, setItems] = useState(itemsIn);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemsIn) {
      setItems(itemsIn);
    }
  }, [itemsIn]);

  function proceed() {
    setLoading(true);
    setTimeout(() => {
      proceedItem();
      setLoading(false);
    }, 2500);
  }

  return (
    <Drawer
      width={500}
      title="Item list"
      visible={isVisible}
      onClose={() => {
        setVisible(false);
      }}
    >
      <Spin
        spinning={loading}
        tip="Proceeding to check out..."
        indicator={<Icon type="loading" />}
      >
        {" "}
        {!items.length ? (
          <Title key="title" level={2}>
            Nothing to show...
          </Title>
        ) : null}
        {items.length > 0 &&
          itemsIn.map(val => (
            <>
              <Descriptions key={val._id}>
                <Descriptions.Item label={"Name"}>{val.name}</Descriptions.Item>
                <Descriptions.Item label={"Quantity"}>
                  {val.qty}
                </Descriptions.Item>
                <Descriptions.Item label={"Date Added"}>
                  {moment(val.dateAdded).fromNow()}
                </Descriptions.Item>
                <Descriptions.Item label={"Description"} span={3}>
                  {val.desc}
                </Descriptions.Item>
              </Descriptions>
              <Divider />
            </>
          ))}
        {items.length ? (
          <div key="btn" className="btn-container">
            <Button
              type="primary"
              onClick={() => {
                proceed();
              }}
              loading={loading}
            >
              Proceed
            </Button>
            <Button
              onClick={() => {
                setVisible(false);
              }}
            >
              Cancel
            </Button>
          </div>
        ) : null}
      </Spin>
    </Drawer>
  );
}

const mapStateToProps = state => ({
  itemsIn: state.cart.itemsInside
});

export default connect(mapStateToProps, { proceedItem })(ShowAdded);
