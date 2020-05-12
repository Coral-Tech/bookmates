import {
  ADD_PROFILE_NAME,
  ADD_PROFILE_LASTNAME,
  ADD_PROFILE_LOCATION,
  ADD_PROFILE_PHONE,
  ADD_PROFILE_SUBMIT,
  PROFILE_SIGN_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  u_name: "",
  u_lastname: "",
  u_location: "",
  u_phone: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PROFILE_NAME:
      return { ...state, u_name: action.payload };
    case ADD_PROFILE_LASTNAME:
      return { ...state, u_lastname: action.payload };
    case ADD_PROFILE_PHONE:
      return { ...state, u_phone: action.payload };
    case ADD_PROFILE_LOCATION:
      return { ...state, u_location: action.payload };
    case ADD_PROFILE_SUBMIT:
      return { INITIAL_STATE };
    case PROFILE_SIGN_OUT:
      return { INITIAL_STATE };
    default:
      return state;
  }
};
