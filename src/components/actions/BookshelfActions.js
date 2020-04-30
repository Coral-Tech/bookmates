import {
  FETCH_PERSONAL_BOOKS,
  FETCH_PERSONAL_SUCCESS,
  FETCH_PERSONAL_FAILURE,
} from "./types";

import Firebase from "../../Firebase";

// Bookshelf

export const booksFetch = () => {
  const { currentUser } = Firebase.auth();

  return (dispatch) => {
    dispatch({ type: FETCH_PERSONAL_BOOKS });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/books`)
      .on("value", (snapshot) => booksFetchSuccess(dispatch, snapshot));
  };
};

const booksFetchSuccess = (dispatch, snapshot) => {
  dispatch({
    type: FETCH_PERSONAL_SUCCESS,
    payload: snapshot.val(),
  });
};

// const booksFetchFail = (dispatch) => {
//   dispatch({
//     type: FETCH_PERSONAL_FAILURE,
//   });
// };
