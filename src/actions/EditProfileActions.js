import {
  EDIT_FETCH_PROFILE_DATA,
  EDIT_SUCCESS_FETCH_PROFILE_DATA,
  EDIT_PROFILE_NAME,
  EDIT_PROFILE_LASTNAME,
  EDIT_PROFILE_EMAIL,
  EDIT_PROFILE_PHONE,
  EDIT_PROFILE_LOCATION,
  EDIT_PROFILE_PASSWORD,
  EDIT_PROFILE_SUBMIT,
  EDIT_PROFILE_SUBMIT_SUCCESS,
} from "./types";
import Firebase from "../Firebase";

export const profileFetch = () => {
  const { currentUser } = Firebase.auth();

  return (dispatch) => {
    dispatch({ type: EDIT_FETCH_PROFILE_DATA });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/u_details`)
      .on(
        "value",
        (snapshot) => profileFetchSuccess(dispatch, snapshot),
        function (error) {
          console.error(error);
        }
      );
  };
};

const profileFetchSuccess = (dispatch, snapshot) => {
  dispatch({
    type: EDIT_SUCCESS_FETCH_PROFILE_DATA,
    payload: snapshot.val(),
  });
};

export const passwordSubmit = (text) => {
  return {
    type: EDIT_PROFILE_PASSWORD,
    payload: text,
  };
};

export const nameChange = (text) => {
  return {
    type: EDIT_PROFILE_NAME,
    payload: text,
  };
};

export const lastNameChange = (text) => {
  return {
    type: EDIT_PROFILE_LASTNAME,
    payload: text,
  };
};

export const emailChange = (text) => {
  return {
    type: EDIT_PROFILE_EMAIL,
    payload: text,
  };
};

export const locationChange = (text) => {
  return {
    type: EDIT_PROFILE_LOCATION,
    payload: text,
  };
};

export const phoneChange = (text) => {
  return {
    type: EDIT_PROFILE_PHONE,
    payload: text,
  };
};

export const editProfileSubmit = (u_details_new, password, navigateTo) => {
  const { currentUser } = Firebase.auth();

  return (dispatch) => {
    dispatch({ type: EDIT_PROFILE_SUBMIT });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/u_details`)
      .set(u_details_new);

    Firebase.auth()
      .signInWithEmailAndPassword(currentUser.email, password)
      .then(function (userCredential) {
        userCredential.user.updateEmail(u_details_new.u_email);
      });

    dispatch({
      type: EDIT_PROFILE_SUBMIT_SUCCESS,
      payload: u_details_new,
    });
    navigateTo("profileDisplay");
  };
};
