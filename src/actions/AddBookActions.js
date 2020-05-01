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

  // User book
  const book_details = {
    book_name: book_name,
    author_name: author_name,
    cover: "",
    datetime_added: new Date().toLocaleString(),
  };

  //  Public Book
  const public_book_data = {
    owner: currentUser,
    starred: {},
    book_borrow_details: {
      borrowed: false,
      user_borrowing: "",
      borrow_date: "",
    },
    book_details: {
      book_name: book_name,
      author_name: author_name,
      cover: "",
      datetime_added: new Date().toLocaleString(),
    },
  };

  return (dispatch) => {
    // Dispatch User Bookshelf

    // Firebase.database().ref("/public_bookshelf/").push({ public_book_data });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/owned_books`)
      .push({ book_details })
      .then(() => {
        dispatch({ type: ADD_BOOK_SUBMIT });
      });
  };
};
