const initialState = {
  isAuth: null,
  token: localStorage.get("token") || null,
  users: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
