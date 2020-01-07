import React, { useEffect, useState } from "react";
import { Drawer, Form, Row, Col, Input, Button, Spin, Icon } from "antd";
import { connect } from "react-redux";
import { createProduct, listProduct } from "../../actions/products";

const { TextArea } = Input;

function AddProduct(props) {
  const {
    isVisible,
    setVisible,
    sellerId,
    createProduct,
    notif,
    listProduct
  } = props;
  const { getFieldDecorator, validateFields, resetFields } = props.form;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
    if (notif.status === "success") {
      resetFields();
      listProduct({ id: sellerId });
    }
  }, [notif]);

  function onSubmit(e) {
    e.preventDefault();
    validateFields((err, value) => {
      if (!err) {
        createProduct({ ...value, id: sellerId });
        setLoading(true);
      }
    });
  }
  return (
    <>
      <Drawer
        width={500}
        title="New product information"
        visible={isVisible}
        onClose={() => {
          setVisible(false);
        }}
      >
        <Spin
          spinning={loading}
          indicator={<Icon type="loading" />}
          tip="Creating product..."
        >
          <Form layout="vertical" onSubmit={onSubmit} hideRequiredMark>
            <Row>
              <Col span={24}>
                <Form.Item label="Product name">
                  {getFieldDecorator("name", {
                    rules: [
                      { required: true, message: "Product name is required." }
                    ]
                  })(<Input placeholder="Product name" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label="Description">
                  {getFieldDecorator("desc", {
                    rules: [
                      { required: true, message: "Description is required." }
                    ]
                  })(
                    <TextArea
                      placeholder="Description"
                      autoSize={{ minRows: 5, maxRows: 10 }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item label="Initial Stock">
                  {getFieldDecorator("totalIS", {
                    rules: [
                      { required: true, message: "Initial Stock is required." },
                      {
                        validator: (rule, value, callback) => {
                          if (value && isNaN(parseInt(value))) {
                            callback("Numeric characters are only allowed.");
                          }

                          if (parseInt(value) < 5) {
                            callback("Must be atleast 5 initial stock.");
                          }

                          callback();
                        }
                      }
                    ]
                  })(<Input placeholder="Stock" />)}
                </Form.Item>
              </Col>
            </Row>
            <div className="btn-container">
              <Button htmlType="submit" loading={loading} type="primary">
                Create
              </Button>
              <Button>Cancel</Button>
            </div>
          </Form>
        </Spin>
      </Drawer>
    </>
  );
}

const mapStateToProps = state => ({
  notif: state.notif
});

export default Form.create({ name: "product_create" })(
  connect(mapStateToProps, { createProduct, listProduct })(AddProduct)
);
