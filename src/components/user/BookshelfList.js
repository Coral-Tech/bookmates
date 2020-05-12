import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";

import { Spinner } from "../common";
import { booksBookshelfFetch } from "../../actions/BookshelfActions";

// -------------------------- TO DO  --------------------------
// * Design
// ------------------------------------------------------------

class BookshelfList extends Component {
  componentDidMount() {
    this.props.booksBookshelfFetch();
  }

  addBookScreen = () => {
    this.props.navigation.navigate("bookshelfadd");
  };

  // RENDER OWNED BOOKS

  renderOwnedBooksRow(book) {
    if (book) {
      const { b_name, b_author, b_cover, b_added_date } = book.item;
      return (
        <View>
          <Text>{b_name}</Text>
          <Text>{b_author}</Text>
          <Text>Added: {b_added_date}</Text>
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
        data={this.props.all_books || []}
        renderItem={(book) => this.renderOwnedBooksRow(book)}
        keyExtractor={(book) => book.b_id}
      />
    );
  }

  // RENDER

  render() {
    return (
      <View>
        <Button
          onPress={() => {
            this.props.navigation.navigate("borrow");
          }}
          title="Borrowed"
        />
        <Text>Lent books</Text>

        <Text>My books</Text>
        {this.renderOwnedBooks()}
        <Button onPress={this.addBookScreen} title="Add Book" />
        <Text></Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const all_books_mapped = _.map(
    state.bookshelf.all_books || [],
    (b_details, b_id) => {
      return { ...b_details, b_id };
    }
  );

  return {
    all_books: all_books_mapped,
    loading: state.bookshelf.loading,
  };
};

export default connect(mapStateToProps, {
  booksBookshelfFetch,
})(BookshelfList);
