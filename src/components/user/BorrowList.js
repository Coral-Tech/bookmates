import _ from "lodash";
import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { Spinner } from "../common";
import { Styles } from "../../StyleSheet";

import {
  borrowedRequestsFetch,
  removeBorrowRequest,
  pickUpBooksFetch,
  removePickUp,
  borrowedBooksFetch,
} from "../../actions/BorrowActions";

import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]);

// -------------------------- TO DO  --------------------------
// ------------------------------------------------------------

class BorrowList extends Component {
  componentDidMount() {
    this.props.borrowedRequestsFetch();
    this.props.pickUpBooksFetch();
    this.props.borrowedBooksFetch();
  }

  // RENDER BORROWED BOOKS

  renderBorrowedBooksRow(book) {
    const {
      bookBox,
      imageBox,
      imageStyle,
      detailBox,
      textBox,
      bookTitleStyle,
      bookAuthorStyle,
      actionStyle,
      iconStyle,
      lenderDataDetailBox,
      lenderDataStyle,
    } = Styles.borrowedBookScreen;
    if (book) {
      const { b_name, b_author, b_cover, b_added_date } = book.item.b_details;
      const { u_name, u_lastname, u_phone } = book.item.b_lender_details;

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
                    {u_name} {u_lastname}
                  </Text>
                </View>

                <View style={lenderDataDetailBox}>
                  <Image
                    style={iconStyle}
                    source={require("../../img/discover_screen/phone_icon.png")}
                  />

                  <Text style={lenderDataStyle}>Contact: {u_phone}</Text>
                </View>
                <View style={lenderDataDetailBox}>
                  <Image
                    style={iconStyle}
                    source={require("../../img/discover_screen/time_icon.png")}
                  />
                  <Text style={actionStyle}>
                    Remember to return the book to {u_name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }

  renderBorrowedBooks() {
    const { titleStyle } = Styles.borrowedBookScreen;

    if (this.props.borrowed_books_loading) {
      return <Spinner />;
    }
    if (
      this.props.borrowed_books === undefined ||
      this.props.borrowed_books.length == 0
    ) {
      return <View></View>;
    }

    return (
      <View>
        <Text style={titleStyle}>Books borrowed </Text>
        <FlatList
          data={this.props.borrowed_books || []}
          renderItem={(book) => this.renderBorrowedBooksRow(book)}
          keyExtractor={(book) => book.b_id}
        />
        <Text></Text>
      </View>
    );
  }

  // RENDER PICK UP BOOKS

  removePickUpOption = (book) => {
    this.props.removePickUp(book);
    this.props.pickUpBooksFetch();
  };

  renderPickUpBooksRow(book) {
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
      actionStyle,
      removeStyle,
      touchableOpacityBox,
    } = Styles.borrowedBookScreen;

    if (book) {
      const { b_name, b_author, b_cover, b_added_date } = book.item.b_details;
      const { u_name, u_lastname, u_phone } = book.item.b_lender_details;

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
                    {u_name} {u_lastname}
                  </Text>
                </View>

                <View style={lenderDataDetailBox}>
                  <Image
                    style={iconStyle}
                    source={require("../../img/discover_screen/phone_icon.png")}
                  />

                  <Text style={lenderDataStyle}>Contact: {u_phone}</Text>
                </View>
                <View style={lenderDataDetailBox}>
                  <Image
                    style={iconStyle}
                    source={require("../../img/discover_screen/time_icon.png")}
                  />
                  <Text style={actionStyle}>
                    Request accepted! You can contact {u_name}
                  </Text>
                </View>

                <View style={buttonBox}>
                  <TouchableOpacity
                    style={touchableOpacityBox}
                    onPress={() => this.removePickUpOption(book.item)}
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

  renderPickUpBooks() {
    const { titleStyle } = Styles.borrowedBookScreen;

    if (this.props.pickup_books_loading) {
      return <Spinner />;
    }

    if (
      this.props.pickup_books === undefined ||
      this.props.pickup_books.length == 0
    ) {
      return <View></View>;
    }

    return (
      <View>
        <Text style={titleStyle}>Pick up books </Text>

        <FlatList
          data={this.props.pickup_books || []}
          renderItem={(book) => this.renderPickUpBooksRow(book)}
          keyExtractor={(book) => book.b_id}
        />
        <Text></Text>
      </View>
    );
  }

  // RENDER REQUESTS SENT

  removeBorrowOption = (book) => {
    this.props.removeBorrowRequest(book);
    this.props.borrowedRequestsFetch();
  };

  renderRequestSentRow(book) {
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
      removeStyle,
      actionStyle,
      touchableOpacityBox,
    } = Styles.borrowedBookScreen;

    if (book) {
      const { b_name, b_author, b_cover, b_added_date } = book.item.b_details;
      const { u_name, u_lastname } = book.item.b_lender_details;

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
                    {u_name} {u_lastname}
                  </Text>
                </View>
                <View style={lenderDataDetailBox}>
                  <Image
                    style={iconStyle}
                    source={require("../../img/discover_screen/time_icon.png")}
                  />
                  <Text style={actionStyle}>Request sent!</Text>
                </View>

                <View style={buttonBox}>
                  <TouchableOpacity
                    style={touchableOpacityBox}
                    onPress={() => this.removeBorrowOption(book.item)}
                  >
                    <Text style={removeStyle}>Remove request</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }

  renderRequestSent() {
    const {
      titleStyle,
      addBookStyle,
      addBookContainer,
    } = Styles.borrowedBookScreen;

    if (this.props.borrowed_books_request_loading) {
      return <Spinner />;
    }

    if (
      (this.props.borrowed_books === undefined ||
        this.props.borrowed_books.length == 0) &&
      (this.props.pickup_books === undefined ||
        this.props.pickup_books.length == 0) &&
      (this.props.borrowed_books_request === undefined ||
        this.props.borrowed_books_request.length == 0)
    ) {
      return (
        <View style={addBookContainer}>
          <Text style={addBookStyle}>Send your first request in Discover!</Text>
        </View>
      );
    }

    if (
      this.props.borrowed_books_request === undefined ||
      this.props.borrowed_books_request.length == 0
    ) {
      return <View></View>;
    }

    return (
      <View>
        <Text style={titleStyle}>Requests sent </Text>
        <FlatList
          data={this.props.borrowed_books_request || []}
          renderItem={(book) => this.renderRequestSentRow(book)}
          keyExtractor={(book) => book.b_id}
        />
        <View style={{ paddingBottom: 30 }} />
      </View>
    );
  }

  // RENDER ALL

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
          <View style={otherStyleBox}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("bookshelfBooks");
              }}
            >
              <Text style={otherTextStyle}>Bookshelf</Text>
            </TouchableOpacity>
          </View>

          <View style={selectionStyleBox}>
            <Text style={selectionTextStyle}>Borrowed</Text>
          </View>
        </View>
        <Text></Text>

        <ScrollView>
          {this.renderBorrowedBooks()}
          {this.renderPickUpBooks()}
          {this.renderRequestSent()}
        </ScrollView>
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
