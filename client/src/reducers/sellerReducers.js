const initialState = {
  list: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SELLER_LIST_SUCCESS":
      return { ...state, list: action.payload.data };
    case "SELLER_LIST_ERROR":
      return { ...state, list: null };
    default:
      return state;
  }
};
