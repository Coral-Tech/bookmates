import {
  ADD_BOOK_NAME,
  ADD_BOOK_AUTHOR,
  ADD_BOOK_COVER_SUBMIT,
  ADD_BOOK_COVER_SUCCESS,
  ADD_BOOK_SUBMIT,
  ADD_BOOK_ID,
} from "./types";

import Firebase from "../Firebase";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Add Books

export const createBookId = () => {
  const b_id = uuidv4();
  return {
    type: ADD_BOOK_ID,
    payload: b_id,
  };
};

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

export const coverAdd = (blob, temp_image, b_id) => {
  const { currentUser } = Firebase.auth(); //Get the currient user

  return (dispatch) => {
    dispatch({ type: ADD_BOOK_COVER_SUBMIT });

    Firebase.storage()
      .ref(`/books/${currentUser.uid}/${b_id}`)
      .put(blob, { contentType: "image/jpeg" })
      .then(() => {
        dispatch({
          type: ADD_BOOK_COVER_SUCCESS,
          payload: {
            url: `/books/${currentUser.uid}/${b_id}`,
            local_image: temp_image,
          },
        });
      });
  };
};

export const addBookSubmit = (
  { b_id, b_name, b_author, u_details, b_cover },
  navigateTo
) => {
  const { currentUser } = Firebase.auth(); //Get the currient user

  return async (dispatch) => {
    const b_cover_download = await Firebase.storage()
      .ref(`/books/${currentUser.uid}/${b_id}`)
      .getDownloadURL();

    navigateTo("bookshelfBooks");
    // User book
    const b_details = {
      b_name: b_name.toTitle(),
      b_author: b_author.toTitle(),
      b_cover: b_cover_download,
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
      b_cover: b_cover_download,
      b_added_date: new Date().toLocaleString(),
    };
    // push book to /books/ db
    const pushData = Firebase.database()
      .ref(`/books/${b_id}`)
      .set({ b_details, b_lender_details });
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
