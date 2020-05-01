import {
  FETCH_DISCOVER_BOOKS,
  FETCH_DISCOVER_SUCCESS,
  FETCH_DISCOVER_FAILURE,
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

    default:
      return state;
  }
};
