import * as Types from "../constants/UserTypes";
import setAuthToken from "../../utils/setAuthToken";
import axios from "../../utils/axios";
import jwt_decode from "jwt-decode";
import alertAction from "./alertAction";
import enableBtn from "./enableBtnAction";
import clearAction from "./clearAction";

export const userRegister = (user, navigate) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .post("/user/register", user)
    .then((response) => {
      let decoded = jwt_decode(response.data.token);
      dispatch({
        type: Types.REGISTER,
        payload: {
          user: decoded,
        },
      });
      navigate.push("/");
      dispatch(enableBtn(true));
      setAuthToken(response.data.token);
      localStorage.setItem("token", response.data.token);
    })
    .catch((err) => {
      dispatch({
        type: Types.REGISTER_ERROR,
        payload: {
          error: err.response.data,
        },
      });
      dispatch(enableBtn(true));
      dispatch(alertAction(err.response.data));
    });
};

export const userLogin = (user, navigate) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .post("/user/login", user)
    .then((response) => {
      var decoded = jwt_decode(response.data.token);
      dispatch({
        type: Types.LOGIN_USER,
        payload: {
          user: decoded,
        },
      });
      navigate.push("/");
      dispatch(enableBtn(true));
      setAuthToken(response.data.token);
      localStorage.setItem("token", response.data.token);
    })
    .catch((err) => {
      dispatch({
        type: Types.LOGIN_USER_ERROR,
        payload: {
          error: err.response?.data,
        },
      });
      dispatch(enableBtn(true));
      dispatch(alertAction(err.response?.data));
    });
};

export const isAuthenticate = () => (dispatch) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  if (token) {
    var decoded = jwt_decode(token);
    var dateNow = new Date();
    if (decoded.exp * 1000 < dateNow.getTime()) {
      dispatch({
        type: Types.ISAUTHENTICATE,
        payload: {
          isAuthenticate: false,
        },
      });
      typeof window !== "undefined" && localStorage.removeItem("token");
    } else {
      dispatch({
        type: Types.ISAUTHENTICATE,
        payload: {
          isAuthenticate: true,
        },
      });
      dispatch(getMyAccount());
    }
  } else {
    dispatch({
      type: Types.ISAUTHENTICATE,
      payload: {
        isAuthenticate: false,
      },
    });
    setAuthToken("");
  }
};

export const getMyAccount = () => (dispatch) => {
  axios
    .get("/user/getmyaccount")
    .then((res) => {
      dispatch({
        type: Types.GET_MYACCOUT,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_MYACCOUT,
        payload: err.response?.data,
      });
      dispatch(alertAction(err.response?.data));
    });
};

export const logout = (navigate) => (dispatch) => {
  dispatch({
    type: Types.LOGOUT_USER,
    payload: {
      isAuthenticate: false,
    },
  });
  dispatch(clearAction());
  typeof window !== "undefined" && localStorage.removeItem("token");
  setAuthToken("");
  navigate.push("/login");
};
