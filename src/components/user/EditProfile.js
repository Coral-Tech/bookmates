import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { Input, CardSection, Spinner } from "../common";
import { connect } from "react-redux";

import {
  nameChange,
  lastNameChange,
  phoneChange,
  locationChange,
  emailChange,
  profileFetch,
  editProfileSubmit,
  passwordSubmit,
} from "../../actions/EditProfileActions";
import { HitTestResultTypes } from "expo/build/AR";

// -------------------------- TO DO  --------------------------
// * All
// * Design
// ------------------------------------------------------------

class EditProfile extends Component {
  componentDidMount() {
    this.props.profileFetch();
  }

  onNameChange(text) {
    this.props.nameChange(text);
  }

  onLastNameChange(text) {
    this.props.lastNameChange(text);
  }

  onEmailChange(text) {
    this.props.emailChange(text);
  }

  onPhoneChange(text) {
    this.props.phoneChange(text);
  }

  onLocationChange(text) {
    this.props.locationChange(text);
  }

  onPasswordChange(text) {
    this.props.passwordSubmit(text);
  }

  editSubmitPress() {
    const { email, lastname, location, name, phone, password } = this.props;
    const user_data = { email, lastname, location, name, phone };

    console.log(password);

    this.props.editProfileSubmit(
      user_data,
      password,
      this.props.navigation.navigate
    );
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <Button
        onPress={this.editSubmitPress.bind(this)}
        title="Submit changes"
      />
    );
  }

  goBack = () => {
    this.props.navigation.navigate("profileDisplay");
  };

  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder=""
            onChangeText={this.onNameChange.bind(this)}
            value={this.props.name}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Lastname"
            placeholder=""
            onChangeText={this.onLastNameChange.bind(this)}
            value={this.props.lastname}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Email"
            placeholder=""
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder=""
            onChangeText={this.onPhoneChange.bind(this)}
            value={this.props.phone}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Location"
            placeholder=""
            onChangeText={this.onLocationChange.bind(this)}
            value={this.props.location}
          />
        </CardSection>

        <Text>Enter password to submit changes</Text>
        <CardSection>
          <Input
            label="Password"
            placeholder=""
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        {this.renderButton()}
        <Button onPress={this.goBack} title="Back" />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.editprofile.name,
    lastname: state.editprofile.lastname,
    email: state.editprofile.email,
    phone: state.editprofile.phone,
    location: state.editprofile.location,
    loading: state.editprofile.loading,
    password: state.editprofile.password,
  };
};

const mapDispatchToProps = {
  nameChange,
  lastNameChange,
  phoneChange,
  locationChange,
  emailChange,
  editProfileSubmit,
  profileFetch,
  passwordSubmit,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
