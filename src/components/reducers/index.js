import { combineReducers } from "redux";
import LogInReducers from "./LogInReducers";
import SignUpReducers from "./SignUpReducer";
import AddBookReducers from "./AddBookReducers";
import BookshelfReducers from "./BookshelfReducers";

export default combineReducers({
  login: LogInReducers,
  signup: SignUpReducers,
  addbook: AddBookReducers,
  bookshelf: BookshelfReducers,
});
