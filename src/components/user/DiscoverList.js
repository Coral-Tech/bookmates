import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { connect } from "react-redux";

import { Spinner } from "../common";
import { booksDiscoverFetch } from "../../actions/DiscoverActions";

class DiscoverList extends Component {
  componentDidMount() {
    this.props.booksDiscoverFetch();
  }

  // renderRow(book) {
  //   const {
  //     book_name,
  //     book_author,
  //     cover,
  //     datetime_added,
  //   } = book.item.book_data.book_details;
  //   return (
  //     <View>
  //       <Text>{book_name}</Text>
  //     </View>
  //   );
  // }

  renderList() {
    console.log("BOOK LIST");
    console.log(this.props.data);

    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <View></View>
      // <FlatList
      //   data={this.props.booklist || []}
      //   renderItem={(book) => this.renderRow(book)}
      //   keyExtractor={(book) => book.uid}
      // />
    );
  }

  render() {
    return <View>{this.renderList()}</View>;
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.discover.data,
    loading: state.discover.loading,
  };
};

export default connect(mapStateToProps, { booksDiscoverFetch })(DiscoverList);
