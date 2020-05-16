export const Styles = {
  // Start up
  startupScreen: {
    boundingBox: {
      flex: 1,
    },
    logoBox: {
      height: "55%",
      paddingTop: "50%",
      alignItems: "center",
    },
    buttonBox: {
      height: "45%",
      alignItems: "center",
      justifyContent: "center",
    },
    touchableOpacityBox: { paddingBottom: "3%" },
    imageStyle: { height: 150, resizeMode: "contain" },
    buttonStyle: { height: 60, resizeMode: "contain" },
  },

  // Log in

  logInScreen: {
    boundingBox: {
      flex: 1,
    },
    inputBox: {
      height: "50%",

      alignItems: "center",
      justifyContent: "flex-end",
    },
    buttonBox: {
      height: "50%",

      alignItems: "center",
      justifyContent: "center",
    },
    inputForm: {},
    logInButton: {},
    backButton: {},
    errorMessage: {},
  },

  // Sign up

  signUpScreen: {},

  // Add profile

  addProfileScreen: {},

  // Profile

  profileScreen: {},

  // Discover
  discoverScreen: {
    bookBox: {
      flex: 1,
      flexDirection: "row",
      height: 200,
    },
    imageBox: {
      width: "35%",
      justifyContent: "center",
    },
    imageStyle: {
      height: 150,
      resizeMode: "contain",
    },
    detailBox: {
      width: "65%",
      padding: "5%",
    },
    textBox: {
      height: "70%",
    },
    bookTitleStyle: {
      fontSize: 20,
      fontWeight: "bold",
    },
    bookAuthorStyle: {
      fontSize: 17,
    },

    lenderDataDetailBox: {
      flexDirection: "row",
    },

    iconStyle: {
      height: "100%",
      width: "10%",
      resizeMode: "contain",
    },
    lenderDataStyle: {
      fontSize: 15,
      color: "#6a6a6a",
    },

    buttonBox: {
      height: "20%",
      flexDirection: "row",
    },
    borrowButtonBox: {
      width: "60%",
      alignItems: "center",
    },
    starButtonBox: {
      width: "40%",
      alignItems: "center",
    },
    borrowButtonStyle: {
      height: "100%",
      resizeMode: "contain",
    },
    starButtonStyle: {
      height: "100%",
      resizeMode: "contain",
    },
  },

  bookshelfBorrowScreen: {
    boundingBox: {
      flex: 1,
    },
    navigatorButtonBox: {
      flexDirection: "row",
      justifyContent: "space-around",
      height: "5%",
    },

    otherStyleBox: {
      backgroundColor: "white",
      width: "50%",
      alignItems: "center",
      borderColor: "#CCCCCC",
      borderWidth: 1,
      justifyContent: "center",
    },
    selectionStyleBox: {
      backgroundColor: "#9BFFF9",
      width: "50%",
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#CCCCCC",
      borderWidth: 1,
    },
    otherTextStyle: {
      color: "#7E7E7E",
      fontWeight: "600",
    },
    selectionTextStyle: {
      fontWeight: "600",
    },
  },

  // Bookshelf
  bookshelfScreen: {
    boundingBox: {
      flex: 1,
    },
    titleStyle: {
      fontSize: 15,
      fontWeight: "bold",
      paddingLeft: "6%",
    },
    bookBox: {
      flex: 1,
      flexDirection: "row",
      height: 200,
    },
    imageBox: {
      width: "35%",
      justifyContent: "center",
    },
    imageStyle: {
      height: 150,
      resizeMode: "contain",
    },
    detailBox: {
      width: "65%",
      padding: "5%",
    },
    textBoxMyBooks: {
      height: "70%",
      // alignItems: "center",
      justifyContent: "center",
    },
    textBox: {
      height: "70%",
    },
    bookTitleStyle: {
      fontSize: 20,
      fontWeight: "bold",
    },
    bookAuthorStyle: {
      fontSize: 17,
    },
    lenderDataDetailBox: {
      flexDirection: "row",
      paddingRight: "10%",
    },
    iconStyle: {
      height: "100%",
      width: "10%",
      resizeMode: "contain",
    },
    lenderDataStyle: {
      fontSize: 15,
      color: "#6a6a6a",
    },
    buttonBox: {
      height: "60%",
      justifyContent: "space-around",
    },
    touchableOpacityBox: {
      alignItems: "center",
    },
    acceptStyle: {
      fontSize: 15,
      color: "#407EF4",
      fontWeight: "bold",
    },
    removeStyle: {
      fontSize: 15,
      color: "#F57575",
      fontWeight: "bold",
    },
    addBookContainer: {
      alignItems: "center",
      justifyContent: "center",
      height: 400,
    },
    addBookStyle: {
      fontSize: 15,
      alignItems: "center",
    },
  },

  // Add book
  addBookScreen: {},

  // Borrowed book
  borrowedBookScreen: {
    titleStyle: {
      fontSize: 15,
      fontWeight: "bold",
      paddingLeft: "6%",
    },
    addBookContainer: {
      alignItems: "center",
      justifyContent: "center",
      height: 400,
    },
    addBookStyle: {
      fontSize: 15,
      alignItems: "center",
    },
    bookBox: {
      flex: 1,
      flexDirection: "row",
      height: 200,
    },
    imageBox: {
      width: "35%",
      justifyContent: "center",
    },
    colorCodeStyle: {
      borderWidth: 1,
      height: 150,
      width: 5,
    },
    imageStyle: {
      height: 150,
      resizeMode: "contain",
    },
    detailBox: {
      width: "65%",
      padding: "5%",
    },
    textBox: {
      height: "70%",
    },
    bookTitleStyle: {
      fontSize: 20,
      fontWeight: "bold",
    },
    bookAuthorStyle: {
      fontSize: 17,
    },
    lenderDataDetailBox: {
      flexDirection: "row",
      paddingRight: "10%",
    },
    iconStyle: {
      height: "100%",
      width: "10%",
      resizeMode: "contain",
    },
    lenderDataStyle: {
      fontSize: 15,
      color: "#6a6a6a",
    },
    buttonBox: {
      height: "60%",
      justifyContent: "space-around",
    },
    touchableOpacityBox: {
      alignItems: "center",
    },
    acceptStyle: {
      fontSize: 15,
      color: "#407EF4",
      fontWeight: "bold",
    },

    actionStyle: {
      fontSize: 15,
      color: "#407EF4",
      fontWeight: "500",
    },
    removeStyle: {
      fontSize: 15,
      color: "#F57575",
      fontWeight: "bold",
    },
  },
};

//   borderWidth: 2,
//   borderColor: "blue",
