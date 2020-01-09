import React, { useEffect, useState } from "react";
import { Table, Icon, Tooltip } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { sellerList, sellerDelete } from "../../actions/sellers";

function SellerTable(props) {
  const { sellerList, sellerDelete, dataSource, notif, _basePath } = props;
  const [sellerDS, setDataSource] = useState(dataSource || null);
  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Fullname", dataIndex: "fullname", key: "fullname" },
    { title: "E-mail", dataIndex: "email", key: "email" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Action",
      dataIndex: "_id",
      key: "id",
      render: val => (
        <>
          <span style={{ marginRight: "5px" }}>
            <Tooltip key={val} placemen="top" title="Update seller">
              <Link to={`${_basePath}/${val}`}>
                <Icon
                  type="edit"
                  className="custom-btn"
                  style={{ fontSize: "20px" }}
                />
              </Link>
            </Tooltip>
          </span>
          <span>
            <Tooltip key={val} placement="top" title="Delete seller">
              <Icon
                key={val}
                type="close-circle"
                className="custom-btn"
                onClick={() => {
                  sellerDelete({ id: val });
                }}
                style={{ fontSize: "20px" }}
              />
            </Tooltip>
          </span>
        </>
      )
    }
  ];

  useEffect(() => {
    if (!dataSource) {
      sellerList();
    }
  }, [notif]);

  useEffect(() => {
    setDataSource(dataSource);
  }, [dataSource]);

  return (
    <>
      <Table columns={columns} dataSource={sellerDS} />
    </>
  );
}

const mapStateToProps = state => ({
  dataSource: state.seller.list,
  notif: state.notif
});

export default connect(mapStateToProps, { sellerList, sellerDelete })(
  SellerTable
);
