import {
  FETCH_PROFILE_DATA,
  FETCH_PROFILE_SUCCESS,
  PROFILE_SIGN_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  user_data: null,
  loading: false,
  error: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PROFILE_DATA:
      return { ...state, loading: true, error: "" };

    case FETCH_PROFILE_SUCCESS:
      return { ...state, loading: false, user_data: action.payload };

    case PROFILE_SIGN_OUT:
      return { INITIAL_STATE };

    default:
      return state;
  }
};
