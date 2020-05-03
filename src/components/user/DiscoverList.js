import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";

import { Spinner } from "../common";
import { booksDiscoverFetch } from "../../actions/DiscoverActions";

class DiscoverList extends Component {
  componentDidMount() {
    this.props.booksDiscoverFetch();
  }

  renderRow(book) {
    return (
      <View>
        <Text>{this.props.data}</Text>
        <Text></Text>
      </View>
    );
  }

  renderList() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <FlatList
        data={this.props.data || []}
        renderItem={(book) => this.renderRow(book)}
        keyExtractor={(book) => book.uid}
      />
    );
  }

  render() {
    return <View>{this.renderList()}</View>;
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.discover.data,
    loading: state.discover.loading,
  };
};

export default connect(mapStateToProps, { booksDiscoverFetch })(DiscoverList);
