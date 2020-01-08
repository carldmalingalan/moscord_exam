import React, { useState } from "react";
import { Input, Row, Col, Icon, Tooltip } from "antd";
import { getItemsList, filterItemList } from "../../actions/home";
import { connect } from "react-redux";

function SearchBar(props) {
  const { getItemsList, filterItemList } = props;
  const [type, setType] = useState("");

  function onSubmit(e) {
    if (e.key === "Enter") {
      if (type) {
        filterItemList(type);
      }

      if (type === "") {
        getItemsList();
      }
    }
  }

  return (
    <>
      <Row gutter={8}>
        <Col span={24}>
          <Input
            placeholder="Search..."
            size="large"
            value={type}
            onChange={e => setType(e.target.value)}
            onKeyPress={onSubmit}
            suffix={
              <Tooltip placement="top" title="Search">
                <Icon
                  type="search"
                  style={{
                    fontSize: "25px,",
                    color: "rgba(0,0,0,0.25)",
                    cursor: "pointer"
                  }}
                />
              </Tooltip>
            }
          />
        </Col>
      </Row>
    </>
  );
}

export default connect(null, { filterItemList, getItemsList })(SearchBar);
