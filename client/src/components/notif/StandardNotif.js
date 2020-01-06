import React, { Fragment, useEffect } from "react";
import { notification, Typography } from "antd";
import { connect } from "react-redux";

const { Text } = Typography;

function setHTML(param) {
  if (Array.isArray(param)) {
    param = param.map(val => val.msg);
    return (
      <>
        <ul className="notif-popup">
          {param.map((val, index) => (
            <li key={index}>
              <Text type="danger" strong>
                {val}
              </Text>
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    return param;
  }
}

function StandardNotif(props) {
  const { notif } = props;
  useEffect(() => {
    const { status, data } = notif;
    if (status) {
      notification[status]({
        message: `${status.charAt(0).toUpperCase()}${status.slice(1)}`,
        description: setHTML(data)
      });
    }
  }, [notif]);
  return <Fragment></Fragment>;
}

const mapStateToProps = state => ({
  notif: state.notif
});

export default connect(mapStateToProps)(StandardNotif);
