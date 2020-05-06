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

import {
  borrowedRequestsFetch,
  borrowRequest,
  removeBorrowRequest,
} from "../../actions/BorrowRequestActions";

import Firebase from "../../Firebase";

// -------------------------- TO DO  --------------------------
// * Design
// ------------------------------------------------------------

class DiscoverList extends Component {
  componentDidMount() {
    this.props.booksDiscoverFetch();
  }

  // RENDER STARRED BOOKS

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

  // RENDER BORROWED BOOKS

  borrowOption = (item) => {
    const book_details = {
      author_name: item.book.author_name,
      book_name: item.book.book_name,
      cover: item.book.cover,
      datetime_added: item.book.datetime_added,
      owner_uid: item.user.userid,
      name_owner: item.user.name,
      lastname_owner: item.user.lastname,
      name_user: this.props.logged_in_user.name,
      lastname_user: this.props.logged_in_user.lastname,
    };

    this.props.borrowRequest(item.book.book_id, book_details);
    this.props.borrowedRequestsFetch();
  };

  removeBorrowOption = (item) => {
    this.props.removeBorrowRequest(item.book.book_id, item.user.userid);
    this.props.borrowedRequestsFetch();
  };

  renderBorrowButton(item) {
    if (this.props.loading_borrowed) {
      return <Spinner />;
    }

    if (this.props.borrow_request.includes(item.book.book_id)) {
      return (
        <Button
          onPress={() => this.removeBorrowOption(item)}
          title="Remove Borrow Request"
        />
      );
    }
    return (
      <Button onPress={() => this.borrowOption(item)} title="Borrow Request" />
    );
  }

  // RENDER ALL ITEMS

  renderRow(item) {
    const { book_name, author_name, book_id } = item.item.book;
    const { name, lastname, location, userid } = item.item.user;

    return (
      <View>
        <Text>Book: {book_name}</Text>
        <Text>Author: {author_name}</Text>
        <Text>
          Owner: {name} {lastname}
        </Text>
        {this.renderStarButton(item.item.book)}
        {this.renderBorrowButton(item.item)}
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

  const borrowed_request_id = _.flatMap(
    state.borrow_request.borrowed_books_request || [],
    (book, id) => {
      return id;
    }
  );

  return {
    data: data_filtred_map,
    loading: state.discover.loading,
    starred_books: starred_book_id,
    loading_star: state.star.loading,
    borrow_request: borrowed_request_id,
    loading_borrowed: state.borrow_request.loading,
    logged_in_user: state.profile.user_data,
  };
};

export default connect(mapStateToProps, {
  booksDiscoverFetch,
  starBook,
  starBooksFetch,
  removeBook,

  borrowedRequestsFetch,
  borrowRequest,
  removeBorrowRequest,
})(DiscoverList);
