import {
  LOG_IN_ADD_USERNAME,
  LOG_IN_ADD_PASSWORD,
  LOG_IN_SUBMIT,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
} from "./types";
import Firebase from "../Firebase";

export const usernameAdd = (text) => {
  return {
    type: LOG_IN_ADD_USERNAME,
    payload: text,
  };
};

export const passwordAdd = (text) => {
  return {
    type: LOG_IN_ADD_PASSWORD,
    payload: text,
  };
};

export const loginSubmit = ({ username, password }, navigateTo) => {
  return (dispatch) => {
    dispatch({ type: LOG_IN_SUBMIT });

    Firebase.auth()
      .signInWithEmailAndPassword(username, password)
      .then((user) => loginSucess(dispatch, user, navigateTo))
      .catch((error) => {
        console.log(error);
        loginFail(dispatch);
      });
    Firebase.database().goOnline();
  };
};

const loginSucess = (dispatch, user, navigateTo) => {
  dispatch({
    type: LOG_IN_SUCCESS,
    payload: user,
  });

  navigateTo("bookshelf");
};

const loginFail = (dispatch) => {
  dispatch({
    type: LOG_IN_FAIL,
  });
};
