import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";

import { Spinner } from "../common";
import { booksDiscoverFetch } from "../../actions/DiscoverActions";

// -------------------------- TO DO  --------------------------
// * Show books
// * Add starring capability
// * Add borrow request capability
// * Design
// ------------------------------------------------------------

class DiscoverList extends Component {
  componentDidMount() {
    this.props.booksDiscoverFetch();
  }

  // renderRow(book) {
  //   return (
  //     <View>
  //       <Text>{this.props.data}</Text>
  //       <Text></Text>
  //     </View>
  //   );
  // }

  renderList() {
    if (this.props.loading) {
      return <Spinner />;
    }
    console.log("___________________________________");
    console.log(this.props.data);
    console.log("___________________________________");
    return (
      // <FlatList
      //   data={this.props.data || []}
      //   renderItem={(book) => this.renderRow(book)}
      //   keyExtractor={(book) => book.uid}
      // />
      <View></View>
    );
  }

  render() {
    return <View>{this.renderList()}</View>;
  }
}

const mapStateToProps = (state) => {
  const users = _.mapValues(state.discover.data || [], (user) => {
    return {
      books: user.books.owned_books,
      name: user.user_data.name,
      last_name: user.user_data.lastname,
    };
  });

  const books = _.mapValues(users || [], (books) => {
    return books.books;
  });

  return {
    data: books,
    loading: state.discover.loading,
  };
};

export default connect(mapStateToProps, { booksDiscoverFetch })(DiscoverList);
