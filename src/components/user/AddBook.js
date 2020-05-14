import React, { Component } from "react";
import { View, Text, Button, Alert } from "react-native";
import { Input, CardSection, Spinner } from "../common";
import { connect } from "react-redux";

import {
  createBookId,
  bookNameAdd,
  bookAuthorAdd,
  coverAdd,
  addBookSubmit,
} from "../../actions/AddBookActions";
import { profileFetch } from "../../actions/ProfileActions";

import * as ImagePicker from "expo-image-picker";

// -------------------------- TO DO  --------------------------
// * Design
// * Add book cover
// ------------------------------------------------------------

class AddBook extends Component {
  componentDidMount() {
    this.props.profileFetch();
    this.props.createBookId();
  }

  onBookNameChange(text) {
    this.props.bookNameAdd(text);
  }

  onAuthorNameChange(text) {
    this.props.bookAuthorAdd(text);
  }

  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
    });

    if (!result.cancelled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      this.props.coverAdd(blob, this.props.b_id);
    }
  };

  addBookPress() {
    const { b_id, b_name, b_author, u_details, b_cover } = this.props;

    this.props.addBookSubmit(
      { b_id, b_name, b_author, u_details, b_cover },
      this.props.navigation.navigate
    );
  }

  renderButtons() {
    if (this.props.b_cover_loading) {
      return (
        <View>
          <Text>Loading cover</Text>
          <Spinner />
        </View>
      );
    }
    return (
      <View>
        <Button onPress={this.onChooseImagePress} title="Add cover" />
        <Button onPress={this.addBookPress.bind(this)} title="Add book" />
      </View>
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
        {this.renderButtons()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    b_id: state.addbook.b_id,
    b_name: state.addbook.b_name,
    b_author: state.addbook.b_author,
    u_details: state.profile.u_details,
    b_cover: state.addbook.b_cover,
    b_cover_loading: state.addbook.b_cover_loading,
  };
};

const mapDispatchToProps = {
  bookNameAdd,
  bookAuthorAdd,
  addBookSubmit,
  profileFetch,
  coverAdd,
  createBookId,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
