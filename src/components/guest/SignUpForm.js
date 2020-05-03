import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";

import { Input, CardSection, Spinner } from "../common";
import {
  usernameAdd,
  passwordAdd,
  SignUpSubmit,
} from "../../actions/SignUpActions";

// -------------------------- TO DO  --------------------------
// * Design
// ------------------------------------------------------------

class SignUpForm extends Component {
  onUsernameChange(text) {
    this.props.usernameAdd(text);
  }

  onPasswordChange(text) {
    this.props.passwordAdd(text);
  }

  signUpPress() {
    const { username, password } = this.props;
    this.props.SignUpSubmit(
      { username, password },
      this.props.navigation.navigate
    );
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return <Button onPress={this.signUpPress.bind(this)} title="SignUp" />;
  }

  renderError() {
    if (this.props.error) {
      return (
        <View>
          <Text>{this.props.error}</Text>
        </View>
      );
    }
  }

  goBack = () => {
    this.props.navigation.navigate("default");
  };

  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Username"
            placeholder="username"
            onChangeText={this.onUsernameChange.bind(this)}
            value={this.props.username}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        {this.renderError()}
        {this.renderButton()}

        <Button onPress={this.goBack} title="Back" />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.signup.username,
    password: state.signup.password,
    error: state.signup.error,
    loading: state.signup.loading,
  };
};

const mapDispatchToProps = { usernameAdd, passwordAdd, SignUpSubmit };

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
