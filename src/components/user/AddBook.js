import React, { Component } from "react";
import { View, Text, Button, Alert } from "react-native";
import { Input, CardSection, Spinner } from "../common";
import { connect } from "react-redux";

import {
  bookNameAdd,
  bookAuthorAdd,
  addBookSubmit,
} from "../../actions/AddBookActions";
import { profileFetch } from "../../actions/ProfileActions";

// -------------------------- TO DO  --------------------------
// * Design
// * Add book cover
// ------------------------------------------------------------

class AddBook extends Component {
  componentDidMount() {
    this.props.profileFetch();
  }

  onBookNameChange(text) {
    this.props.bookNameAdd(text);
  }

  onAuthorNameChange(text) {
    this.props.bookAuthorAdd(text);
  }

  addBookPress() {
    const { b_name, b_author, u_details } = this.props;

    this.props.addBookSubmit(
      { b_name, b_author, u_details },
      this.props.navigation.navigate
    );
  }

  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Book Name"
            placeholder="Nineteen Eighty-Four"
            onChangeText={this.onBookNameChange.bind(this)}
            value={this.props.b_name}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Author"
            placeholder="George Orwell"
            onChangeText={this.onAuthorNameChange.bind(this)}
            value={this.props.b_author}
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
    b_name: state.addbook.b_name,
    b_author: state.addbook.b_author,
    u_details: state.profile.u_details,
  };
};

const mapDispatchToProps = {
  bookNameAdd,
  bookAuthorAdd,
  addBookSubmit,
  profileFetch,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
