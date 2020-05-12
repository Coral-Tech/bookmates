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

export const addBookSubmit = ({ b_name, b_author, u_details }, navigateTo) => {
  const { currentUser } = Firebase.auth(); //Get the currient user

  // User book
  const b_details = {
    b_name: b_name.toTitle(),
    b_author: b_author.toTitle(),
    b_cover: "",
    b_added_date: new Date().toLocaleString(),
    available: true,
  };

  const b_lender_details = {
    u_id: currentUser.uid,
    u_name: u_details.u_name,
    u_lastname: u_details.u_lastname,
    u_location: u_details.u_location,
    u_phone: u_details.u_phone,
    u_email: u_details.u_email,
  };

  const b_details_for_usersdb = {
    b_name: b_name.toTitle(),
    b_author: b_author.toTitle(),
    b_cover: "",
    b_added_date: new Date().toLocaleString(),
  };

  return (dispatch) => {
    navigateTo("bookshelfBooks");

    // push book to /books/ db
    const pushData = Firebase.database()
      .ref(`/books/`)
      .push({ b_details, b_lender_details });
    const b_id = pushData.key;

    // push book to /user/id db
    Firebase.database()
      .ref(`/users/${currentUser.uid}/lending_books/all_books/${b_id}`)
      .set(b_details_for_usersdb)
      .then(() => {
        Firebase.database()
          .ref(
            `/users/${currentUser.uid}/lending_books/available_books/${b_id}`
          )
          .set(b_details_for_usersdb)
          .then(() => {
            dispatch({ type: ADD_BOOK_SUBMIT });
          });
      });
  };
};
