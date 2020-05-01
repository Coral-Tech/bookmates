import {
  FETCH_DISCOVER_BOOKS,
  FETCH_DISCOVER_SUCCESS,
  FETCH_DISCOVER_FAILURE,
} from "./types";

import Firebase from "../Firebase";

// Discover

export const booksDiscoverFetch = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_DISCOVER_BOOKS });

    Firebase.database()
      .ref(`/users/`)
      .on("value", (snapshot) => booksDiscoverFetchSuccess(dispatch, snapshot));
  };
};

const booksDiscoverFetchSuccess = (dispatch, snapshot) => {
  dispatch({
    type: FETCH_DISCOVER_SUCCESS,
    payload: snapshot.val(),
  });
};

// const booksFetchFail = (dispatch) => {
//   dispatch({
//     type: FETCH_DISCOVER_FAILURE,
//   });
// };
