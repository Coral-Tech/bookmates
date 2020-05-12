import {
  STAR_BOOK_SUBMIT,
  STAR_BOOK_SUCCESS,
  FETCH_STARRED_BOOKS,
  FETCH_STARRED_BOOKS_SUCCESS,
  REMOVE_STAR_BOOK_SUBMIT,
  REMOVE_STAR_BOOK_SUCCESS,
} from "./types";

import Firebase from "../Firebase";

// FETCH STARRED BOOKS
export const starBooksFetch = () => {
  const { currentUser } = Firebase.auth();

  return (dispatch) => {
    dispatch({ type: FETCH_STARRED_BOOKS });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/borrowing_books/starred_books`)
      .on(
        "value",
        (snapshot) => starBooksFetchSuccess(dispatch, snapshot),
        function (error) {
          console.log(error);
        }
      );
  };
};

const starBooksFetchSuccess = (dispatch, snapshot) => {
  dispatch({
    type: FETCH_STARRED_BOOKS_SUCCESS,
    payload: snapshot.val(),
  });
};

// STAR BOOK

export const starBook = (b_id, b_details) => {
  const { currentUser } = Firebase.auth(); //Get the currient user

  return (dispatch) => {
    dispatch({ type: STAR_BOOK_SUBMIT });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/borrowing_books/starred_books/${b_id}`)
      .set(b_details)
      .then(() => starBookSuccess(dispatch));
  };
};

const starBookSuccess = (dispatch) => {
  dispatch({
    type: STAR_BOOK_SUCCESS,
  });
};

// REMOVE STAR BOOK

export const removeBook = (b_id) => {
  const { currentUser } = Firebase.auth(); //Get the currient user

  return (dispatch) => {
    dispatch({ type: REMOVE_STAR_BOOK_SUBMIT });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/borrowing_books/starred_books/${b_id}`)
      .remove()
      .then(() => removeBookSuccess(dispatch));
  };
};

const removeBookSuccess = (dispatch) => {
  dispatch({
    type: REMOVE_STAR_BOOK_SUCCESS,
  });
};
