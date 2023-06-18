import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./reducers/userReducer";
import alertReducer from "./reducers/alertReducer";
import btnReducer from "./reducers/enableBtnReducer";
import orderReducer from "./reducers/orderReducer";
import categoryReducer from "./reducers/categoryReducer";
import modalReducer from "./reducers/modalReducer";
import productReducer from "./reducers/productReducer";
import subProReducer from "./reducers/subProReducer";
import thunk from "redux-thunk";

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);
const rootReducer = combineReducers({
  userReducer,
  alertReducer,
  btnReducer,
  orderReducer,
  categoryReducer,
  modalReducer,
  productReducer,
  subProReducer,
});

const store = createStore(rootReducer, composedEnhancers);

export default store;
