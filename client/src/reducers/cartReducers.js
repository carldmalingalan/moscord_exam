const initialState = {
  itemsInside: JSON.parse(localStorage.getItem("obscure")) || []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM_CART_SUCCESS":
      localStorage.setItem(
        "obscure",
        JSON.stringify([...state.itemsInside, action.payload.data])
      );
      return {
        ...state,
        itemsInside: [...state.itemsInside, action.payload.data]
      };
    case "PROCEED_ITEM_CART_SUCCESS":
      localStorage.removeItem("obscure");
      return {
        ...state,
        itemsInside: []
      };
    default:
      return state;
  }
};
