import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";
import Quote from "./js/components/Quote";

const data = [
  {
    text:
      "Probleme kann man niemals mit der selben Denkweise lösen, durch die sie entstanden sind",
    author: "Albert Einstein"
  },
  {
    text: "Man braucht nichts im Leben fürchten, man muss nur alles verstehen.",
    author: "Marie Curie"
  },
  {
    text: "Nichts ist so beständig wie der Wandel",
    author: "Heraklit"
  }
];

export default class App extends Component {
  state = { index: 0 };

  nextQuote = () => {
    this.setState(state => ({
      index: (state.index + 1) % data.length
    }));
  };

  previousQuote = () => {
    this.setState(state => ({
      index: (state.index - 1 + data.length) % data.length
    }));
  };

  render() {
    let { index } = this.state;
    const quote = data[index];
    return (
      <View style={styles.container}>
        <Quote text={quote.text} author={quote.author} />
        <Button title="Nächstes Zitat" onPress={this.nextQuote} />
        <Button title="Vorheriges Zitat" onPress={this.previousQuote} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
