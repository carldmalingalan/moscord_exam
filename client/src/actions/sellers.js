import axios from "axios";

export const getConfig = getState => {
  const config = {
    headers: { "Content-type": "application/json" }
  };
  const token = getState().auth.token;
  if (token) {
    config.headers["x-auth-token"] = `Bearer ${token}`;
  }

  return config;
};

export const sellerList = () => (dispatch, getState) => {
  axios
    .get("/seller/list", null, getConfig(getState))
    .then(resData => {
      dispatch({ type: "SELLER_LIST_SUCCESS", payload: resData.data });
    })
    .catch(resErr => {
      dispatch({
        type: "SELLER_LIST_ERROR",
        payload: resErr.response.data || "Something went wrong"
      });
    });
};

export const sellerCreate = sellerObj => (dispatch, getState) => {
  axios
    .post("/seller/create", JSON.stringify(sellerObj), getConfig(getState))
    .then(resData => {
      dispatch({ type: "SELLER_CREATE_SUCCESS", payload: resData.data });
    })
    .catch(resErr => {
      console.log(resErr.response);
      dispatch({
        type: "SELLER_CREATE_ERROR",
        payload: resErr.response.data || "Something went wrong."
      });
    });
};

export const sellerDelete = sellerId => (dispatch, getState) => {
  axios
    .post("/seller/delete", JSON.stringify(sellerId), getConfig(getState))
    .then(resData => {
      dispatch({ type: "SELLER_DELETE_SUCCESS", payload: resData.data });
    })
    .catch(resErr => {
      dispatch({
        type: "SELLER_DELETE_ERROR",
        payload: resErr.response.data || "Something went wrong."
      });
    });
};

export const sellerFind = sellerId => (dispatch, getState) => {
  axios
    .post("/seller/find", JSON.stringify(sellerId), getConfig(getState))
    .then(resData => {
      dispatch({ type: "SELLER_FIND_SUCCESS", payload: resData.data });
    })
    .catch(resErr => {
      dispatch({
        type: "SELLER_FIND_ERROR",
        payload: resErr.response.data || "Something went wrong."
      });
    });
};

export const sellerUpdate = sellerObj => (dispatch, getState) => {
  axios
    .post("/seller/update", JSON.stringify(sellerObj), getConfig(getState))
    .then(resData => {
      dispatch({ type: "SELLER_UDPATE_SUCCESS", payload: resData.data });
      dispatch({
        type: "SELLER_UPDATE_CUSTOM_NOTIF",
        payload: { status: "success", data: "Updated successfully." }
      });
    })
    .catch(resErr => {
      dispatch({
        type: "SELLER_UPDATE_ERROR",
        payload: resErr.response.data || "Something went wrong."
      });
    });
};
