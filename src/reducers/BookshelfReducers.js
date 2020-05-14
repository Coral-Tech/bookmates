import {
  FETCH_PERSONAL_BOOKS,
  FETCH_PERSONAL_SUCCESS,
  PROFILE_SIGN_OUT,
  FETCH_REQUESTS_RECIEVED,
  FETCH_REQUESTS_RECIEVED_SUCCESS,
  FETCH_REQUESTS_ACCEPTED,
  FETCH_REQUESTS_ACCEPTED_SUCCESS,
  FETCH_LENT_BOOKS,
  FETCH_LENT_BOOKS_SUCCESS,
} from "../actions/types";

const INITIAL_STATE = {
  my_books: null,
  my_books_loading: false,
  requests_recieved: null,
  requests_recieved_loading: false,
  requests_accepted: null,
  requests_accepted_loading: false,
  lent_books: null,
  lent_books_loading: false,

  error: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PERSONAL_BOOKS:
      return { ...state, my_books_loading: true, error: "" };

    case FETCH_PERSONAL_SUCCESS:
      return {
        ...state,
        my_books_loading: false,
        my_books: action.payload,
      };

    case FETCH_REQUESTS_RECIEVED:
      return { ...state, requests_recieved_loading: true, error: "" };

    case FETCH_REQUESTS_RECIEVED_SUCCESS:
      return {
        ...state,
        requests_recieved_loading: false,
        requests_recieved: action.payload,
      };

    case FETCH_REQUESTS_ACCEPTED:
      return { ...state, requests_accepted_loading: true, error: "" };

    case FETCH_REQUESTS_ACCEPTED_SUCCESS:
      return {
        ...state,
        requests_accepted_loading: false,
        requests_accepted: action.payload,
      };

    case FETCH_LENT_BOOKS:
      return { ...state, lent_books_loading: true, error: "" };

    case FETCH_LENT_BOOKS_SUCCESS:
      return {
        ...state,
        lent_books_loading: false,
        lent_books: action.payload,
      };

    case PROFILE_SIGN_OUT:
      return { INITIAL_STATE };

    default:
      return state;
  }
};
