import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";

import { Spinner } from "../common";
import { profileFetch, profileSignOut } from "../../actions/ProfileActions";

// -------------------------- TO DO  --------------------------
// * Design
// * Profile edit
// * Profile image add
// ------------------------------------------------------------

class Profile extends Component {
  componentDidMount() {
    this.props.profileFetch();
  }

  signOut = () => {
    this.props.profileSignOut(this.props.navigation.navigate);
  };

  editProfile = () => {
    this.props.navigation.navigate("profileEdit");
  };

  renderProfile() {
    if (this.props.loading) {
      return <Spinner />;
    }

    if (this.props.u_details) {
      const {
        u_name,
        u_lastname,
        u_phone,
        u_email,
        u_location,
      } = this.props.u_details;
      return (
        <View>
          <Text>Name: {u_name || []}</Text>
          <Text>Last Name: {u_lastname || []}</Text>
          <Text>Phone: {u_phone || []}</Text>
          <Text>Email: {u_email || []}</Text>
          <Text>Location: {u_location || []}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View>
        <Text>Profile</Text>
        {this.renderProfile()}
        <Button onPress={this.editProfile} title="Edit Profile" />
        <Button onPress={this.signOut} title="Sign Out" />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    u_details: state.profile.u_details,
    loading: state.profile.loading,
  };
};

export default connect(mapStateToProps, { profileFetch, profileSignOut })(
  Profile
);
