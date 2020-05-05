import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";

import { Spinner } from "../common";
import {
  borrowedRequestsFetch,
  removeBorrowRequest,
} from "../../actions/BorrowRequestActions";

import { borrowedRecievedRequestsFetch } from "../../actions/BorrowRequestRecievedActions";

// -------------------------- TO DO  --------------------------
// * Remove requests the user dont want
// * What to do with requests that the user wants?
// * Design
// ------------------------------------------------------------

class BorrowList extends Component {
  componentDidMount() {
    this.props.borrowedRequestsFetch();
    this.props.borrowedRecievedRequestsFetch();
  }

  // Borrow Request Sent

  removeBorrowRequestSentOption = (book) => {
    this.props.removeBorrowRequest(book.book_id);
    this.props.borrowedRequestsFetch();
  };

  renderBorrowedRequestSentRow(book) {
    if (book) {
      const { book_name, author_name, cover, datetime_added } = book;
      return (
        <View>
          <Text>{book_name}</Text>
          <Text>{author_name}</Text>
          <Text>Added: {datetime_added}</Text>
          <Button
            onPress={() => this.removeBorrowRequestSentOption(book)}
            title="Remove borrow request"
          />
          <Text></Text>
        </View>
      );
    }
  }

  renderBorrowedSent() {
    if (this.props.loading_borrowed) {
      return <Spinner />;
    }

    return (
      <FlatList
        data={this.props.borrowed_request_sent || []}
        renderItem={(book) => this.renderBorrowedRequestSentRow(book.item)}
        keyExtractor={(book) => book.book_id}
      />
    );
  }

  // Borrow Request Recieved

  removeBorrowRequestRecievedOption = (book) => {
    console.log("remove");
    // this.props.removeBorrowRequest(book.book_id);
    // this.props.borrowedRequestsFetch();
  };

  renderBorrowedRequestRecievedRow(book) {
    if (book) {
      const { book_name, author_name, cover, datetime_added } = book;
      return (
        <View>
          <Text>{book_name}</Text>
          <Text>{author_name}</Text>
          <Text>Added: {datetime_added}</Text>
          <Button
            onPress={() => this.removeBorrowRequestRecievedOption(book)}
            title="Remove request"
          />
          <Text></Text>
        </View>
      );
    }
  }

  renderBorrowedRecieved() {
    if (this.props.loading_borrowed_recieved) {
      return <Spinner />;
    }
    return (
      <FlatList
        data={this.props.borrowed_request_recieved || []}
        renderItem={(item) => this.renderBorrowedRequestRecievedRow(item.item)}
        keyExtractor={(item) => item.book_id}
      />
    );
  }

  render() {
    return (
      <View>
        <Text>Borrow request sent</Text>
        {this.renderBorrowedSent()}
        <Text></Text>
        <Text>Borrow request recieved</Text>
        {this.renderBorrowedRecieved()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const borrowed_request_sent_mapped = _.map(
    state.borrow_request.borrowed_books_request || [],
    (val, uid) => {
      return { ...val, book_id: uid };
    }
  );

  const borrowed_recieved_request_mapped = _.map(
    state.borrow_request_recieve.borrowed_books_request_recieved || [],
    (val, uid) => {
      return { ...val, book_id: uid };
    }
  );

  return {
    borrowed_request_sent: borrowed_request_sent_mapped,
    loading_borrowed: state.borrow_request.loading,

    borrowed_request_recieved: borrowed_recieved_request_mapped,
    loading_borrowed_recieved: state.borrow_request_recieve.loading,
  };
};

export default connect(mapStateToProps, {
  removeBorrowRequest,
  borrowedRequestsFetch,
  borrowedRecievedRequestsFetch,
})(BorrowList);
