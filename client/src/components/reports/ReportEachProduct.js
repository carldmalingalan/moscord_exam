import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import { repReport } from "../../actions/reports";

function ReportEachProduct(props) {
  const { rep, repReport } = props;
  const [dt, setDT] = useState(rep);

  useEffect(() => {
    repReport();
  }, []);

  useEffect(() => {
    if (rep.length) {
      setDT(rep);
    }
  }, [rep]);

  const column = [
    { title: "Product Name", dataIndex: "name", key: "prod_name" },
    { title: "Picked Count<s>", dataIndex: "picked", key: "pick_count" }
  ];

  return (
    <>
      <Table
        size="small"
        pagination={{ pageSize: 5 }}
        columns={column}
        dataSource={dt}
      />
    </>
  );
}

const mapStateToProps = state => ({
  rep: state.report.rep
});

export default connect(mapStateToProps, { repReport })(ReportEachProduct);
