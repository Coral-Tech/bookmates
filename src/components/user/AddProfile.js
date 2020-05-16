import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { Input, CardSection, Spinner } from "../common";
import { connect } from "react-redux";

import {
  profileNameAdd,
  profileLastNameAdd,
  profileLocationAdd,
  profilePhoneAdd,
  profileAddSubmit,
} from "../../actions/AddProfileActions";

// -------------------------- TO DO  --------------------------
// * Design
// ------------------------------------------------------------

class AddBook extends Component {
  onNameChange(text) {
    this.props.profileNameAdd(text);
  }

  onLastNameChange(text) {
    this.props.profileLastNameAdd(text);
  }

  onPhoneChange(text) {
    this.props.profilePhoneAdd(text);
  }

  onLocationChange(text) {
    this.props.profileLocationAdd(text);
  }

  addProfilePress() {
    const { u_name, u_lastname, u_phone, u_location } = this.props;
    this.props.profileAddSubmit(
      { u_name, u_lastname, u_phone, u_location },
      this.props.navigation.navigate
    );
  }

  render() {
    return (
      <View style={{ paddingTop: 100 }}>
        <CardSection>
          <Input
            label="Name"
            placeholder="Winston"
            onChangeText={this.onNameChange.bind(this)}
            value={this.props.u_name}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Last Name"
            placeholder="Smith"
            onChangeText={this.onLastNameChange.bind(this)}
            value={this.props.u_lastname}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="+00 (0) 0000 000 000"
            onChangeText={this.onPhoneChange.bind(this)}
            value={this.props.u_phone}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Location"
            placeholder="London"
            onChangeText={this.onLocationChange.bind(this)}
            value={this.props.u_location}
          />
        </CardSection>

        <Button
          onPress={this.addProfilePress.bind(this)}
          title="Finish sign up"
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    u_name: state.addprofile.u_name,
    u_lastname: state.addprofile.u_lastname,
    u_location: state.addprofile.u_location,
    u_phone: state.addprofile.u_phone,
  };
};

const mapDispatchToProps = {
  profileNameAdd,
  profileLastNameAdd,
  profileLocationAdd,
  profilePhoneAdd,
  profileAddSubmit,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
