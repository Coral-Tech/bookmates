import React, { Component } from "react";
import { View, Text, Button, Alert } from "react-native";
import { Input, CardSection, Spinner } from "../common";
import { connect } from "react-redux";

import {
  bookNameAdd,
  bookAuthorAdd,
  addBookSubmit,
} from "../../actions/AddBookActions";

// -------------------------- TO DO  --------------------------
// * Design
// * Add book cover
// ------------------------------------------------------------

String.prototype.toTitle = function () {
  return this.replace(/(^|\s)\S/g, function (t) {
    return t.toUpperCase();
  });
};

class AddBook extends Component {
  onBookNameChange(text) {
    this.props.bookNameAdd(text);
  }

  onAuthorNameChange(text) {
    this.props.bookAuthorAdd(text);
  }

  addBookPress() {
    this.props.navigation.navigate("bookshelfBooks");
    const { book_name, author_name } = this.props;

    this.props.addBookSubmit({ book_name, author_name });
  }

  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Book Name"
            placeholder="Nineteen Eighty-Four"
            onChangeText={this.onBookNameChange.bind(this)}
            value={this.props.book_name}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Author"
            placeholder="George Orwell"
            onChangeText={this.onAuthorNameChange.bind(this)}
            value={this.props.author_name}
          />
        </CardSection>

        <Button
          onPress={() => {
            Alert.alert("Not available yet");
          }}
          title="Add cover"
        />

        <Button onPress={this.addBookPress.bind(this)} title="Add book" />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    book_name: state.addbook.book_name,
    author_name: state.addbook.author_name,
  };
};

const mapDispatchToProps = { bookNameAdd, bookAuthorAdd, addBookSubmit };

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
