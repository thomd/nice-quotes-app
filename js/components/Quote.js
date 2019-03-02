import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default props => {
  const { text, author } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.author}>&mdash; {author}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30
  },
  text: {
    fontSize: 36,
    fontStyle: "italic",
    marginBottom: 20,
    textAlign: "center"
  },
  author: {
    fontSize: 20,
    textAlign: "right"
  }
});
