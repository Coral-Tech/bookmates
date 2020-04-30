import {
  ADD_BOOK_NAME,
  ADD_BOOK_AUTHOR,
  ADD_BOOK_COVER,
  ADD_BOOK_SUBMIT,
} from "./types";

import Firebase from "../Firebase";

// Add Books

export const bookNameAdd = (text) => {
  return {
    type: ADD_BOOK_NAME,
    payload: text,
  };
};

export const bookAuthorAdd = (text) => {
  return {
    type: ADD_BOOK_AUTHOR,
    payload: text,
  };
};

export const addBookSubmit = ({ book_name, author_name }) => {
  const { currentUser } = Firebase.auth(); //Get the current user

  return (dispatch) => {
    Firebase.database()
      .ref(`/users/${currentUser.uid}/books`)
      .push({ book_name, author_name })
      .then(() => {
        dispatch({ type: ADD_BOOK_SUBMIT });
      });
  };
};
