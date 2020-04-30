import {
  LOG_IN_ADD_USERNAME,
  LOG_IN_ADD_PASSWORD,
  LOG_IN_SUBMIT,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
} from "../actions/types";

const INITIAL_STATE = {
  username: "",
  password: "",
  user: null,
  error: "",
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN_ADD_USERNAME:
      return { ...state, username: action.payload };
    case LOG_IN_ADD_PASSWORD:
      return { ...state, password: action.payload };
    case LOG_IN_SUBMIT:
      return { ...state, loading: true, error: "" };
    case LOG_IN_SUCCESS:
      return { ...state, user: action.payload, error: "", loading: false };
    case LOG_IN_FAIL:
      return { ...state, error: "Error", loading: false };
    default:
      return state;
  }
};
