import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";
import { Spinner } from "../common";

import {
  borrowedRequestsFetch,
  removeBorrowRequest,
  pickUpBooksFetch,
  removePickUp,
  borrowedBooksFetch,
} from "../../actions/BorrowActions";

// -------------------------- TO DO  --------------------------
// * Design
// ------------------------------------------------------------
// console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");

class BorrowList extends Component {
  componentDidMount() {
    this.props.borrowedRequestsFetch();
    this.props.pickUpBooksFetch();
    this.props.borrowedBooksFetch();
  }

  // RENDER BORROWED BOOKS

  renderBorrowedBooksRow(book) {
    if (book) {
      const { b_name, b_author, b_cover, b_added_date } = book.item.b_details;
      const { u_name, u_lastname, u_phone } = book.item.b_lender_details;

      return (
        <View>
          <Text>{b_name}</Text>
          <Text>{b_author}</Text>
          <Text>
            Lender: {u_name} {u_lastname}
          </Text>
          <Text>Contact: {u_phone}</Text>
        </View>
      );
    }
  }

  renderBorrowedBooks() {
    if (this.props.borrowed_books_loading) {
      return <Spinner />;
    }

    return (
      <FlatList
        data={this.props.borrowed_books || []}
        renderItem={(book) => this.renderBorrowedBooksRow(book)}
        keyExtractor={(book) => book.b_id}
      />
    );
  }

  // RENDER PICK UP BOOKS

  removePickUpOption = (book) => {
    this.props.removePickUp(book);
    this.props.pickUpBooksFetch();
  };

  renderPickUpBooksRow(book) {
    if (book) {
      const { b_name, b_author, b_cover, b_added_date } = book.item.b_details;
      const { u_name, u_lastname, u_phone } = book.item.b_lender_details;

      return (
        <View>
          <Text>{b_name}</Text>
          <Text>{b_author}</Text>
          <Text>
            Lender: {u_name} {u_lastname}
          </Text>
          <Text>Contact: {u_phone}</Text>
          <Button
            onPress={() => this.removePickUpOption(book.item)}
            title="Cancel PickUp"
          />
        </View>
      );
    }
  }

  renderPickUpBooks() {
    if (this.props.pickup_books_loading) {
      return <Spinner />;
    }

    return (
      <FlatList
        data={this.props.pickup_books || []}
        renderItem={(book) => this.renderPickUpBooksRow(book)}
        keyExtractor={(book) => book.b_id}
      />
    );
  }

  // RENDER REQUESTS SENT

  removeBorrowOption = (book) => {
    this.props.removeBorrowRequest(book);
    this.props.borrowedRequestsFetch();
  };

  renderRequestSentRow(book) {
    if (book) {
      const { b_name, b_author, b_cover, b_added_date } = book.item.b_details;
      const { u_name, u_lastname } = book.item.b_lender_details;

      return (
        <View>
          <Text>{b_name}</Text>
          <Text>{b_author}</Text>
          <Text>
            Lender: {u_name} {u_lastname}
          </Text>
          <Button
            onPress={() => this.removeBorrowOption(book.item)}
            title="Remove Borrow Request"
          />
        </View>
      );
    }
  }

  renderRequestSent() {
    if (this.props.borrowed_books_request_loading) {
      return <Spinner />;
    }

    return (
      <FlatList
        data={this.props.borrowed_books_request || []}
        renderItem={(book) => this.renderRequestSentRow(book)}
        keyExtractor={(book) => book.b_id}
      />
    );
  }

  // RENDER ALL

  render() {
    return (
      <View>
        <Button
          onPress={() => {
            this.props.navigation.navigate("bookshelfBooks");
          }}
          title="go to Bookshelf"
        />

        <Text>Books borrowed </Text>
        {this.renderBorrowedBooks()}
        <Text></Text>
        <Text>----------------------------------------------------------</Text>
        <Text>Pick up books </Text>
        {this.renderPickUpBooks()}
        <Text></Text>
        <Text>----------------------------------------------------------</Text>
        <Text>Requests sent </Text>
        {this.renderRequestSent()}
        <Text></Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const borrow_books_requests_mapped = _.map(
    state.borrow.borrowed_books_request || [],
    (b_details, b_id) => {
      return b_details;
    }
  );

  const pickup_books_mapped = _.map(
    state.borrow.pickup_books || [],
    (b_details, b_id) => {
      return b_details;
    }
  );

  const borrowed_books_mapped = _.map(
    state.borrow.borrowed_books || [],
    (b_details, b_id) => {
      return b_details;
    }
  );

  return {
    borrowed_books_request: borrow_books_requests_mapped,
    borrowed_books_request_loading: state.borrow.borrowed_books_request_loading,

    pickup_books: pickup_books_mapped,
    pickup_books_loading: state.borrow.pickup_books_loading,

    borrowed_books: borrowed_books_mapped,
    borrowed_books_loading: state.borrow.borrowed_books_loading,
  };
};

export default connect(mapStateToProps, {
  borrowedRequestsFetch,
  removeBorrowRequest,
  pickUpBooksFetch,
  removePickUp,
  borrowedBooksFetch,
})(BorrowList);
