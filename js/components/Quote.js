import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default props => {
  const { text, author } = props;
  return (
    <View style={[styles.container, shadowStyle]}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.author}>&mdash; {author}</Text>
    </View>
  );
};

const shadowStyle = {
  shadowOpacity: 0.3,
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: 7
  },
  elevation: 8
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 6
  },
  text: {
    fontSize: 24,
    fontStyle: "italic",
    marginBottom: 20,
    textAlign: "center"
  },
  author: {
    fontSize: 18,
    textAlign: "right"
  }
});
