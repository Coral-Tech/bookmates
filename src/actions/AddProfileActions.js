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
  { u_name, u_lastname, u_phone, u_location },
  navigateTo
) => {
  const { currentUser } = Firebase.auth(); //Get the curruent user

  // User book
  const u_details = {
    u_id: currentUser.uid,
    u_name: u_name.toTitle(),
    u_lastname: u_lastname.toTitle(),
    u_phone: u_phone,
    u_email: currentUser.email,
    u_created: new Date().toLocaleString(),
    u_location: u_location.toTitle(),
  };

  return (dispatch) => {
    Firebase.database()
      .ref(`/users/${currentUser.uid}/u_details`)
      .set(u_details)
      .then(() => {
        dispatch({ type: ADD_PROFILE_SUBMIT });
      });
    navigateTo("bookshelf");
  };
};
