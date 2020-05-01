import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";

import { Spinner } from "../common";
import { booksBookshelfFetch } from "../../actions/BookshelfActions";

class BookshelfList extends Component {
  componentDidMount() {
    this.props.booksBookshelfFetch();
  }

  addBookScreen = () => {
    this.props.navigation.navigate("bookshelfadd");
  };

  renderRow(book) {
    console.log(this.props.booklist);
    console.log(book);

    const {
      book_name,
      book_author,
      cover,
      datetime_added,
    } = book.item.book_details;
    return (
      <View>
        <Text>{book_name}</Text>
      </View>
    );
  }

  renderList() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <FlatList
        data={this.props.booklist || []}
        renderItem={(book) => this.renderRow(book)}
        keyExtractor={(book) => book.uid}
      />
    );
  }

  render() {
    return (
      <View>
        {this.renderList()}
        <Button onPress={this.addBookScreen} title="Add Book" />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const user_books = _.map(state.bookshelf.booklist || [], (val, uid) => {
    return { ...val, uid };
  });

  return {
    booklist: user_books,
    loading: state.bookshelf.loading,
  };
};

export default connect(mapStateToProps, { booksBookshelfFetch })(BookshelfList);
