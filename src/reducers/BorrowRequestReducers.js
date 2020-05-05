import {
  FETCH_BORROWED_REQUESTS,
  FETCH_BORROWED_REQUESTS_SUCCESS,
  REMOVE_BORROW_REQUEST_SUBMIT,
  BORROW_REQUEST_SUBMIT,
  PROFILE_SIGN_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  borrowed_books_request: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BORROWED_REQUESTS:
      return { ...state, loading: true };
    case REMOVE_BORROW_REQUEST_SUBMIT:
      return { ...state, loading: true };
    case BORROW_REQUEST_SUBMIT:
      return { ...state, loading: true };
    case FETCH_BORROWED_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        borrowed_books_request: action.payload,
      };
    case PROFILE_SIGN_OUT:
      return { INITIAL_STATE };

    default:
      return state;
  }
};
