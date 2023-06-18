import * as Types from "../constants/ClearDataTypes";
import setAuthToken from "../../utils/setAuthToken";

const clearReduxData = () => (dispatch) => {
  dispatch({
    type: Types.CLEAR_DATA,
  });
  setAuthToken("");
};
export default clearReduxData;