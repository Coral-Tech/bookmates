import {
  SIGN_UP_ADD_USERNAME,
  SIGN_UP_ADD_PASSWORD,
  SIGN_UP_SUBMIT,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
} from "./types";
import Firebase from "../Firebase";

export const usernameAdd = (text) => {
  return {
    type: SIGN_UP_ADD_USERNAME,
    payload: text,
  };
};

export const passwordAdd = (text) => {
  return {
    type: SIGN_UP_ADD_PASSWORD,
    payload: text,
  };
};

export const SignUpSubmit = ({ username, password }, navigateTo) => {
  return (dispatch) => {
    dispatch({ type: SIGN_UP_SUBMIT });

    Firebase.auth()
      .createUserWithEmailAndPassword(username, password)
      .then((user) => signupSucess(dispatch, user, navigateTo))
      .catch((error) => {
        console.log(error);
        signupFail(dispatch);
      });
  };
};

const signupSucess = (dispatch, user, navigateTo) => {
  dispatch({
    type: SIGN_UP_SUCCESS,
    payload: user,
  });

  navigateTo("profileadd");
};

const signupFail = (dispatch) => {
  dispatch({
    type: SIGN_UP_FAIL,
  });
};
