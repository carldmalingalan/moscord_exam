import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import { rpsReport } from "../../actions/reports";

function ReportPerSeller(props) {
  const { rps, rpsReport } = props;
  const [dt, setDT] = useState(rps);

  useEffect(() => {
    if (!dt.length) {
      rpsReport();
    }
  }, []);

  useEffect(() => {
    if (rps.length) {
      setDT(rps);
    }
  }, [rps]);

  const column = [
    { title: "Username", dataIndex: "username", key: "seller_name" },
    { title: "Fullname", dataIndex: "fullname", key: "fullname" },
    {
      title: "No. of products",
      dataIndex: "prodNo",
      key: "prodNo",
      render: val => <span>{val}</span>
    }
  ];
  const expandedColumn = [
    { title: "Product name", dataIndex: "name", key: "pName" },
    { title: "Picked Count<s>", dataIndex: "picked", key: "picked" }
  ];

  const expandedTable = record => {
    const { products } = record;
    return (
      <>
        {" "}
        <Table
          dataSource={products}
          columns={expandedColumn}
          pagination={{ pageSize: 5 }}
        />
      </>
    );
  };

  return (
    <>
      <Table
        size="small"
        pagination={{ pageSize: 5 }}
        expandedRowRender={expandedTable}
        columns={column}
        dataSource={dt}
      />
    </>
  );
}

const mapStateToProps = state => ({
  rps: state.report.rps
});

export default connect(mapStateToProps, { rpsReport })(ReportPerSeller);
