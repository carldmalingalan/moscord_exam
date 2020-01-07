const initialState = {
  status: null,
  data: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SELLER_CREATE_SUCCESS":
    case "SELLER_CREATE_ERROR":
    case "SELLER_DELETE_SUCCESS":
    case "SELLER_DELETE_ERROR":
    case "SELLER_FIND_ERROR":
    case "SELLER_LIST_ERROR":
    case "SELLER_UPDATE_ERROR":
    case "SELLER_UPDATE_CUSTOM_NOTIF":
    case "PRODUCT_CREATE_SUCCESS":
    case "PRODUCT_CREATE_ERROR":
    case "PRODUCT_LIST_ERROR":
    case "PRODUCT_DELETE_ERROR":
    case "PRODUCT_DELETE_SUCCESS":
    case "PRODUCT_UPDATE_ERROR":
    case "PRODUCT_UPDATE_SUCCESS":
    case "PRODUCT_ADD_QTY_ERROR":
    case "PRODUCT_ADD_QTY_SUCCESS":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
