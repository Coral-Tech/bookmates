import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";

// // Screens
import LoginOrSignUp from "./components/guest/LogInOrSignUp";
import SignUpForm from "./components/guest/SignUpForm";
import LoginForm from "./components/guest/LoginForm";

import BookshelfList from "./components/user/BookshelfList";
import AddBook from "./components/user/AddBook";
import DiscoverList from "./components/user/DiscoverList";
import Profile from "./components/user/Profile";

// Guest screens
const guestScreens = {
  default: { screen: LoginOrSignUp },
  login: { screen: LoginForm },
  signup: { screen: SignUpForm },
};
const guestNavigation = createStackNavigator(guestScreens);

// User screens

//   Bookshelf
const bookshelfScreens = {
  bookshelfBooks: { screen: BookshelfList },
  bookshelfadd: { screen: AddBook },
  // bookshelfedit: { screen: BookshelfList },
};

const bookshelfNavigation = createStackNavigator(bookshelfScreens);

const userScreen = {
  discover: { screen: DiscoverList },
  bookshelf: { screen: bookshelfNavigation },
  profile: { screen: Profile },
};
const userNavigation = createBottomTabNavigator(userScreen);

const rootNavigation = createStackNavigator({
  guest: { screen: guestNavigation },
  user: {
    screen: userNavigation,
    navigationOptions: { headerLeft: () => null },
  },
});

const AppNavigator = createAppContainer(rootNavigation);

export default AppNavigator;

// import React from "react";
// import { Scene, Router, Actions } from "react-native-router-flux";

// const RouterComponent = () => {
//   return (
//     <Router>
//       <Scene key="root">
//         <Scene key="guest" title="Guest" component={LoginOrSignUp} initial>
//           <Scene key="login" component={LoginForm} title="Please login" />
//           <Scene key="signup" component={SignUpForm} title="Please SignUp" />
//         </Scene>
//         <Scene key="main">
//           <Scene key="bookshelf">
//             <Scene
//               key="bookshelf"
//               component={BookshelfList}
//               title="Books"
//               initial
//             ></Scene>
//             <Scene
//               key="bookshelfAdd"
//               component={AddBook}
//               title="Add Book"
//             ></Scene>
//           </Scene>
//         </Scene>
//       </Scene>
//     </Router>
//   );
// };

// export default RouterComponent;
