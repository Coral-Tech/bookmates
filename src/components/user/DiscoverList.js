import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";

import { Spinner } from "../common";
import { booksDiscoverFetch } from "../../actions/DiscoverActions";

// -------------------------- TO DO  --------------------------
// * Show books - check the double mapping
// * Add starring capability
// * Add borrow request capability
// * Design
// ------------------------------------------------------------

class DiscoverList extends Component {
  componentDidMount() {
    this.props.booksDiscoverFetch();
  }

  renderRow(item) {
    const { book_name, author_name } = item.item.book;
    const { name, lastname, location } = item.item.user;

    return (
      <View>
        <Text>Book: {book_name}</Text>
        <Text>Author: {author_name}</Text>
        <Text>Owner: {name}</Text>

        <Text></Text>
      </View>
    );
  }

  renderList() {
    if (this.props.loading) {
      return <Spinner />;
    }

    console.log(this.props.data);

    return (
      <FlatList
        data={this.props.data || []}
        renderItem={(item) => this.renderRow(item)}
        keyExtractor={(item) => item.book.book_id}
      />
    );
  }

  render() {
    return <View>{this.renderList()}</View>;
  }
}

const mapStateToProps = (state) => {
  // Black magic by Aref
  const data_filtered = Object.values(state.discover.data || []).filter(
    (item) => {
      let result = {};
      if (typeof item.books !== "undefined") {
        result[item.user_data.userid] = item;
      }
      return Object.keys(result).length ? result : false;
    }
  );

  const data_filtred_map = _.flatMap(data_filtered, (user, id) => {
    const { name, lastname, location, userid } = user.user_data;
    const { owned_books } = user.books;

    const books_mapped = _.flatMap(owned_books, (book, id) => {
      const {
        book_name,
        author_name,
        datetime_added,
        cover,
      } = book.book_details;

      const book_id = id;

      return {
        user: { name, lastname, location, userid },
        book: { book_id, book_name, author_name, datetime_added, cover },
      };
    });

    return books_mapped;
  });

  return {
    data: data_filtred_map,
    loading: state.discover.loading,
  };
};

export default connect(mapStateToProps, { booksDiscoverFetch })(DiscoverList);
