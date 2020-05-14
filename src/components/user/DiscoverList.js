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
} from "../../actions/BorrowActions";

import { profileFetch } from "../../actions/ProfileActions";

import Firebase from "../../Firebase";

// -------------------------- TO DO  --------------------------
// * Design
// ------------------------------------------------------------

class DiscoverList extends Component {
  componentDidMount() {
    this.props.booksDiscoverFetch();
    this.props.profileFetch();
  }

  // RENDER BORROWED BOOKS

  borrowOption = (book) => {
    this.props.borrowRequest(book, this.props.u_details);
    this.props.borrowedRequestsFetch();
  };

  removeBorrowOption = (book) => {
    this.props.removeBorrowRequest(book);
    this.props.borrowedRequestsFetch();
  };

  renderSendBorrowRequestButton(book) {
    if (this.props.loading_borrowed) {
      return <Spinner />;
    }

    if (this.props.borrow_books.includes(book.b_id)) {
      return (
        <Button
          onPress={() => this.removeBorrowOption(book)}
          title="Remove Borrow Request"
        />
      );
    }
    return (
      <Button
        onPress={() => this.borrowOption(book)}
        title="Send borrow request"
      />
    );
  }

  // // RENDER STARRED BOOKS

  starOption = (book) => {
    this.props.starBook(book.b_id, book.b_details);
    this.props.starBooksFetch();
  };

  removeStarOption = (book) => {
    this.props.removeBook(book.b_id);
    this.props.starBooksFetch();
  };

  renderStarButton(book) {
    if (this.props.loading_star) {
      return <Spinner />;
    }
    if (this.props.starred_books.includes(book.b_id)) {
      return (
        <Button onPress={() => this.removeStarOption(book)} title="Unstar" />
      );
    }
    return <Button onPress={() => this.starOption(book)} title="Star" />;
  }

  // RENDER ALL ITEMS

  renderRow(book) {
    const { b_name, b_author, b_cover, b_added_date } = book.item.b_details;
    const { u_name, u_lastname, u_location } = book.item.b_lender_details;

    return (
      <View>
        <Text>Book: {b_name}</Text>
        <Text>Author: {b_author}</Text>
        <Text>
          Owner: {u_name} {u_lastname}
        </Text>
        <Text>Location: {u_location}</Text>
        {this.renderStarButton(book.item)}
        {this.renderSendBorrowRequestButton(book.item)}
        <Text>----------------------------------------------------------</Text>
      </View>
    );
  }

  renderList() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return (
      <FlatList
        data={this.props.all_books || []}
        renderItem={(book) => this.renderRow(book)}
        keyExtractor={(book) => book.b_id}
      />
    );
  }

  render() {
    return <View>{this.renderList()}</View>;
  }
}

const mapStateToProps = (state) => {
  // RENDER BOOKS

  const all_books_mapped = _.flatMap(
    state.discover.all_books || [],
    (b_details, b_id) => {
      return { ...b_details, b_id };
    }
  );

  // Filtering for books not from lender and available:true
  const all_books_filtered = Object.values(all_books_mapped || []).filter(
    (book) => {
      let result = {};
      if (typeof book !== "undefined") {
        if (book.b_lender_details.u_id !== Firebase.auth().currentUser.uid) {
          if (book.b_details.available === true) {
            result[book.b_lender_details.u_id] = book;
          }
        }
      }
      return Object.keys(result).length ? result : false;
    }
  );

  // STAR BOOK

  const starred_b_id = _.flatMap(
    state.star.starred_books || [],
    (b_details, b_id) => {
      return b_id;
    }
  );

  // BORROW BOOKS

  const borrow_b_id = _.flatMap(
    state.borrow.borrowed_books_request || [],
    (b_details, b_id) => {
      return b_id;
    }
  );

  return {
    all_books: all_books_filtered,
    loading: state.discover.loading,
    starred_books: starred_b_id,
    loading_star: state.star.loading,
    borrow_books: borrow_b_id,
    loading_borrowed: state.borrow.loading,
    u_details: state.profile.u_details,
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

  profileFetch,
})(DiscoverList);
