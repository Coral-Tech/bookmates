import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";

import { Spinner } from "../common";
import { profileFetch } from "../../actions/ProfileActions";

class Profile extends Component {
  componentDidMount() {
    this.props.profileFetch();
  }

  renderProfile() {
    if (this.props.loading) {
      return <Spinner />;
    }

    if (this.props.user_data) {
      const { name, lastname, phone, email, location } = this.props.user_data;
      return (
        <View>
          <Text>Name: {name || []}</Text>
          <Text>Last Name: {lastname || []}</Text>
          <Text>Phone: {phone || []}</Text>
          <Text>Email: {email || []}</Text>
          <Text>Location: {location || []}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View>
        <Text>Profile</Text>
        {this.renderProfile()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_data: state.profile.user_data,
    loading: state.profile.loading,
  };
};

export default connect(mapStateToProps, { profileFetch })(Profile);
