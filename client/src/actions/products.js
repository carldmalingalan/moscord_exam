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

export const addQtyProduct = productObj => (dispatch, getState) => {
  axios
    .post("/product/add", JSON.stringify(productObj), getConfig(getState))
    .then(resData => {
      dispatch({ type: "PRODUCT_ADD_QTY_SUCCESS", payload: resData.data });
    })
    .catch(resErr => {
      dispatch({
        type: "PRODUCT_ADD_QTY_ERROR",
        payload: resErr.response.data || "Something went wrong."
      });
    });
};

export const updateProduct = productObj => (dispatch, getState) => {
  axios
    .post("/product/update", JSON.stringify(productObj), getConfig(getState))
    .then(resData => {
      dispatch({ type: "PRODUCT_UPDATE_SUCCESS", payload: resData.data });
    })
    .catch(resErr => {
      dispatch({
        type: "PRODUCT_UPDATE_ERROR",
        payload: resErr.response.data || "Something went wrong."
      });
    });
};

export const deleteProduct = productId => (dispatch, getState) => {
  axios
    .post("/product/delete", JSON.stringify(productId), getConfig(getState))
    .then(resData => {
      console.log(resData.data);
      dispatch({ type: "PRODUCT_DELETE_SUCCESS", payload: resData.data });
    })
    .catch(resErr => {
      dispatch({
        type: "PRODUCT_DELETE_ERROR",
        payload: resErr.response.data || "Something went wrong."
      });
    });
};

export const createProduct = productObj => (dispatch, getState) => {
  axios
    .post("/product/create", JSON.stringify(productObj), getConfig(getState))
    .then(resData => {
      dispatch({ type: "PRODUCT_CREATE_SUCCESS", payload: resData.data });
    })
    .catch(resErr => {
      dispatch({
        type: "PRODUCT_CREATE_ERROR",
        payload: resErr.response.data || "Something went wrong."
      });
    });
};

export const listProduct = productId => (dispatch, getState) => {
  axios
    .post("/product/list", JSON.stringify(productId), getConfig(getState))
    .then(resData => {
      dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: resData.data });
    })
    .catch(resErr => {
      dispatch({
        type: "PRODUCT_LIST_ERROR",
        payload: resErr.response.data || "Something went wrong."
      });
    });
};
