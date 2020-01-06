const initialState = {
  status: null,
  data: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SELLER_CREATE_SUCCESS":
    case "SELLER_CREATE_ERROR":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
