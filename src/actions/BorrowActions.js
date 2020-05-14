import {
  FETCH_BORROWED_REQUESTS,
  FETCH_BORROWED_REQUESTS_SUCCESS,
  BORROW_REQUEST_SUBMIT,
  REMOVE_BORROW_REQUEST_SUBMIT,
  FETCH_PICKUP_BOOKS,
  FETCH_PICKUP_BOOKS_SUCCESS,
  FETCH_BORROWED_BOOKS,
  FETCH_BORROWED_BOOKS_SUCCESS,
  MARK_RETURNED_BOOK,
} from "./types";

import Firebase from "../Firebase";

// FETCH BORROWED BOOKS

export const borrowedBooksFetch = () => {
  const { currentUser } = Firebase.auth();

  return (dispatch) => {
    dispatch({ type: FETCH_BORROWED_BOOKS });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/borrowing_books/borrowed_books`)
      .on(
        "value",
        (snapshot) => borrowedBooksFetchSuccess(dispatch, snapshot),

        function (error) {
          console.log(error);
        }
      );
  };
};

const borrowedBooksFetchSuccess = (dispatch, snapshot) => {
  dispatch({
    type: FETCH_BORROWED_BOOKS_SUCCESS,
    payload: snapshot.val(),
  });
};

// Fetch PICKUP BOOKS

export const removePickUp = (book) => {
  const { currentUser } = Firebase.auth();
  const { b_id, b_details, b_lender_details } = book;

  return (dispatch) => {
    dispatch({ type: REMOVE_BORROW_REQUEST_SUBMIT });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/borrowing_books/pickup_books/${b_id}`)
      .remove();

    Firebase.database()
      .ref(
        `/users/${b_lender_details.u_id}/lending_books/available_books/${b_id}`
      )
      .set(b_details);

    Firebase.database()
      .ref(
        `/users/${b_lender_details.u_id}/lending_books/borrow_request_accepted/${b_id}`
      )
      .remove();

    Firebase.database().ref(`/books/${b_id}/b_details/available`).set(true);
  };
};

export const pickUpBooksFetch = () => {
  const { currentUser } = Firebase.auth();

  return (dispatch) => {
    dispatch({ type: FETCH_PICKUP_BOOKS });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/borrowing_books/pickup_books`)
      .on(
        "value",
        (snapshot) => pickUpBooksFetchSuccess(dispatch, snapshot),

        function (error) {
          console.log(error);
        }
      );
  };
};

const pickUpBooksFetchSuccess = (dispatch, snapshot) => {
  dispatch({
    type: FETCH_PICKUP_BOOKS_SUCCESS,
    payload: snapshot.val(),
  });
};

// FETCH BORROW Requests BOOKS
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

//  BORROW Requests BOOK

export const borrowRequest = (book, b_borrower_details_raw) => {
  const { currentUser } = Firebase.auth();
  const { b_id, b_details, b_lender_details } = book;

  const b_borrower_details = {
    ...b_borrower_details_raw,
    u_id: currentUser.uid,
  };

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
      .set(book);
  };
};

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
      .remove();
  };
};
