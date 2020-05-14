import {
  FETCH_BORROWED_REQUESTS,
  FETCH_BORROWED_REQUESTS_SUCCESS,
  FETCH_PICKUP_BOOKS,
  FETCH_PICKUP_BOOKS_SUCCESS,
  FETCH_BORROWED_BOOKS,
  FETCH_BORROWED_BOOKS_SUCCESS,
  PROFILE_SIGN_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  borrowed_books_request: null,
  borrowed_books_request_loading: false,

  pickup_books: null,
  pickup_books_loading: false,

  borrowed_books: null,
  borrowed_books_loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BORROWED_REQUESTS:
      return { ...state, borrowed_books_request_loading: true };

    case FETCH_BORROWED_REQUESTS_SUCCESS:
      return {
        ...state,
        borrowed_books_request_loading: false,
        borrowed_books_request: action.payload,
      };

    case FETCH_PICKUP_BOOKS:
      return { ...state, pickup_books_loading: true };

    case FETCH_PICKUP_BOOKS_SUCCESS:
      return {
        ...state,
        pickup_books_loading: false,
        pickup_books: action.payload,
      };

    case FETCH_BORROWED_BOOKS:
      return { ...state, borrowed_books_loading: true };

    case FETCH_BORROWED_BOOKS_SUCCESS:
      return {
        ...state,
        borrowed_books_loading: false,
        borrowed_books: action.payload,
      };

    case PROFILE_SIGN_OUT:
      return { INITIAL_STATE };

    default:
      return state;
  }
};
