import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { Input, CardSection, Spinner } from "../common";
import { connect } from "react-redux";

import {
  profileNameAdd,
  profileLastNameAdd,
  profileLocationAdd,
  profileAddSubmit,
} from "../../actions/AddProfileActions";

class AddBook extends Component {
  onNameChange(text) {
    this.props.profileNameAdd(text);
  }

  onLastNameChange(text) {
    this.props.profileLastNameAdd(text);
  }

  onLocationChange(text) {
    this.props.profileLocationAdd(text);
  }

  addProfilePress() {
    const { name, lastname, location } = this.props;
    this.props.profileAddSubmit(
      { name, lastname, location },
      this.props.navigation.navigate
    );
  }

  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="Sebastian"
            onChangeText={this.onNameChange.bind(this)}
            value={this.props.name}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Last Name"
            placeholder="Montero"
            onChangeText={this.onLastNameChange.bind(this)}
            value={this.props.lastname}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Location"
            placeholder="London"
            onChangeText={this.onLocationChange.bind(this)}
            value={this.props.location}
          />
        </CardSection>

        <Button
          onPress={this.addProfilePress.bind(this)}
          title="Finsih sign up"
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.addprofile.name,
    lastname: state.addprofile.lastname,
    location: state.addprofile.location,
  };
};

const mapDispatchToProps = {
  profileNameAdd,
  profileLastNameAdd,
  profileLocationAdd,
  profileAddSubmit,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
