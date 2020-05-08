import {
  EDIT_FETCH_PROFILE_DATA,
  EDIT_SUCCESS_FETCH_PROFILE_DATA,
  EDIT_PROFILE_NAME,
  EDIT_PROFILE_LASTNAME,
  EDIT_PROFILE_EMAIL,
  EDIT_PROFILE_PHONE,
  EDIT_PROFILE_LOCATION,
  EDIT_PROFILE_SUBMIT,
  EDIT_PROFILE_SUBMIT_SUCCESS,
  EDIT_PROFILE_PASSWORD,
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  name: "",
  lastname: "",
  email: "",
  phone: "",
  location: "",
  password: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDIT_FETCH_PROFILE_DATA:
      return { ...state, loading: true };
    case EDIT_SUCCESS_FETCH_PROFILE_DATA:
      return {
        loading: false,
        name: action.payload.name,
        lastname: action.payload.lastname,
        email: action.payload.email,
        phone: action.payload.phone,
        location: action.payload.location,
      };

    case EDIT_PROFILE_NAME:
      return { ...state, name: action.payload };
    case EDIT_PROFILE_LASTNAME:
      return { ...state, lastname: action.payload };
    case EDIT_PROFILE_EMAIL:
      return { ...state, email: action.payload };
    case EDIT_PROFILE_PHONE:
      return { ...state, phone: action.payload };
    case EDIT_PROFILE_LOCATION:
      return { ...state, location: action.payload };

    case EDIT_PROFILE_PASSWORD:
      return { ...state, password: action.payload };

    case EDIT_PROFILE_SUBMIT:
      return { ...state, loading: true };
    case EDIT_PROFILE_SUBMIT_SUCCESS:
      return {
        loading: false,
        name: action.payload.name,
        lastname: action.payload.lastname,
        email: action.payload.email,
        phone: action.payload.phone,
        location: action.payload.location,
      };

    default:
      return state;
  }
};
