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

  // // RENDER BORROWED BOOKS

  // borrowOption = (item) => {
  //   const book_details = {
  //     author_name: item.book.author_name,
  //     book_name: item.book.book_name,
  //     cover: item.book.cover,
  //     datetime_added: item.book.datetime_added,
  //     owner_uid: item.user.userid,
  //     name_owner: item.user.name,
  //     lastname_owner: item.user.lastname,
  //     name_user: this.props.logged_in_user.name,
  //     lastname_user: this.props.logged_in_user.lastname,
  //   };

  //   this.props.borrowRequest(item.book.book_id, book_details);
  //   this.props.borrowedRequestsFetch();
  // };

  // removeBorrowOption = (item) => {
  //   this.props.removeBorrowRequest(item.book.book_id, item.user.userid);
  //   this.props.borrowedRequestsFetch();
  // };

  // renderBorrowButton(item) {
  //   if (this.props.loading_borrowed) {
  //     return <Spinner />;
  //   }

  //   if (this.props.borrow_request.includes(item.book.book_id)) {
  //     return (
  //       <Button
  //         onPress={() => this.removeBorrowOption(item)}
  //         title="Remove Borrow Request"
  //       />
  //     );
  //   }
  //   return (
  //     <Button onPress={() => this.borrowOption(item)} title="Borrow Request" />
  //   );
  // }

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
    const { u_name, u_lastname, u_location } = book.item.b_owner_details;

    return (
      <View>
        <Text>Book: {b_name}</Text>
        <Text>Author: {b_author}</Text>
        <Text>
          Owner: {u_name} {u_lastname}
        </Text>
        <Text>Location: {u_location}</Text>
        {this.renderStarButton(book.item)}
        {/* {this.renderBorrowButton(item.item)} */}
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
        data={this.props.all_books || []}
        renderItem={(book) => this.renderRow(book)}
        keyExtractor={(book) => book.b_uid}
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

  const all_books_filtered = Object.values(all_books_mapped || []).filter(
    (book) => {
      let result = {};
      if (typeof book !== "undefined") {
        if (book.b_owner_details.u_id !== Firebase.auth().currentUser.uid) {
          result[book.b_owner_details.u_id] = book;
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

  //   const books_mapped = _.flatMap(owned_books || [], (book, id) => {
  //     const {
  //       added_by,
  //       book_name,
  //       author_name,
  //       datetime_added,
  //       cover,
  //     } = book.book_details;

  //     const book_id = id;

  //     return {
  //       user: { name, lastname, location, userid },
  //       book: {
  //         added_by,
  //         book_id,
  //         book_name,
  //         author_name,
  //         datetime_added,
  //         cover,
  //         status: book.status,
  //       },
  //     };
  //   });

  //   return books_mapped;
  // });

  // const data_filtred_map_notBorrowed = data_filtred_map.filter((item) => {
  //   return (
  //     item.book.status === undefined || item.book.status.borrowed === false
  //   );
  // });

  // const borrowed_request_id = _.flatMap(
  //   state.borrow_request.borrowed_books_request || [],
  //   (book, id) => {
  //     return id;
  //   }
  // );

  return {
    all_books: all_books_filtered,
    loading: state.discover.loading,
    starred_books: starred_b_id,
    loading_star: state.star.loading,
    // borrow_request: borrowed_request_id,
    // loading_borrowed: state.borrow_request.loading,
    // logged_in_user: state.profile.user_data,
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
