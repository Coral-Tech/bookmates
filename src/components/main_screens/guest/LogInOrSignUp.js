import React, { Component } from "react";
import { TouchableOpacity, View, Text, Button } from "react-native";

import { Actions } from "react-native-router-flux";

class LoginOrSignUp extends Component {
  logIn = () => {
    this.props.navigation.navigate("login");
  };

  signUp = () => {
    this.props.navigation.navigate("signup");
  };

  render() {
    return (
      <View>
        <Button onPress={this.logIn} title="LogIn" />
        <Button onPress={this.signUp} title="SignUp" />
      </View>
    );
  }
}

export default LoginOrSignUp;
