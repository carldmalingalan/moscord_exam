const initialState = {
  rep: [],
  rps: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "REP_SUCCESS":
      return {
        ...state,
        rep: action.payload.data
      };
    case "RPS_SUCCESS":
      return {
        ...state,
        rps: action.payload.data
      };
    case "REP_ERROR":
      return {
        ...state,
        rep: []
      };
    case "RPS_ERROR":
      return {
        ...state,
        rps: []
      };
    default:
      return state;
  }
};
