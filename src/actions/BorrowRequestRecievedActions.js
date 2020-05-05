import {
  FETCH_BORROWED_RECIEVED_REQUESTS,
  FETCH_BORROWED_RECIEVED_REQUESTS_SUCCESS,
} from "./types";

import Firebase from "../Firebase";

// FETCH BORROW BOOKS
export const borrowedRecievedRequestsFetch = () => {
  const { currentUser } = Firebase.auth();

  return (dispatch) => {
    dispatch({ type: FETCH_BORROWED_RECIEVED_REQUESTS });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/books/borrowed_request_recieved`)
      .on(
        "value",
        (snapshot) => borrowRecievedRequestFetchSuccess(dispatch, snapshot),
        function (error) {
          console.log(error);
        }
      );
  };
};

const borrowRecievedRequestFetchSuccess = (dispatch, snapshot) => {
  dispatch({
    type: FETCH_BORROWED_RECIEVED_REQUESTS_SUCCESS,
    payload: snapshot.val(),
  });
};
