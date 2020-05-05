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
  const { currentUser } = Firebase.auth(); //Get the currient user

  // User book
  const book_details = {
    book_name: book_name.toTitle(),
    author_name: author_name.toTitle(),
    cover: "",
    datetime_added: new Date().toLocaleString(),
  };

  return (dispatch) => {
    Firebase.database()
      .ref(`/users/${currentUser.uid}/books/owned_books`)
      .push({ book_details })
      .then(() => {
        dispatch({ type: ADD_BOOK_SUBMIT });
      });
  };
};
