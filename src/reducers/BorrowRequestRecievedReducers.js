import {
  FETCH_BORROWED_RECIEVED_REQUESTS,
  FETCH_BORROWED_RECIEVED_REQUESTS_SUCCESS,
  PROFILE_SIGN_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  borrowed_books_request_recieved: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BORROWED_RECIEVED_REQUESTS:
      return { ...state, loading: true };
    case FETCH_BORROWED_RECIEVED_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        borrowed_books_request_recieved: action.payload,
      };
    case PROFILE_SIGN_OUT:
      return { INITIAL_STATE };

    default:
      return state;
  }
};
