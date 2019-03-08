import React, { Component } from "react";
import { Button, Modal, StyleSheet, View } from "react-native";

export default class NewQuote extends Component {
  render() {
    const { visible, onSave } = this.props;
    return (
      <Modal visible={visible} onRequestClose={onSave} animationType="slide">
        <View style={styles.container}>
          <Button title="Speichern" onPress={onSave} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
