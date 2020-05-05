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
      .ref(`/users/${currentUser.uid}/books/borrowed_request_sent`)
      .on(
        "value",
        (snapshot) => bororwRequestFetchSuccess(dispatch, snapshot),
        function (error) {
          console.log(error);
        }
      );
  };
};

const bororwRequestFetchSuccess = (dispatch, snapshot) => {
  dispatch({
    type: FETCH_BORROWED_REQUESTS_SUCCESS,
    payload: snapshot.val(),
  });
};

//   // STAR BOOK

export const borrowRequest = (id, book_item) => {
  const { currentUser } = Firebase.auth(); //Get the currient user

  return (dispatch) => {
    dispatch({ type: BORROW_REQUEST_SUBMIT });

    Firebase.database()
      .ref(
        `/users/${book_item.owner_uid}/books/borrowed_request_recieved/${id}`
      )
      .set(book_item);

    Firebase.database()
      .ref(`/users/${currentUser.uid}/books/borrowed_request_sent/${id}`)
      .set(book_item)
      .then(() => borrowRequestSuccess(dispatch));
  };
};

const borrowRequestSuccess = (dispatch) => {
  dispatch({
    type: BORROW_REQUEST_SUCCESS,
  });
};

// REMOVE STAR BOOK

export const removeBorrowRequest = (book_id, owner_id) => {
  const { currentUser } = Firebase.auth(); //Get the currient user

  return (dispatch) => {
    dispatch({ type: REMOVE_BORROW_REQUEST_SUBMIT });

    Firebase.database()
      .ref(`/users/${owner_id}/books/borrowed_request_recieved/${book_id}`)
      .remove();

    Firebase.database()
      .ref(`/users/${currentUser.uid}/books/borrowed_request_sent/${book_id}`)
      .remove()
      .then(() => removeBookSuccess(dispatch));
  };
};

const removeBookSuccess = (dispatch) => {
  dispatch({
    type: REMOVE_BORROW_REQUEST_SUCCESS,
  });
};
