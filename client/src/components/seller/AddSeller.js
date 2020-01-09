import React, { useEffect, useState } from "react";
import { Drawer, Form, Row, Col, Input, Icon, Button, Spin } from "antd";
import MaskedInput from "antd-mask-input";
import { connect } from "react-redux";
import { sellerCreate, sellerList } from "../../actions/sellers";

function AddSeller(props) {
  const { drawerVisible, setVisible, sellerCreate, notif, sellerList } = props;
  const { getFieldDecorator, validateFields, resetFields } = props.form;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (notif.status) {
      setLoading(false);
    }

    if (notif.status === "success") {
      resetFields();
      sellerList();
    }
  }, [notif]);

  function onSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        sellerCreate(values);
      }
    });
  }

  return (
    <>
      <Drawer
        title="New user information"
        width={400}
        visible={drawerVisible}
        onClose={() => {
          resetFields();
          setVisible(false);
        }}
      >
        <Spin
          spinning={loading}
          tip="Creating new seller..."
          indicator={<Icon type="loading" style={{ fontSize: "30px" }} />}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={onSubmit}>
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label="Username">
                  {getFieldDecorator("username", {
                    rules: [
                      { required: true, message: "Username is required." }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba: (0,0,0,0.25)" }}
                        />
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label="Fullname">
                  {getFieldDecorator("fullname", {
                    rules: [
                      { required: true, message: "Fullname is required." }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="solution"
                          style={{ color: "rgba: (0,0,0,0.25)" }}
                        />
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label="Email">
                  {getFieldDecorator("email", {
                    rules: [
                      { required: true, message: "Email is required." },
                      { type: "email", message: "Invalid email format." }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="mail"
                          style={{ color: "rgba: (0,0,0,0.25)" }}
                        />
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label="Address">
                  {getFieldDecorator("address", {
                    rules: [{ required: true, message: "Address is required." }]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="home"
                          style={{ color: "rgba: (0,0,0,0.25)" }}
                        />
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label="Mobile No.">
                  {getFieldDecorator("mob", {
                    rules: [
                      { required: true, message: "Mobile no. is required." },
                      {
                        validator: (rule, value, callback) => {
                          if (
                            value &&
                            !/[+639]\d\d\d\d\d\d\d\d\d/.test(value)
                          ) {
                            callback(
                              "Invalid mobile no. follow format. (e.g +639292062632)"
                            );
                          }
                          callback();
                        }
                      }
                    ]
                  })(
                    <MaskedInput
                      prefix={
                        <Icon
                          type="mobile"
                          style={{ color: "rgba: (0,0,0,0.25)" }}
                        />
                      }
                      mask="+639111111111"
                      placeholder="+639#########"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label="Landline">
                  {getFieldDecorator("landline", {
                    rules: [
                      {
                        validator: (rule, value, callback) => {
                          if (value && !/[8]\d\d\d\-\d\d\d\d/.test(value)) {
                            callback(
                              "Invalid landline follow format. (e.g 8123-1233)"
                            );
                          }
                          callback();
                        }
                      }
                    ]
                  })(
                    <MaskedInput
                      prefix={
                        <Icon
                          type="phone"
                          style={{ color: "rgba: (0,0,0,0.25)" }}
                        />
                      }
                      mask="8111-1111"
                      placeholder="8###-####"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <div className="btn-container">
              <Button htmlType="submit" loading={loading} type="primary">
                Create
              </Button>
              <Button onClick={setVisible}>Cancel</Button>
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

export default Form.create({ name: "seller_add" })(
  connect(mapStateToProps, { sellerCreate, sellerList })(AddSeller)
);
