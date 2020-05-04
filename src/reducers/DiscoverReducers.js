import {
  FETCH_DISCOVER_BOOKS,
  FETCH_DISCOVER_SUCCESS,
  FETCH_DISCOVER_FAILURE,
  PROFILE_SIGN_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DISCOVER_BOOKS:
      return { ...state, loading: true, error: "" };

    case FETCH_DISCOVER_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case FETCH_DISCOVER_FAILURE:
      return { ...state, loading: false, error: "Error" };

    case PROFILE_SIGN_OUT:
      return { INITIAL_STATE };

    default:
      return state;
  }
};
