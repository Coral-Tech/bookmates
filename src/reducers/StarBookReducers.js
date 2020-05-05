import {
  FETCH_STARRED_BOOKS,
  FETCH_STARRED_BOOKS_SUCCESS,
  REMOVE_STAR_BOOK_SUBMIT,
  STAR_BOOK_SUBMIT,
  PROFILE_SIGN_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  starred_books: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_STARRED_BOOKS:
      return { ...state, loading: true };
    case REMOVE_STAR_BOOK_SUBMIT:
      return { ...state, loading: true };
    case STAR_BOOK_SUBMIT:
      return { ...state, loading: true };
    case FETCH_STARRED_BOOKS_SUCCESS:
      return { ...state, loading: false, starred_books: action.payload };
    case PROFILE_SIGN_OUT:
      return { INITIAL_STATE };

    default:
      return state;
  }
};
