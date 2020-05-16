import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { Styles } from "../../StyleSheet";
import { Input, CardSection, Spinner } from "../common";
import {
  usernameAdd,
  passwordAdd,
  loginSubmit,
} from "../../actions/LogInActions";

// -------------------------- TO DO  --------------------------
// * Design
// ------------------------------------------------------------

class LoginForm extends Component {
  onUsernameChange(text) {
    this.props.usernameAdd(text);
  }

  onPasswordChange(text) {
    this.props.passwordAdd(text);
  }

  logInPress() {
    const { username, password } = this.props;
    this.props.loginSubmit(
      { username, password },
      this.props.navigation.navigate
    );
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return <Button onPress={this.logInPress.bind(this)} title="Login" />;
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
    const { boundingBox, inputBox, buttonBox } = Styles.logInScreen;

    return (
      <View style={boundingBox}>
        <View style={inputBox}>
          <CardSection>
            <Input
              label="Email"
              placeholder="email"
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
        </View>
        <View style={buttonBox}>
          {this.renderButton()}
          <Button onPress={this.goBack} title="Back" />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    password: state.login.password,
    error: state.login.error,
    loading: state.login.loading,
    user: state.login.user,
  };
};

const mapDispatchToProps = { usernameAdd, passwordAdd, loginSubmit };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
