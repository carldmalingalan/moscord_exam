const initialState = {
  isAuth: null,
  token: localStorage.getItem("Token") || null,
  users: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
