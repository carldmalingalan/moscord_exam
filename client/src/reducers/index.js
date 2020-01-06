import { combineReducers } from "redux";
import authReducers from "./authReducers";
import sellerReducers from "./sellerReducers";
import notifReducers from "./notifReducers";

export default combineReducers({
  auth: authReducers,
  seller: sellerReducers,
  notif: notifReducers
});
