import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";

import { Spinner } from "../common";
import {
  borrowedRequestsFetch,
  removeBorrowRequest,
} from "../../actions/BorrowRequestActions";

// -------------------------- TO DO  --------------------------
// * Add borrowed request sent
// * Add borrowed request recieved
// * Design
// ------------------------------------------------------------

class BorrowList extends Component {
  componentDidMount() {
    this.props.borrowedRequestsFetch();
  }

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

  render() {
    return (
      <View>
        <Text>Borrow request sent</Text>
        {this.renderBorrowedSent()}
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

  return {
    borrowed_request_sent: borrowed_request_sent_mapped,
    loading_borrowed: state.borrow_request.loading,
  };
};

export default connect(mapStateToProps, {
  removeBorrowRequest,
  borrowedRequestsFetch,
})(BorrowList);
