import {
  FETCH_BORROWED_RECIEVED_REQUESTS,
  FETCH_BORROWED_RECIEVED_REQUESTS_SUCCESS,
  ACCEPT_BORROW_REQUEST_RECIEVED_SUBMIT,
  ACCEPT_BORROW_REQUEST_RECIEVED_SUCCESS,
  REMOVE_BORROW_REQUEST_RECIEVED_SUBMIT,
  REMOVE_BORROW_REQUEST_RECIEVED_SUCCESS,
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

// REMOVE REQUEST

export const removeBorrowRecievedRequest = (book) => {
  const { currentUser } = Firebase.auth(); //Get the currient user

  return (dispatch) => {
    dispatch({ type: REMOVE_BORROW_REQUEST_RECIEVED_SUBMIT });

    Firebase.database()
      .ref(
        `/users/${currentUser.uid}/books/borrowed_request_recieved/${book.book_id}`
      )
      .remove();

    Firebase.database()
      .ref(
        `/users/${book.borrower_uid}/books/borrowed_request_sent/${book.book_id}`
      )
      .remove()
      .then(() => removeBorrowRecievedSuccess(dispatch));
  };
};

const removeBorrowRecievedSuccess = (dispatch) => {
  dispatch({
    type: REMOVE_BORROW_REQUEST_RECIEVED_SUCCESS,
  });
};

// ACCEPT REQUEST

export const acceptBorrowRecievedRequest = (book) => {
  const { currentUser } = Firebase.auth(); //Get the currient user

  return (dispatch) => {
    dispatch({ type: ACCEPT_BORROW_REQUEST_RECIEVED_SUBMIT });

    console.log("accept");

    Firebase.database()
      .ref(`/users/${currentUser.uid}/books/owned_books/${book.book_id}/status`)
      .set({ borrowed: true });

    Firebase.database()
      .ref(
        `/users/${currentUser.uid}/books/borrowed_request_recieved/${book.book_id}`
      )
      .remove();

    Firebase.database()
      .ref(
        `/users/${book.borrower_uid}/books/borrowed_request_sent/${book.book_id}`
      )
      .remove();

    Firebase.database()
      .ref(`/users/${book.borrower_uid}/books/borrowed_books/${book.book_id}`)
      .set(book)
      .then(() => acceptBorrowRecievedSuccess(dispatch));
  };
};

const acceptBorrowRecievedSuccess = (dispatch) => {
  console.log("accept");
  dispatch({
    type: ACCEPT_BORROW_REQUEST_RECIEVED_SUCCESS,
  });
};
