const initialState = {
  list: null,
  solo: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SELLER_LIST_SUCCESS":
      return { ...state, list: action.payload.data };
    case "SELLER_FIND_SUCCESS":
    case "SELLER_UPDATE_SUCCESS":
      return { ...state, solo: action.payload.data };
    case "SELLER_LIST_ERROR":
      return { ...state, list: null };
    case "SELLER_FIND_ERROR":
    case "SELLER_UPDATE_ERROR":
      return { ...state, solo: null };
    default:
      return state;
  }
};
