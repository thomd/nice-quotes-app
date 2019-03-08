import React, { Component } from "react";
import { Button, Modal, StyleSheet, View, TextInput } from "react-native";

export default class NewQuote extends Component {
  render() {
    const { visible, onSave } = this.props;
    return (
      <Modal visible={visible} onRequestClose={onSave} animationType="slide">
        <View style={styles.container}>
          <TextInput
            style={[styles.input, { height: 150 }]}
            multiline={true}
            placeholder="Inhalt des Zitats"
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.input}
            placeholder="Autor/in des Zitats"
            underlineColorAndroid="transparent"
          />
          <Button title="Speichern" onPress={onSave} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50
  },
  input: {
    borderWidth: 1,
    borderColor: "deepskyblue",
    borderRadius: 4,
    width: "80%",
    marginBottom: 20,
    fontSize: 18,
    padding: 10,
    height: 50
  }
});
