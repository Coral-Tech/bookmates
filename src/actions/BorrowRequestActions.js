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

export const borrowRequest = (id, book_item) => {
  const { currentUser } = Firebase.auth(); //Get the currient user

  const {
    author_name,
    book_name,
    cover,
    datetime_added,
    lastname_owner,
    lastname_user,
    name_owner,
    name_user,
    owner_uid,
  } = book_item;

  const book_request_sent = {
    author_name,
    book_name,
    cover,
    datetime_added,
    name_borrower: name_user,
    lastname_borrower: lastname_user,
    borrower_uid: currentUser.uid,
  };

  const book_request_recieved = {
    author_name,
    book_name,
    cover,
    datetime_added,
    name_owner,
    lastname_owner,
    owner_uid,
  };

  return (dispatch) => {
    dispatch({ type: BORROW_REQUEST_SUBMIT });

    Firebase.database()
      .ref(
        `/users/${book_item.owner_uid}/books/borrowed_request_recieved/${id}`
      )
      .set(book_request_sent);

    Firebase.database()
      .ref(`/users/${currentUser.uid}/books/borrowed_request_sent/${id}`)
      .set(book_request_recieved)
      .then(() => borrowRequestSuccess(dispatch));
  };
};

const borrowRequestSuccess = (dispatch) => {
  dispatch({
    type: BORROW_REQUEST_SUCCESS,
  });
};

// REMOVE BORROW BOOK

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
