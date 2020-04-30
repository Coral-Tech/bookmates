import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";

import { Spinner } from "../common";
import { booksFetch } from "../../actions/BookshelfActions";

class BookshelfList extends Component {
  componentDidMount() {
    this.props.booksFetch();
  }

  addBookScreen = () => {
    this.props.navigation.navigate("bookshelfadd");
  };

  renderRow(book) {
    console.log(this.props.booklist);
    console.log(book);
    return (
      <View>
        <Text>{book.item.book_name}</Text>
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

export default connect(mapStateToProps, { booksFetch })(BookshelfList);
