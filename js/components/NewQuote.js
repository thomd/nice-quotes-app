import React, { Component } from "react";
import { Button, Modal } from "react-native";

export default class NewQuote extends Component {
  render() {
    const { visible, onSave } = this.props;
    return (
      <Modal visible={visible} onRequestClose={onSave} animationType="slide">
        <Button title="Speichern" onPress={onSave} />
      </Modal>
    );
  }
}
