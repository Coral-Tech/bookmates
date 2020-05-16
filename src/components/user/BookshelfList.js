import _ from "lodash";
import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { Spinner } from "../common";
import { Styles } from "../../StyleSheet";

import {
  booksBookshelfFetch,
  requestsRecievedFetch,
  acceptRequestsRecieved,
  removeRequestsRecieved,
  requestsAcceptedFetch,
  cancelPickUp,
  markPickedUp,
  lentBooksFetch,
  markReturned,
} from "../../actions/BookshelfActions";

import { profileFetch } from "../../actions/ProfileActions";

import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]);

// -------------------------- TO DO  --------------------------
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

  markReturnedOption(book) {
    this.props.markReturned(book);
  }

  renderLentBooksRow(book) {
    const {
      bookBox,
      imageBox,
      imageStyle,
      detailBox,
      textBox,
      bookTitleStyle,
      bookAuthorStyle,

      iconStyle,
      lenderDataDetailBox,
      lenderDataStyle,
      buttonBox,
      acceptStyle,
      removeStyle,
      touchableOpacityBox,
    } = Styles.bookshelfScreen;

    if (book) {
      const { b_name, b_author, b_cover, b_added_date } = book.item.b_details;
      const { u_name, u_lastname, u_phone } = book.item.b_borrower_details;
      return (
        <View style={bookBox}>
          <View style={imageBox}>
            <Image
              source={{ uri: b_cover }}
              style={imageStyle}
              defaultSource={require("../../img/cover.png")}
            />
          </View>
          <View style={detailBox}>
            <View style={textBox}>
              <Text style={bookTitleStyle}>{b_name}</Text>
              <Text style={bookAuthorStyle}>{b_author}</Text>

              <View style={{ paddingTop: "5%" }}>
                <View style={lenderDataDetailBox}>
                  <Image
                    style={iconStyle}
                    source={require("../../img/discover_screen/owner_icon.png")}
                  />
                  <Text style={lenderDataStyle}>
                    {u_name} {u_lastname} borrwed this book
                  </Text>
                </View>

                <View style={lenderDataDetailBox}>
                  <Image
                    style={iconStyle}
                    source={require("../../img/discover_screen/phone_icon.png")}
                  />

                  <Text style={lenderDataStyle}>Contact: {u_phone}</Text>
                </View>
                <View style={buttonBox}>
                  <TouchableOpacity
                    style={touchableOpacityBox}
                    onPress={() => this.markReturnedOption(book.item)}
                  >
                    <Text style={acceptStyle}>Mark returned</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }

  renderLentBooks() {
    const { titleStyle } = Styles.bookshelfScreen;

    if (this.props.lent_books_loading) {
      return <Spinner />;
    }

    if (
      this.props.lent_books === undefined ||
      this.props.lent_books.length == 0
    ) {
      return <View></View>;
    }

    return (
      <View>
        <Text style={titleStyle}>Lent books</Text>
        <FlatList
          data={this.props.lent_books || []}
          renderItem={(book) => this.renderLentBooksRow(book)}
          keyExtractor={(book) => book.b_id}
        />
        <Text></Text>
      </View>
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
    const {
      bookBox,
      imageBox,
      imageStyle,
      detailBox,
      textBox,
      bookTitleStyle,
      bookAuthorStyle,

      iconStyle,
      lenderDataDetailBox,
      lenderDataStyle,
      buttonBox,
      acceptStyle,
      removeStyle,
      touchableOpacityBox,
    } = Styles.bookshelfScreen;

    if (book) {
      const { b_name, b_author, b_cover, b_added_date } = book.item.b_details;
      const { u_name, u_lastname, u_phone } = book.item.b_borrower_details;
      return (
        <View style={bookBox}>
          <View style={imageBox}>
            <Image
              source={{ uri: b_cover }}
              style={imageStyle}
              defaultSource={require("../../img/cover.png")}
            />
          </View>
          <View style={detailBox}>
            <View style={textBox}>
              <Text style={bookTitleStyle}>{b_name}</Text>
              <Text style={bookAuthorStyle}>{b_author}</Text>

              <View style={{ paddingTop: "5%" }}>
                <View style={lenderDataDetailBox}>
                  <Image
                    style={iconStyle}
                    source={require("../../img/discover_screen/owner_icon.png")}
                  />
                  <Text style={lenderDataStyle}>
                    {u_name} {u_lastname} will contact you to pick up this book
                  </Text>
                </View>

                <View style={lenderDataDetailBox}>
                  <Image
                    style={iconStyle}
                    source={require("../../img/discover_screen/phone_icon.png")}
                  />

                  <Text style={lenderDataStyle}>Contact: {u_phone}</Text>
                </View>
                <View style={buttonBox}>
                  <TouchableOpacity
                    style={touchableOpacityBox}
                    onPress={() => this.acceptPickUpRecieved(book.item)}
                  >
                    <Text style={acceptStyle}>Mark picked-up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={touchableOpacityBox}
                    onPress={() => this.cancelPickUp(book.item)}
                  >
                    <Text style={removeStyle}>Cancel pick-up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }

  renderPickUpPending() {
    const { titleStyle } = Styles.bookshelfScreen;

    if (this.props.requests_accepted_loading) {
      return <Spinner />;
    }

    if (
      this.props.requests_accepted === undefined ||
      this.props.requests_accepted.length == 0
    ) {
      return <View></View>;
    }

    return (
      <View>
        <Text style={titleStyle}>Pick up pending</Text>
        <FlatList
          data={this.props.requests_accepted || []}
          renderItem={(book) => this.renderPickUpPendingRow(book)}
          keyExtractor={(book) => book.b_id}
        />
        <Text></Text>
      </View>
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
    const {
      bookBox,
      imageBox,
      imageStyle,
      detailBox,
      textBox,
      bookTitleStyle,
      bookAuthorStyle,

      iconStyle,
      lenderDataDetailBox,
      lenderDataStyle,
      buttonBox,
      acceptStyle,
      removeStyle,
      touchableOpacityBox,
    } = Styles.bookshelfScreen;

    if (book) {
      const { b_name, b_author, b_cover, b_added_date } = book.item.b_details;
      const { u_name, u_lastname, u_location } = book.item.b_borrower_details;
      return (
        <View style={bookBox}>
          <View style={imageBox}>
            <Image
              source={{ uri: b_cover }}
              style={imageStyle}
              defaultSource={require("../../img/cover.png")}
            />
          </View>
          <View style={detailBox}>
            <View style={textBox}>
              <Text style={bookTitleStyle}>{b_name}</Text>
              <Text style={bookAuthorStyle}>{b_author}</Text>

              <View style={{ paddingTop: "5%" }}>
                <View style={lenderDataDetailBox}>
                  <Image
                    style={iconStyle}
                    source={require("../../img/discover_screen/owner_icon.png")}
                  />
                  <Text style={lenderDataStyle}>
                    {u_name} {u_lastname} wants to read this book
                  </Text>
                </View>

                <View style={lenderDataDetailBox}>
                  <Image
                    style={iconStyle}
                    source={require("../../img/discover_screen/location_icon.png")}
                  />

                  <Text style={lenderDataStyle}>{u_location}</Text>
                </View>
                <View style={buttonBox}>
                  <TouchableOpacity
                    style={touchableOpacityBox}
                    onPress={() => this.acceptRequestRecieved(book.item)}
                  >
                    <Text style={acceptStyle}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={touchableOpacityBox}
                    onPress={() => this.removeRequestRecieved(book.item)}
                  >
                    <Text style={removeStyle}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }

  renderRequestsRecieved() {
    const { titleStyle } = Styles.bookshelfScreen;

    if (this.props.requests_recieved_loading) {
      return <Spinner />;
    }

    if (
      this.props.requests_recieved === undefined ||
      this.props.requests_recieved.length == 0
    ) {
      return <View></View>;
    }

    return (
      <View>
        <Text style={titleStyle}>Requests recieved</Text>
        <FlatList
          data={this.props.requests_recieved || []}
          renderItem={(book) => this.renderRequestsRecievedRow(book)}
          keyExtractor={(book) => book.b_id}
        />
        <Text></Text>
      </View>
    );
  }

  // RENDER MY BOOKS

  renderOwnedBooksRow(book) {
    const {
      bookBox,
      imageBox,
      imageStyle,
      detailBox,
      textBoxMyBooks,
      bookTitleStyle,
      bookAuthorStyle,
    } = Styles.bookshelfScreen;

    if (book) {
      const { b_name, b_author, b_cover, b_added_date } = book.item;
      return (
        <View style={bookBox}>
          <View style={imageBox}>
            <Image
              source={{ uri: b_cover }}
              style={imageStyle}
              defaultSource={require("../../img/cover.png")}
            />
          </View>
          <View style={detailBox}>
            <View style={textBoxMyBooks}>
              <Text style={bookTitleStyle}>{b_name}</Text>
              <Text style={bookAuthorStyle}>{b_author}</Text>
            </View>
          </View>
        </View>
      );
    }
  }

  renderOwnedBooks() {
    const {
      titleStyle,
      addBookStyle,
      addBookContainer,
    } = Styles.bookshelfScreen;

    if (this.props.my_books_loading) {
      return <Spinner />;
    }
    if (this.props.my_books === undefined || this.props.my_books.length == 0) {
      return (
        <View style={addBookContainer}>
          <Text style={addBookStyle}>
            Add your first book on the button above
          </Text>
        </View>
      );
    }
    return (
      <View>
        <Text style={titleStyle}>My books</Text>
        <FlatList
          data={this.props.my_books || []}
          renderItem={(book) => this.renderOwnedBooksRow(book)}
          keyExtractor={(book) => book.b_id}
        />
        <View style={{ paddingBottom: 30 }} />
      </View>
    );
  }

  // RENDER

  render() {
    const {
      boundingBox,
      navigatorButtonBox,
      buttonBox,
      otherStyleBox,
      selectionStyleBox,
      otherTextStyle,
      selectionTextStyle,
    } = Styles.bookshelfBorrowScreen;

    return (
      <View style={boundingBox}>
        <View style={navigatorButtonBox}>
          <View style={selectionStyleBox}>
            <Text style={selectionTextStyle}>Bookshelf</Text>
          </View>
          <View style={otherStyleBox}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("borrow");
              }}
            >
              <Text style={otherTextStyle}>Borrowed</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text></Text>

        <Button onPress={this.addBookScreen} title="Add Book" />

        <ScrollView>
          {this.renderLentBooks()}
          {this.renderPickUpPending()}
          {this.renderRequestsRecieved()}
          {this.renderOwnedBooks()}
        </ScrollView>
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

    u_details: state.profile.u_details,

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
  markReturned,
})(BookshelfList);
