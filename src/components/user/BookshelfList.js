import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";

import { Spinner } from "../common";
import { booksBookshelfFetch } from "../../actions/BookshelfActions";
import { starBooksFetch, removeBook } from "../../actions/StarBookActions";

// -------------------------- TO DO  --------------------------
// * Add edit to each owned book
// * Add borrowed books
// * Design
// ------------------------------------------------------------

class BookshelfList extends Component {
  componentDidMount() {
    this.props.booksBookshelfFetch();
    this.props.starBooksFetch();
  }

  addBookScreen = () => {
    this.props.navigation.navigate("bookshelfadd");
  };

  renderOwnedBooksRow(book) {
    if (book) {
      const { book_name, author_name, cover, datetime_added } = book;
      return (
        <View>
          <Text>{book_name}</Text>
          <Text>{author_name}</Text>
          <Text>Added: {datetime_added}</Text>
          <Text></Text>
        </View>
      );
    }
  }

  renderOwnedBooks() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return (
      <FlatList
        data={this.props.booklist || []}
        renderItem={(book) => this.renderOwnedBooksRow(book.item.book_details)}
        keyExtractor={(book) => book.uid}
      />
    );
  }

  removeStarOption = (book) => {
    this.props.removeBook(book.book_id);
    this.props.starBooksFetch();
  };

  renderStarredBooksRow(book) {
    if (book) {
      const { book_name, author_name, cover, datetime_added } = book;
      return (
        <View>
          <Text>{book_name}</Text>
          <Text>{author_name}</Text>
          <Text>Added: {datetime_added}</Text>
          <Button onPress={() => this.removeStarOption(book)} title="Unstar" />
          <Text></Text>
        </View>
      );
    }
  }

  renderStarredBooks() {
    if (this.props.loading_starred) {
      return <Spinner />;
    }

    return (
      <FlatList
        data={this.props.starred_books || []}
        renderItem={(book) => this.renderStarredBooksRow(book.item)}
        keyExtractor={(book) => book.book_id}
      />
    );
  }

  render() {
    return (
      <View>
        <Text>Owned books</Text>
        {this.renderOwnedBooks()}
        <Button onPress={this.addBookScreen} title="Add Book" />
        <Text></Text>
        <Text>Starred books</Text>
        {this.renderStarredBooks()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const booklist_clean = _.map(state.bookshelf.booklist || [], (val, uid) => {
    return { ...val, uid };
  });

  const starred_books_mapped = _.map(
    state.star.starred_books || [],
    (val, uid) => {
      return { ...val, book_id: uid };
    }
  );

  return {
    booklist: booklist_clean,
    loading: state.bookshelf.loading,
    starred_books: starred_books_mapped,
    loading_starred: state.star.loading,
  };
};

export default connect(mapStateToProps, {
  booksBookshelfFetch,
  starBooksFetch,
  removeBook,
})(BookshelfList);
