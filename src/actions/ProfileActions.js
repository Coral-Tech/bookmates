import { FETCH_PROFILE_DATA, FETCH_PROFILE_SUCCESS } from "./types";

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
  dispatch({
    type: FETCH_PROFILE_SUCCESS,
    payload: snapshot.val(),
  });
};
