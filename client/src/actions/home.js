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

export const getItemsList = () => (dispatch, getState) => {
  axios
    .get("/home/list", null, getConfig(getState))
    .then(resData => {
      dispatch({ type: "ITEMS_LIST_SUCCESS", payload: resData.data });
    })
    .catch(resErr => {
      dispatch({
        type: "ITEMS_LIST_ERROR",
        payload: resErr.response.data || "Something went wrong."
      });
    });
};

export const filterItemList = queryStr => (dispatch, getState) => {
  axios
    .post("/home/list", JSON.stringify({ queryStr }), getConfig(getState))
    .then(resData => {
      dispatch({ type: "ITEMS_LIST_SUCCESS", payload: resData.data });
    })
    .catch(resErr => {
      dispatch({
        type: "ITEMS_LIST_ERROR",
        payload: resErr.response.data || "Something went wrong."
      });
    });
};

export const addItemToCart = itemObj => (dispatch, getState) => {
  axios
    .post("/home/add", JSON.stringify(itemObj), getConfig(getState))
    .then(resData => {
      dispatch({
        type: "ADD_ITEM_CART_SUCCESS_NOTIF",
        payload: { status: "success", data: "Item successfully added." }
      });
      dispatch({ type: "ADD_ITEM_CART_SUCCESS", payload: resData.data });
    })
    .catch(resErr => {
      dispatch({
        type: "ADD_ITEM_CART_ERROR",
        payload: resErr.response.data || "Something went wrong."
      });
    });
};

export const proceedItem = () => dispatch => {
  dispatch({
    type: "PROCEED_ITEM_CART_SUCCESS",
    payload: {
      status: "success",
      data: "You've successfully checkout all of you items."
    }
  });
};
