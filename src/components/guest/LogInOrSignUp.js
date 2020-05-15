import React, { Component } from "react";
import { TouchableOpacity, View, Text, Button, Image } from "react-native";
import { Styles } from "../../StyleSheet";

// -------------------------- TO DO  --------------------------
// * Design
// ------------------------------------------------------------

class LoginOrSignUp extends Component {
  logIn = () => {
    this.props.navigation.navigate("login");
  };

  signUp = () => {
    this.props.navigation.navigate("signup");
  };

  render() {
    const {
      boundingBox,
      logoBox,
      buttonBox,
      imageStyle,
      buttonStyle,
      touchableOpacityBox,
    } = Styles.startupScreen;
    return (
      <View style={boundingBox}>
        <View style={logoBox}>
          <Image
            style={imageStyle}
            source={require("../../img/startupScreen/logo.png")}
          />
        </View>
        <View style={buttonBox}>
          <TouchableOpacity onPress={this.logIn} style={touchableOpacityBox}>
            <Image
              style={buttonStyle}
              source={require("../../img/startupScreen/logInButton.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.signUp}>
            <Image
              style={buttonStyle}
              source={require("../../img/startupScreen/signUpButton.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default LoginOrSignUp;
