import _ from "lodash";
import {
  FETCH_PERSONAL_BOOKS,
  FETCH_PERSONAL_SUCCESS,
  FETCH_REQUESTS_RECIEVED,
  FETCH_REQUESTS_RECIEVED_SUCCESS,
  REMOVE_REQUESTS_RECIEVED,
  ACCEPT_REQUESTS_RECIEVED,
  FETCH_REQUESTS_ACCEPTED,
  FETCH_REQUESTS_ACCEPTED_SUCCESS,
  CANCEL_PICK_UP,
  PICK_UP_SUMBIT,
  FETCH_LENT_BOOKS,
  FETCH_LENT_BOOKS_SUCCESS,
  MARK_RETURNED_BOOK,
} from "./types";

import Firebase from "../Firebase";

// MY BOOKS ACTIONS

export const booksBookshelfFetch = () => {
  const { currentUser } = Firebase.auth();

  return (dispatch) => {
    dispatch({ type: FETCH_PERSONAL_BOOKS });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/lending_books/all_books`)
      .on(
        "value",
        (snapshot) => booksBookshelfFetchSuccess(dispatch, snapshot),
        function (error) {
          console.error(error);
        }
      );
  };
};

const booksBookshelfFetchSuccess = (dispatch, snapshot) => {
  dispatch({
    type: FETCH_PERSONAL_SUCCESS,
    payload: snapshot.val(),
  });
};

// LENT ACTIONS

export const markReturned = (book) => {
  console.log("log");
  const { currentUser } = Firebase.auth();
  const { b_id, b_details, b_borrower_details } = book;

  return (dispatch) => {
    dispatch({ type: MARK_RETURNED_BOOK });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/lending_books/lent_books/${b_id}`)
      .remove();

    Firebase.database()
      .ref(`/users/${currentUser.uid}/lending_books/available_books/${b_id}`)
      .set(b_details);

    Firebase.database()
      .ref(
        `/users/${b_borrower_details.u_id}/borrowing_books/borrowed_books/${b_id}`
      )
      .remove();

    Firebase.database().ref(`/books/${b_id}/b_details/available`).set(true);
  };
};

export const lentBooksFetch = () => {
  const { currentUser } = Firebase.auth();

  return (dispatch) => {
    dispatch({ type: FETCH_LENT_BOOKS });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/lending_books/lent_books`)
      .on(
        "value",
        (snapshot) => lentBooksFetchSuccess(dispatch, snapshot),
        function (error) {
          console.error(error);
        }
      );
  };
};

const lentBooksFetchSuccess = (dispatch, snapshot) => {
  dispatch({
    type: FETCH_LENT_BOOKS_SUCCESS,
    payload: snapshot.val(),
  });
};

// PICK UP PENDING ACTIONS

export const markPickedUp = (book, b_lender_details) => {
  const { currentUser } = Firebase.auth();
  const { b_id, b_details, b_borrower_details } = book;

  return (dispatch) => {
    dispatch({ type: PICK_UP_SUMBIT });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/lending_books/lent_books/${b_id}`)
      .set(book);

    Firebase.database()
      .ref(
        `/users/${currentUser.uid}/lending_books/borrow_request_accepted/${b_id}`
      )
      .remove();

    Firebase.database()
      .ref(
        `/users/${b_borrower_details.u_id}/borrowing_books/pickup_books/${b_id}`
      )
      .remove();

    Firebase.database()
      .ref(
        `/users/${b_borrower_details.u_id}/borrowing_books/borrowed_books/${b_id}`
      )
      .set({ b_id, b_details, b_lender_details });
  };
};

export const cancelPickUp = (book) => {
  const { currentUser } = Firebase.auth();
  const { b_id, b_details, b_borrower_details } = book;

  return (dispatch) => {
    dispatch({ type: CANCEL_PICK_UP });

    Firebase.database()
      .ref(
        `/users/${currentUser.uid}/lending_books/borrow_request_accepted/${b_id}`
      )
      .remove();

    Firebase.database()
      .ref(`/users/${currentUser.uid}/lending_books/available_books/${b_id}`)
      .set(b_details);

    Firebase.database()
      .ref(
        `/users/${b_borrower_details.u_id}/borrowing_books/pickup_books/${b_id}`
      )
      .remove();

    Firebase.database().ref(`/books/${b_id}/b_details/available`).set(true);
  };
};

export const requestsAcceptedFetch = () => {
  const { currentUser } = Firebase.auth();

  return (dispatch) => {
    dispatch({ type: FETCH_REQUESTS_ACCEPTED });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/lending_books/borrow_request_accepted`)
      .on(
        "value",
        (snapshot) => requestsAcceptedFetchSuccess(dispatch, snapshot),
        function (error) {
          console.error(error);
        }
      );
  };
};

const requestsAcceptedFetchSuccess = (dispatch, snapshot) => {
  dispatch({
    type: FETCH_REQUESTS_ACCEPTED_SUCCESS,
    payload: snapshot.val(),
  });
};

// REQUEST RECIEVED ACTIONS

export const acceptRequestsRecieved = (book, b_lender_details) => {
  const { currentUser } = Firebase.auth();
  const { b_id, b_details, b_borrower_details } = book;

  return (dispatch) => {
    dispatch({ type: ACCEPT_REQUESTS_RECIEVED });

    Firebase.database()
      .ref(
        `/users/${currentUser.uid}/lending_books/borrow_request_accepted/${b_id}`
      )
      .set(book);

    Firebase.database()
      .ref(
        `/users/${currentUser.uid}/lending_books/borrow_request_recieved/${b_id}`
      )
      .remove();

    Firebase.database()
      .ref(
        `/users/${b_borrower_details.u_id}/borrowing_books/request_to_borrow_books/${b_id}`
      )
      .remove();

    Firebase.database()
      .ref(
        `/users/${b_borrower_details.u_id}/borrowing_books/pickup_books/${b_id}`
      )
      .set({ b_id, b_details, b_lender_details });

    Firebase.database().ref(`/books/${b_id}/b_details/available`).set(false);
  };
};

export const removeRequestsRecieved = (book) => {
  const { currentUser } = Firebase.auth();
  const { b_id, b_details, b_borrower_details } = book;

  return (dispatch) => {
    dispatch({ type: REMOVE_REQUESTS_RECIEVED });

    Firebase.database()
      .ref(
        `/users/${currentUser.uid}/lending_books/borrow_request_recieved/${b_id}`
      )
      .remove();

    Firebase.database()
      .ref(`/users/${currentUser.uid}/lending_books/available_books/${b_id}`)
      .set(b_details);

    Firebase.database()
      .ref(
        `/users/${b_borrower_details.u_id}/borrowing_books/request_to_borrow_books/${b_id}`
      )
      .remove();
  };
};

export const requestsRecievedFetch = () => {
  const { currentUser } = Firebase.auth();

  return (dispatch) => {
    dispatch({ type: FETCH_REQUESTS_RECIEVED });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/lending_books/borrow_request_recieved`)
      .on(
        "value",
        (snapshot) => requestsRecievedFetchSuccess(dispatch, snapshot),
        function (error) {
          console.error(error);
        }
      );
  };
};

const requestsRecievedFetchSuccess = (dispatch, snapshot) => {
  dispatch({
    type: FETCH_REQUESTS_RECIEVED_SUCCESS,
    payload: snapshot.val(),
  });
};
