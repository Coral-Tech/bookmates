import {
  ADD_PROFILE_NAME,
  ADD_PROFILE_LASTNAME,
  ADD_PROFILE_LOCATION,
  ADD_PROFILE_PHONE,
  ADD_PROFILE_SUBMIT,
} from "../actions/types";

const INITIAL_STATE = {
  name: "",
  lastname: "",
  location: "",
  phone: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PROFILE_NAME:
      return { ...state, name: action.payload };
    case ADD_PROFILE_LASTNAME:
      return { ...state, lastname: action.payload };
    case ADD_PROFILE_PHONE:
      return { ...state, phone: action.payload };
    case ADD_PROFILE_LOCATION:
      return { ...state, location: action.payload };
    case ADD_PROFILE_SUBMIT:
      return { INITIAL_STATE };
    default:
      return state;
  }
};
