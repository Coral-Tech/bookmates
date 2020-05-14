import {
  ADD_BOOK_NAME,
  ADD_BOOK_AUTHOR,
  ADD_BOOK_COVER_SUBMIT,
  ADD_BOOK_COVER_SUCCESS,
  ADD_BOOK_SUBMIT,
  ADD_BOOK_ID,
  PROFILE_SIGN_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  b_id: "",
  b_name: "",
  b_author: "",
  b_cover: "",
  b_cover_loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_BOOK_ID:
      return { ...state, b_id: action.payload };
    case ADD_BOOK_NAME:
      return { ...state, b_name: action.payload };
    case ADD_BOOK_AUTHOR:
      return { ...state, b_author: action.payload };
    case ADD_BOOK_COVER_SUBMIT:
      return { ...state, b_cover_loading: true };
    case ADD_BOOK_COVER_SUCCESS:
      return { ...state, b_cover: action.payload, b_cover_loading: false };

    case ADD_BOOK_SUBMIT:
      return { INITIAL_STATE };
    case PROFILE_SIGN_OUT:
      return { INITIAL_STATE };
    default:
      return state;
  }
};
