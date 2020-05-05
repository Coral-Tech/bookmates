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

const bookshelfNavigation = createStackNavigator(bookshelfScreens);

const userScreen = {
  discover: { screen: DiscoverList },
  bookshelf: {
    screen: bookshelfNavigation,
    navigationOptions: {
      gesturesEnabled: false,
      headerVisible: false,
    },
  },
  profile: { screen: Profile },
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
