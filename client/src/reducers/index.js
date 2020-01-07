import { combineReducers } from "redux";
import authReducers from "./authReducers";
import sellerReducers from "./sellerReducers";
import notifReducers from "./notifReducers";
import productReducers from "./productReducers";

export default combineReducers({
  auth: authReducers,
  seller: sellerReducers,
  notif: notifReducers,
  product: productReducers
});
