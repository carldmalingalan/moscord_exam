const initialState = {
  list: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ITEMS_LIST_SUCCESS":
      return {
        ...state,
        list: action.payload.data
      };
    case "ITEMS_LIST_ERROR":
      return {
        ...state,
        list: null
      };
    default:
      return state;
  }
};
