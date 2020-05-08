import { combineReducers } from "redux";
import LogInReducers from "./LogInReducers";
import SignUpReducers from "./SignUpReducer";
import AddBookReducers from "./AddBookReducers";
import BookshelfReducers from "./BookshelfReducers";
import DiscoverReducers from "./DiscoverReducers";
import AddProfileReducers from "./AddProfileReducers";
import ProfileReducers from "./ProfileReducers";
import StarBookReducers from "./StarBookReducers";
import BorrowRequestReducers from "./BorrowRequestReducers";
import BorrowRequestRecievedReducers from "./BorrowRequestRecievedReducers";
import EditProfileReducers from "./EditProfileReducers";

export default combineReducers({
  login: LogInReducers,
  signup: SignUpReducers,
  addbook: AddBookReducers,
  bookshelf: BookshelfReducers,
  discover: DiscoverReducers,
  addprofile: AddProfileReducers,
  editprofile: EditProfileReducers,
  profile: ProfileReducers,
  star: StarBookReducers,
  borrow_request: BorrowRequestReducers,
  borrow_request_recieve: BorrowRequestRecievedReducers,
});
