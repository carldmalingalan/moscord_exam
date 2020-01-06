import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { connect } from "react-redux";

import { sellerList } from "../../actions/sellers";

const columns = [
  { title: "Username", dataIndex: "username", key: "username" },
  { title: "Fullname", dataIndex: "fullname", key: "fullname" },
  { title: "E-mail", dataIndex: "email", key: "email" },
  { title: "Address", dataIndex: "address", key: "address" },
  { title: "No. of Items", dataIndex: "countItems", key: "countItems" },
  { title: "Action", dataIndex: "_id", key: "_id" }
];

function SellerTable(props) {
  const { sellerList, dataSource } = props;
  const [sellerDS, setDataSource] = useState(dataSource || null);

  useEffect(() => {
    if (!dataSource) {
      sellerList();
    }
  }, []);

  useEffect(() => {
    console.log(dataSource);
    setDataSource(dataSource);
  }, [dataSource]);

  return (
    <>
      <Table columns={columns} dataSource={sellerDS} />
    </>
  );
}

const mapStateToProps = state => ({
  dataSource: state.seller.list
});

export default connect(mapStateToProps, { sellerList })(SellerTable);
