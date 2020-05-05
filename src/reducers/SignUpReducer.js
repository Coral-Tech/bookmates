import {
  SIGN_UP_ADD_USERNAME,
  SIGN_UP_ADD_PASSWORD,
  SIGN_UP_SUBMIT,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  PROFILE_SIGN_OUT,
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
    case SIGN_UP_ADD_USERNAME:
      return { ...state, username: action.payload };
    case SIGN_UP_ADD_PASSWORD:
      return { ...state, password: action.payload };
    case SIGN_UP_SUBMIT:
      return { ...state, loading: true, error: "" };
    case SIGN_UP_SUCCESS:
      return { ...state, user: action.payload, error: "", loading: false };
    case SIGN_UP_FAIL:
      return {
        ...state,
        error:
          "Error, please make sure your password has at least 6 characters",
        loading: false,
      };
    case PROFILE_SIGN_OUT:
      return { INITIAL_STATE };
    default:
      return state;
  }
};
