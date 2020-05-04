import {
  ADD_BOOK_NAME,
  ADD_BOOK_AUTHOR,
  ADD_BOOK_COVER,
  ADD_BOOK_SUBMIT,
  PROFILE_SIGN_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  book_name: "",
  author_name: "",
  cover: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_BOOK_NAME:
      return { ...state, book_name: action.payload };
    case ADD_BOOK_AUTHOR:
      return { ...state, author_name: action.payload };
    case ADD_BOOK_SUBMIT:
      return { INITIAL_STATE };
    case PROFILE_SIGN_OUT:
      return { INITIAL_STATE };
    default:
      return state;
  }
};
