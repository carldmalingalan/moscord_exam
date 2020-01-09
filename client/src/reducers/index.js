import { combineReducers } from "redux";
import authReducers from "./authReducers";
import sellerReducers from "./sellerReducers";
import notifReducers from "./notifReducers";
import productReducers from "./productReducers";
import itemReducers from "./itemReducers";
import cartReducers from "./cartReducers";
import reportReducers from "./reportReducers";

export default combineReducers({
  auth: authReducers,
  seller: sellerReducers,
  notif: notifReducers,
  product: productReducers,
  item: itemReducers,
  cart: cartReducers,
  report: reportReducers
});
