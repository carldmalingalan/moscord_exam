import React, { useState, useEffect } from "react";
import { getItemsList, addItemToCart } from "../../actions/home";
import { Card, Row, Col, Icon, Popover, Input, Button, message } from "antd";
import { connect } from "react-redux";

const { Meta } = Card;

function ItemsComp(props) {
  const { theList, getItemsList, addItemToCart, notif } = props;
  const [localList, setLL] = useState(theList);
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState("");

  function addToCart() {
    if (isNaN(parseInt(qty)) || parseInt(qty) <= 0) {
      message.error("Quantity must be a numeric and be greater than 0.");
    } else {
      addItemToCart({ id: selected, qty });
    }
  }

  useEffect(() => {
    getItemsList();
  }, []);

  useEffect(() => {
    setLL(theList);
  }, [theList]);

  useEffect(() => {
    if (notif.status === "success") {
      setSelected(null);
      setQty("");
    }
  }, [notif]);

  return (
    <>
      <Row gutter={8}>
        {localList &&
          localList.map(value => (
            <Col span={6} key={value._id}>
              <Card
                hoverable
                style={{ width: "auto", margin: "5px 10px" }}
                actions={[
                  <Popover
                    trigger="click"
                    onClose={() => {
                      setSelected(null);
                      setQty(0);
                    }}
                    content={
                      <>
                        {" "}
                        <span>
                          {" "}
                          <Input
                            placeholder="Quantity"
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                          />{" "}
                          <br />
                          <br />{" "}
                          <Button type="primary" onClick={addToCart} block>
                            Add to cart
                          </Button>{" "}
                        </span>{" "}
                      </>
                    }
                  >
                    <Icon
                      type="plus-circle"
                      onClick={() => {
                        setSelected(value._id);
                      }}
                    />
                  </Popover>
                ]}
              >
                <Meta title={value.name} description={value.desc} />
              </Card>
            </Col>
          ))}
        {localList && !localList.length ? <div></div> : null}
      </Row>
    </>
  );
}

const mapStateToProps = state => ({
  notif: state.notif,
  theList: state.item.list
});

export default connect(mapStateToProps, { getItemsList, addItemToCart })(
  ItemsComp
);
