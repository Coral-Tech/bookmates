import {
  FETCH_PROFILE_DATA,
  FETCH_PROFILE_SUCCESS,
  PROFILE_SIGN_OUT,
} from "./types";

import Firebase from "../Firebase";

export const profileFetch = () => {
  const { currentUser } = Firebase.auth();

  return (dispatch) => {
    dispatch({ type: FETCH_PROFILE_DATA });

    Firebase.database()
      .ref(`/users/${currentUser.uid}/user_data`)
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
  console.log("PROFILE FETCHED");
  dispatch({
    type: FETCH_PROFILE_SUCCESS,
    payload: snapshot.val(),
  });
};

export const profileSignOut = (navigateTo) => {
  return (dispatch) => {
    dispatch({ type: PROFILE_SIGN_OUT });

    Firebase.database().goOffline();
    Firebase.auth().signOut();
    navigateTo("default");
  };
};
