import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./reducers/userReducer";
import alertReducer from "./reducers/alertReducer";
import btnReducer from "./reducers/enableBtnReducer";
import bookReducer from "./reducers/bookReducer";
import orderReducer from "./reducers/orderReducer";
import thunk from "redux-thunk";

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);
const rootReducer = combineReducers({
  userReducer,
  alertReducer,
  btnReducer,
  bookReducer,
  orderReducer,
});

const store = createStore(rootReducer, composedEnhancers);

export default store;
