import React, { Component, Fragment } from "react";
import { Text } from "react-native";

export default class Quote extends Component {
  render() {
    return (
      <Fragment>
        <Text>{this.props.text}</Text>
        <Text>-- {this.props.author}</Text>
      </Fragment>
    );
  }
}
