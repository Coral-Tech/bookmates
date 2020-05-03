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
    const { name, lastname, location } = this.props.user_data;
    return (
      <View>
        <Text>Name: {name}</Text>
        <Text>Last Name: {lastname}</Text>
        <Text>Location: {location}</Text>
      </View>
    );
  }

  render() {
    return <View>{this.renderProfile()}</View>;
  }
}

const mapStateToProps = (state) => {
  return {
    booklist: state.profile.user_data,
    loading: state.profile.loading,
  };
};

export default connect(mapStateToProps, { profileFetch })(Profile);
