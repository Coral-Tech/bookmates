import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";

import { Spinner } from "../common";
import { booksDiscoverFetch } from "../../actions/DiscoverActions";
import {
  starBook,
  starBooksFetch,
  removeBook,
} from "../../actions/StarBookActions";
import Firebase from "../../Firebase";

// -------------------------- TO DO  --------------------------
// * Add borrow request capability
// * Design
// ------------------------------------------------------------

class DiscoverList extends Component {
  componentDidMount() {
    this.props.booksDiscoverFetch();
  }

  starOption = (item) => {
    const book_details = {
      author_name: item.author_name,
      book_name: item.book_name,
      cover: item.cover,
      datetime_added: item.datetime_added,
    };

    this.props.starBook(item.book_id, book_details);
    this.props.starBooksFetch();
  };

  removeStarOption = (item) => {
    this.props.removeBook(item.book_id);
    this.props.starBooksFetch();
  };

  renderStarButton(item) {
    if (this.props.loading_star) {
      return <Spinner />;
    }
    if (this.props.starred_books.includes(item.book_id)) {
      return (
        <Button onPress={() => this.removeStarOption(item)} title="Unstar" />
      );
    }
    return <Button onPress={() => this.starOption(item)} title="Star" />;
  }

  renderRow(item) {
    const { book_name, author_name, book_id } = item.item.book;
    const { name, lastname, location, userid } = item.item.user;

    return (
      <View>
        <Text>Book: {book_name}</Text>
        <Text>Author: {author_name}</Text>
        <Text>Owner: {name}</Text>
        {this.renderStarButton(item.item.book)}
        <Text></Text>
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
        if (item.user_data.userid !== Firebase.auth().currentUser.uid) {
          result[item.user_data.userid] = item;
        }
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

  const starred_book_id = _.flatMap(
    state.star.starred_books || [],
    (book, id) => {
      return id;
    }
  );

  return {
    data: data_filtred_map,
    loading: state.discover.loading,
    starred_books: starred_book_id,
    loading_star: state.star.loading,
  };
};

export default connect(mapStateToProps, {
  booksDiscoverFetch,
  starBook,
  starBooksFetch,
  removeBook,
})(DiscoverList);
