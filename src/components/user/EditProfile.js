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
    const {
      u_email,
      u_lastname,
      u_location,
      u_name,
      u_phone,
      password,
    } = this.props;
    const u_details_new = { u_email, u_lastname, u_location, u_name, u_phone };

    console.log(password);

    this.props.editProfileSubmit(
      u_details_new,
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
            value={this.props.u_name}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Lastname"
            placeholder=""
            onChangeText={this.onLastNameChange.bind(this)}
            value={this.props.u_lastname}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Email"
            placeholder=""
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.u_email}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder=""
            onChangeText={this.onPhoneChange.bind(this)}
            value={this.props.u_phone}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Location"
            placeholder=""
            onChangeText={this.onLocationChange.bind(this)}
            value={this.props.u_location}
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
    u_name: state.editprofile.u_name,
    u_lastname: state.editprofile.u_lastname,
    u_email: state.editprofile.u_email,
    u_phone: state.editprofile.u_phone,
    u_location: state.editprofile.u_location,
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
