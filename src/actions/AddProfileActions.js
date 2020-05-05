import {
  ADD_PROFILE_NAME,
  ADD_PROFILE_LASTNAME,
  ADD_PROFILE_LOCATION,
  ADD_PROFILE_PHONE,
  ADD_PROFILE_SUBMIT,
} from "./types";

import Firebase from "../Firebase";

// Add Books

export const profileNameAdd = (text) => {
  return {
    type: ADD_PROFILE_NAME,
    payload: text,
  };
};

export const profileLastNameAdd = (text) => {
  return {
    type: ADD_PROFILE_LASTNAME,
    payload: text,
  };
};

export const profilePhoneAdd = (text) => {
  return {
    type: ADD_PROFILE_PHONE,
    payload: text,
  };
};

export const profileLocationAdd = (text) => {
  return {
    type: ADD_PROFILE_LOCATION,
    payload: text,
  };
};

export const profileAddSubmit = (
  { name, lastname, phone, location },
  navigateTo
) => {
  const { currentUser } = Firebase.auth(); //Get the curruent user

  // User book
  const user_data = {
    name: name.toTitle(),
    lastname: lastname.toTitle(),
    phone: phone,
    email: currentUser.email,
    userid: currentUser.uid,
    user_created: new Date().toLocaleString(),
    location: location.toTitle(),
  };

  return (dispatch) => {
    Firebase.database()
      .ref(`/users/${currentUser.uid}/user_data`)
      .set(user_data)
      .then(() => {
        dispatch({ type: ADD_PROFILE_SUBMIT });
      });
    navigateTo("bookshelf");
  };
};
