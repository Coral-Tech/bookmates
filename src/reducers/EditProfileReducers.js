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
  u_name: "",
  u_lastname: "",
  u_email: "",
  u_phone: "",
  u_location: "",
  password: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDIT_FETCH_PROFILE_DATA:
      return { ...state, loading: true };

    case EDIT_SUCCESS_FETCH_PROFILE_DATA:
      return {
        loading: false,
        u_name: action.payload.u_name,
        u_lastname: action.payload.u_lastname,
        u_email: action.payload.u_email,
        u_phone: action.payload.u_phone,
        u_location: action.payload.u_location,
      };

    case EDIT_PROFILE_NAME:
      return { ...state, u_name: action.payload };
    case EDIT_PROFILE_LASTNAME:
      return { ...state, u_lastname: action.payload };
    case EDIT_PROFILE_EMAIL:
      return { ...state, u_email: action.payload };
    case EDIT_PROFILE_PHONE:
      return { ...state, u_phone: action.payload };
    case EDIT_PROFILE_LOCATION:
      return { ...state, u_location: action.payload };

    case EDIT_PROFILE_PASSWORD:
      return { ...state, password: action.payload };

    case EDIT_PROFILE_SUBMIT:
      return { ...state, loading: true };
    case EDIT_PROFILE_SUBMIT_SUCCESS:
      return {
        loading: false,
        u_name: action.payload.u_name,
        u_lastname: action.payload.u_lastname,
        u_email: action.payload.u_email,
        u_phone: action.payload.u_phone,
        u_location: action.payload.u_location,
      };

    default:
      return state;
  }
};
