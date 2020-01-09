import axios from "axios";

export const repReport = () => dispatch => {
  axios
    .get("/report/rep")
    .then(resData => {
      dispatch({ type: "REP_SUCCESS", payload: resData.data });
    })
    .catch(resErr => {
      dispatch({
        type: "REP_ERROR",
        payload: resErr.response.data || "Something went wrong"
      });
    });
};

export const rpsReport = () => dispatch => {
  axios
    .get("/report/rps")
    .then(resData => {
      dispatch({ type: "RPS_SUCCESS", payload: resData.data });
    })
    .catch(resErr => {
      dispatch({
        type: "RPS_ERROR",
        payload: resErr.response.data || "Something went wrong"
      });
    });
};
