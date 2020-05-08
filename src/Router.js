import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";

// // Screens

import LoginOrSignUp from "./components/guest/LogInOrSignUp";
import SignUpForm from "./components/guest/SignUpForm";
import LoginForm from "./components/guest/LoginForm";
import AddProfile from "./components/user/AddProfile";

import BookshelfList from "./components/user/BookshelfList";
import AddBook from "./components/user/AddBook";
import DiscoverList from "./components/user/DiscoverList";
import Profile from "./components/user/Profile";
import BorrowList from "./components/user/BorrowList";

import EditProfile from "./components/user/EditProfile";

// Guest screens
const guestScreens = {
  default: {
    screen: LoginOrSignUp,
    navigationOptions: {
      headerShown: false,
    },
  },
  login: {
    screen: LoginForm,
    navigationOptions: {
      headerShown: false,
    },
  },
  signup: {
    screen: SignUpForm,
    navigationOptions: {
      headerShown: false,
    },
  },
  profileadd: {
    screen: AddProfile,
    navigationOptions: {
      headerShown: false,
    },
  },
};
const guestNavigation = createStackNavigator(guestScreens);

// User screens

//   Bookshelf
const bookshelfScreens = {
  bookshelfBooks: {
    screen: BookshelfList,
    navigationOptions: {
      headerShown: false,
    },
  },
  bookshelfadd: {
    screen: AddBook,
    navigationOptions: {
      headerShown: false,
    },
  },
  // bookshelfedit: { screen: BookshelfList },
};

const profileScreens = {
  profileDisplay: {
    screen: Profile,
    navigationOptions: {
      headerShown: false,
    },
  },
  profileEdit: {
    screen: EditProfile,
    navigationOptions: {
      headerShown: false,
    },
  },
};

const bookshelfNavigation = createStackNavigator(bookshelfScreens);
const profileNavigation = createStackNavigator(profileScreens);

const userScreen = {
  discover: { screen: DiscoverList },
  borrow: { screen: BorrowList },
  bookshelf: {
    screen: bookshelfNavigation,
    navigationOptions: {
      gesturesEnabled: false,
      headerVisible: false,
    },
  },
  profile: {
    screen: profileNavigation,
    navigationOptions: {
      gesturesEnabled: false,
      headerVisible: false,
    },
  },
};
const userNavigation = createBottomTabNavigator(userScreen);

const rootNavigation = createStackNavigator({
  guest: {
    screen: guestNavigation,
    navigationOptions: {
      gestureEnabled: false,
      headerVisible: false,
    },
  },
  user: {
    screen: userNavigation,
    navigationOptions: { headerLeft: () => null, gestureEnabled: false },
  },
});

const AppNavigator = createAppContainer(rootNavigation);

export default AppNavigator;
