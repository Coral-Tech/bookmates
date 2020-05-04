import { combineReducers } from "redux";
import LogInReducers from "./LogInReducers";
import SignUpReducers from "./SignUpReducer";
import AddBookReducers from "./AddBookReducers";
import BookshelfReducers from "./BookshelfReducers";
import DiscoverReducers from "./DiscoverReducers";
import AddProfileReducers from "./AddProfileReducers";
import ProfileReducers from "./ProfileReducers";
import StarBookReducers from "./StarBookReducers";

export default combineReducers({
  login: LogInReducers,
  signup: SignUpReducers,
  addbook: AddBookReducers,
  bookshelf: BookshelfReducers,
  discover: DiscoverReducers,
  addprofile: AddProfileReducers,
  profile: ProfileReducers,
  star: StarBookReducers,
});
