import React, { Component } from "react";

import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import ReduxThunk from "redux-thunk";

import reducers from "./src/reducers";
import Firebase from "./src/Firebase";
import Navigator from "./src/Router";

String.prototype.toTitle = function () {
  return this.replace(/(^|\s)\S/g, function (t) {
    return t.toUpperCase();
  });
};

class App extends Component {
  componentDidMount() {
    Firebase;
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export default App;
