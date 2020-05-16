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
      cardStyle: {
        backgroundColor: "#fff",
      },
    },
  },
  signup: {
    screen: SignUpForm,
    navigationOptions: {
      headerShown: false,
      cardStyle: {
        backgroundColor: "#fff",
      },
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
      cardStyle: { backgroundColor: "white" },
    },
  },
  bookshelfadd: {
    screen: AddBook,
    navigationOptions: {
      headerShown: false,
      cardStyle: { backgroundColor: "white" },
    },
  },
  borrow: {
    screen: BorrowList,
    navigationOptions: {
      headerShown: false,
      cardStyle: { backgroundColor: "white" },
    },
  },
  // bookshelfedit: { screen: BookshelfList },
};

const profileScreens = {
  profileDisplay: {
    screen: Profile,
    navigationOptions: {
      headerShown: false,
      cardStyle: { backgroundColor: "white" },
    },
  },
  profileEdit: {
    screen: EditProfile,
    navigationOptions: {
      headerShown: false,
      cardStyle: { backgroundColor: "white" },
    },
  },
};

const discoverScreens = {
  discoverScreen: {
    screen: DiscoverList,
    navigationOptions: {
      headerShown: false,
      cardStyle: { backgroundColor: "white" },
    },
  },
};

const bookshelfNavigation = createStackNavigator(bookshelfScreens);
const profileNavigation = createStackNavigator(profileScreens);
const discoverNavigation = createStackNavigator(discoverScreens);

const userScreen = {
  discover: {
    screen: discoverNavigation,
  },
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
      headerShown: false,
    },
  },
  user: {
    screen: userNavigation,
    navigationOptions: {
      headerLeft: () => null,
      gestureEnabled: false,
    },
  },
});

const AppNavigator = createAppContainer(rootNavigation);

export default AppNavigator;
