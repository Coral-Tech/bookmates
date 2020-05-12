import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";

import { Spinner } from "../common";

// -------------------------- TO DO  --------------------------
// * Design
// ------------------------------------------------------------

class BorrowList extends Component {
  componentDidMount() {}

  render() {
    return (
      <View>
        <Button
          onPress={() => {
            this.props.navigation.navigate("bookshelfBooks");
          }}
          title="go to Bookshelf"
        />

        <Text>Books borrowed </Text>
        <Text></Text>
        <Text>----------------------------------------------------------</Text>
        <Text>Pick up books </Text>
        <Text></Text>
        <Text>----------------------------------------------------------</Text>
        <Text>Requests sent </Text>
        <Text></Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(BorrowList);
