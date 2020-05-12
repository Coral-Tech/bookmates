import {
  FETCH_PERSONAL_BOOKS,
  FETCH_PERSONAL_SUCCESS,
  FETCH_PERSONAL_FAILURE,
  FETCH_PERSONAL_BOOKS_INDIVIDUAL,
  PROFILE_SIGN_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  all_books: null,
  loading: false,
  error: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PERSONAL_BOOKS:
      return { ...state, loading: true, error: "" };

    case FETCH_PERSONAL_SUCCESS:
      return {
        ...state,
        loading: false,
        all_books: action.payload,
      };

    case FETCH_PERSONAL_FAILURE:
      return { ...state, loading: false, error: "Error" };

    case PROFILE_SIGN_OUT:
      return { INITIAL_STATE };

    default:
      return state;
  }
};
