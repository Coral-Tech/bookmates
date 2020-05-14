import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";

import { Spinner } from "../common";
import Firebase from "../../Firebase";
import {
  booksBookshelfFetch,
  requestsRecievedFetch,
  acceptRequestsRecieved,
  removeRequestsRecieved,
  requestsAcceptedFetch,
  cancelPickUp,
  markPickedUp,
  lentBooksFetch,
} from "../../actions/BookshelfActions";

import { profileFetch } from "../../actions/ProfileActions";

// -------------------------- TO DO  --------------------------
// * Design
// ------------------------------------------------------------

class BookshelfList extends Component {
  componentDidMount() {
    this.props.profileFetch();
    this.props.booksBookshelfFetch();
    this.props.requestsRecievedFetch();
    this.props.requestsAcceptedFetch();
    this.props.lentBooksFetch();
  }

  // ADD BOOK

  addBookScreen = () => {
    this.props.navigation.navigate("bookshelfadd");
  };

  // RENDER LENT BOOKS

  renderLentBooksRow(book) {
    if (book) {
      const { b_name, b_author, b_cover, b_added_date } = book.item.b_details;
      const { u_name, u_lastname, u_phone } = book.item.b_borrower_details;
      return (
        <View>
          <Text>{b_name}</Text>
          <Text>{b_author}</Text>
          <Text>
            Request from: {u_name} {u_lastname}
          </Text>
          <Text>Contact: {u_phone}</Text>
          <Text></Text>
        </View>
      );
    }
  }

  renderLentBooks() {
    if (this.props.lent_books_loading) {
      return <Spinner />;
    }

    return (
      <FlatList
        data={this.props.lent_books || []}
        renderItem={(book) => this.renderLentBooksRow(book)}
        keyExtractor={(book) => book.b_id}
      />
    );
  }

  // RENDER PICK UP PENDING

  acceptPickUpRecieved(book) {
    this.props.markPickedUp(book, this.props.u_details);
    this.props.requestsRecievedFetch();
  }

  cancelPickUp(book) {
    this.props.cancelPickUp(book);
    this.props.requestsAcceptedFetch();
  }

  renderPickUpPendingRow(book) {
    if (book) {
      const { b_name, b_author, b_cover, b_added_date } = book.item.b_details;
      const { u_name, u_lastname, u_phone } = book.item.b_borrower_details;
      return (
        <View>
          <Text>{b_name}</Text>
          <Text>{b_author}</Text>
          <Text>
            Request from: {u_name} {u_lastname}
          </Text>
          <Text>Contact: {u_phone}</Text>
          <Button
            onPress={() => this.acceptPickUpRecieved(book.item)}
            title="Picked up"
          />
          <Button
            onPress={() => this.cancelPickUp(book.item)}
            title="Cancel pickup"
          />
          <Text></Text>
        </View>
      );
    }
  }

  renderPickUpPending() {
    if (this.props.requests_accepted_loading) {
      return <Spinner />;
    }

    return (
      <FlatList
        data={this.props.requests_accepted || []}
        renderItem={(book) => this.renderPickUpPendingRow(book)}
        keyExtractor={(book) => book.b_id}
      />
    );
  }

  // RENDER REQUESTS RECIEVED

  acceptRequestRecieved(book) {
    this.props.acceptRequestsRecieved(book, this.props.u_details);
    this.props.requestsRecievedFetch();
  }

  removeRequestRecieved(book) {
    this.props.removeRequestsRecieved(book);
    this.props.requestsRecievedFetch();
  }

  renderRequestsRecievedRow(book) {
    if (book) {
      const { b_name, b_author, b_cover, b_added_date } = book.item.b_details;
      const { u_name, u_lastname } = book.item.b_borrower_details;
      return (
        <View>
          <Text>{b_name}</Text>
          <Text>{b_author}</Text>
          <Text>
            Request from: {u_name} {u_lastname}
          </Text>
          <Button
            onPress={() => this.acceptRequestRecieved(book.item)}
            title="Accept"
          />
          <Button
            onPress={() => this.removeRequestRecieved(book.item)}
            title="Delete"
          />
          <Text></Text>
        </View>
      );
    }
  }

  renderRequestsRecieved() {
    if (this.props.requests_recieved_loading) {
      return <Spinner />;
    }

    return (
      <FlatList
        data={this.props.requests_recieved || []}
        renderItem={(book) => this.renderRequestsRecievedRow(book)}
        keyExtractor={(book) => book.b_id}
      />
    );
  }

  // RENDER MY BOOKS

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
    if (this.props.my_books_loading) {
      return <Spinner />;
    }
    return (
      <FlatList
        data={this.props.my_books || []}
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
          title="go to Borrowed"
        />
        <Text>Lent books</Text>
        {this.renderLentBooks()}
        <Text>----------------------------------------------------------</Text>
        <Text>Pick up pending</Text>
        {this.renderPickUpPending()}
        <Text>----------------------------------------------------------</Text>
        <Text>Requests recieved</Text>
        {this.renderRequestsRecieved()}
        <Text>----------------------------------------------------------</Text>
        <Text>My books</Text>
        {this.renderOwnedBooks()}
        <Text>----------------------------------------------------------</Text>
        <Button onPress={this.addBookScreen} title="Add Book" />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const my_books_mapped = _.map(
    state.bookshelf.my_books || [],
    (b_details, b_id) => {
      return { ...b_details, b_id };
    }
  );

  const requests_recieved_mapped = _.map(
    state.bookshelf.requests_recieved || [],
    (b_details, b_id) => {
      return { ...b_details, b_id };
    }
  );

  const requests_accepted_mapped = _.map(
    state.bookshelf.requests_accepted || [],
    (b_details, b_id) => {
      return { ...b_details, b_id };
    }
  );

  const lent_books_mapped = _.map(
    state.bookshelf.lent_books || [],
    (b_details, b_id) => {
      return { ...b_details, b_id };
    }
  );

  return {
    my_books: my_books_mapped,
    my_books_loading: state.bookshelf.my_books_loading,

    requests_recieved: requests_recieved_mapped,
    requests_recieved_loading: state.bookshelf.requests_recieved_loading,

    requests_accepted: requests_accepted_mapped,
    requests_accepted_loading: state.bookshelf.requests_recieved_loading,

    u_details: {
      ...state.profile.u_details,
      u_id: Firebase.auth().currentUser.uid,
    },

    lent_books: lent_books_mapped,
    lent_books_loading: state.bookshelf.lent_books_loading,
  };
};

export default connect(mapStateToProps, {
  profileFetch,
  booksBookshelfFetch,
  requestsRecievedFetch,
  acceptRequestsRecieved,
  removeRequestsRecieved,
  requestsAcceptedFetch,
  cancelPickUp,
  markPickedUp,
  lentBooksFetch,
})(BookshelfList);
