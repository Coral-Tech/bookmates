import {
  FETCH_BORROWED_REQUESTS,
  FETCH_BORROWED_REQUESTS_SUCCESS,
  BORROW_REQUEST_SUBMIT,
  BORROW_REQUEST_SUCCESS,
  REMOVE_BORROW_REQUEST_SUBMIT,
  REMOVE_BORROW_REQUEST_SUCCESS,
} from "./types";

import Firebase from "../Firebase";

// FETCH BORROW BOOKS
export const borrowedRequestsFetch = () => {
  const { currentUser } = Firebase.auth();

  return (dispatch) => {
    dispatch({ type: FETCH_BORROWED_REQUESTS });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/borrowing_books/request_to_borrow_books`)
      .on(
        "value",
        (snapshot) => borrowRequestFetchSuccess(dispatch, snapshot),

        function (error) {
          console.log(error);
        }
      );
  };
};

const borrowRequestFetchSuccess = (dispatch, snapshot) => {
  dispatch({
    type: FETCH_BORROWED_REQUESTS_SUCCESS,
    payload: snapshot.val(),
  });
};

//  BORROW BOOK

export const borrowRequest = (book, b_borrower_details) => {
  const { currentUser } = Firebase.auth();
  const { b_id, b_details, b_lender_details } = book;

  return (dispatch) => {
    dispatch({ type: BORROW_REQUEST_SUBMIT });

    Firebase.database()
      .ref(
        `/users/${b_lender_details.u_id}/lending_books/borrow_request_recieved/${b_id}`
      )
      .set({ b_id, b_details, b_borrower_details });

    Firebase.database()
      .ref(
        `/users/${b_lender_details.u_id}/lending_books/available_books/${b_id}`
      )
      .remove();

    Firebase.database()
      .ref(
        `/users/${currentUser.uid}/borrowing_books/request_to_borrow_books/${b_id}`
      )
      .set(book)
      .then(() => borrowRequestSuccess(dispatch));
  };
};

const borrowRequestSuccess = (dispatch) => {
  dispatch({
    type: BORROW_REQUEST_SUCCESS,
  });
};

// REMOVE BORROW BOOK

export const removeBorrowRequest = (book) => {
  const { currentUser } = Firebase.auth();
  const { b_id, b_details, b_lender_details } = book;

  return (dispatch) => {
    dispatch({ type: REMOVE_BORROW_REQUEST_SUBMIT });

    Firebase.database()
      .ref(
        `/users/${b_lender_details.u_id}/lending_books/borrow_request_recieved/${b_id}`
      )
      .remove();

    Firebase.database()
      .ref(
        `/users/${b_lender_details.u_id}/lending_books/available_books/${b_id}`
      )
      .set(b_details);

    Firebase.database()
      .ref(
        `/users/${currentUser.uid}/borrowing_books/request_to_borrow_books/${b_id}`
      )
      .remove()
      .then(() => removeBookSuccess(dispatch));
  };
};

const removeBookSuccess = (dispatch) => {
  dispatch({
    type: REMOVE_BORROW_REQUEST_SUCCESS,
  });
};
