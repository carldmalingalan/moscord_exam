import React, { useState, useEffect } from "react";
import { Table, Tooltip, Icon, Modal, Input, Button } from "antd";
import { connect } from "react-redux";
import {
  listProduct,
  updateProduct,
  deleteProduct,
  addQtyProduct
} from "../../actions/products";

const { TextArea } = Input;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function UpdateModal(props) {
  const { isVisible, setVisible, selectedProduct, updateFunc } = props;

  const [id, setId] = useState(null);
  const [newName, setNewName] = useState(null);
  const [newDesc, setNewDesc] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      const { _id, name, desc } = selectedProduct;
      setNewName(name);
      setNewDesc(desc);
      setId(_id);
    }
  }, [selectedProduct]);

  function changeSubmit() {
    updateFunc({ id, name: newName, desc: newDesc });
    setVisible(false);
  }

  return (
    <Modal
      visible={isVisible}
      title="Product update"
      onOk={changeSubmit}
      onCancel={() => {
        setVisible(false);
      }}
      footer={[
        <Button key="back" onClick={() => setVisible(false)}>
          Cancel
        </Button>,
        <Button type="primary" key="submit" onClick={changeSubmit}>
          Change
        </Button>
      ]}
    >
      <Input
        value={newName}
        placeholder="Product name"
        onChange={e => setNewName(e.target.value)}
      />
      <br />
      <br />
      <TextArea
        value={newDesc}
        onChange={e => setNewDesc(e.target.value)}
        placeholder="Description"
        autoSize={{ minRows: 5, maxRows: 10 }}
      />
    </Modal>
  );
}

function AddQty(props) {
  const { isVisible, setVisible, selectedProduct, addQtyFunc } = props;
  const [qty, setQty] = useState("");
  const [id, setId] = useState();

  function submitQty() {
    addQtyFunc({ id, count: qty });
    setQty("");
    setVisible(false);
  }

  useEffect(() => {
    if (selectedProduct) {
      const { _id } = selectedProduct;

      setId(_id);
    }
  }, [selectedProduct]);
  return (
    <Modal
      visible={isVisible}
      onCancel={() => setVisible(false)}
      onOk={submitQty}
      title="Add Quantity"
      footer={[
        <Button key="back" onClick={() => setVisible(false)}>
          Cancel
        </Button>,
        <Button type="primary" key="submit" onClick={submitQty}>
          Add
        </Button>
      ]}
    >
      <Input
        placeholder="Quantity"
        value={qty}
        onChange={e => setQty(e.target.value)}
      />
    </Modal>
  );
}

function SellerProductTbl(props) {
  const {
    listProduct,
    dataSource,
    sellerId,
    updateProduct,
    addQtyProduct,
    deleteProduct
  } = props;
  const [productDT, setProdDT] = useState(dataSource);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [QV, setQV] = useState(false);

  useEffect(() => {
    listProduct({ id: sellerId });
  }, []);

  useEffect(() => {
    setProdDT(dataSource);
  }, [dataSource]);

  function delProd(id) {
    deleteProduct({ id });
  }

  const columns = [
    { title: "ID", dataIndex: "_id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "desc", key: "description" },
    {
      title: "Quantity",
      dataIndex: "totalIS",
      key: "qty",
      render: qty => (
        <span style={{ float: "right" }}>{numberWithCommas(qty)}</span>
      )
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "act_id",
      render: sID => (
        <>
          <span key={sID}>
            <Tooltip placement="top" title="Add quantity">
              <Icon
                type="plus-circle"
                style={{ fontSize: "20px" }}
                className="custom-btn"
                onClick={() => {
                  setSelected(sID);
                  setQV(true);
                }}
              />
            </Tooltip>
          </span>
          <span style={{ marginRight: "4px" }}>
            {" "}
            <Tooltip placement="top" title="Update info.">
              <Icon
                type="question-circle"
                style={{ fontSize: "20px" }}
                className="custom-btn"
                onClick={() => {
                  setSelected(sID);
                  setVisible(true);
                }}
              />
            </Tooltip>
          </span>
          <span>
            <Tooltip placement="top" title="Delete">
              <Icon
                type="close-circle"
                style={{ fontSize: "20px" }}
                className="custom-btn"
                onClick={() => {
                  delProd(sID);
                }}
              />
            </Tooltip>
          </span>
        </>
      )
    }
  ];
  return (
    <>
      <Table
        size="small"
        columns={columns}
        dataSource={productDT}
        pagination={{ pageSize: 10 }}
      />
      <UpdateModal
        isVisible={visible}
        selectedProduct={
          productDT && productDT.filter(value => value._id === selected)[0]
        }
        setVisible={setVisible}
        updateFunc={updateProduct}
      />
      <AddQty
        isVisible={QV}
        selectedProduct={
          productDT && productDT.filter(value => value._id === selected)[0]
        }
        setVisible={setQV}
        addQtyFunc={addQtyProduct}
      />
    </>
  );
}

const mapStateToProps = state => ({
  dataSource: state.product.list,
  notif: state.notif
});

export default connect(mapStateToProps, {
  listProduct,
  updateProduct,
  deleteProduct,
  addQtyProduct
})(SellerProductTbl);
