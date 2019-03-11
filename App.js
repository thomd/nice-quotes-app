import React, { Component } from "react";
import { StyleSheet, Platform, View, Button } from "react-native";
import Quote from "./js/components/Quote";
import NewQuote from "./js/components/NewQuote";

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
  state = { index: 0, showNewQuoteScreen: false, quotes: data };

  _nextQuote = () => {
    this.setState(state => ({
      index: (state.index + 1) % state.quotes.length
    }));
  };

  _previousQuote = () => {
    this.setState(state => ({
      index: (state.index - 1 + state.quotes.length) % state.quotes.length
    }));
  };

  _showNewQuote = () => {
    this.setState(state => ({
      showNewQuoteScreen: true
    }));
  };

  _addQuote = (text, author) => {
    let { quotes } = this.state;
    if (text && author) {
      quotes.push({ text, author });
    }
    this.setState(state => ({ showNewQuoteScreen: false, quotes }));
  };

  render() {
    let { index, quotes } = this.state;
    const quote = quotes[index];
    return (
      <View style={styles.container}>
        <View style={styles.newButton}>
          <Button title="Neues Zitat" onPress={this._showNewQuote} />
        </View>
        <NewQuote
          visible={this.state.showNewQuoteScreen}
          onSave={this._addQuote}
        />
        <Quote text={quote.text} author={quote.author} />
        <View style={styles.nextButton}>
          <Button title="Nächstes" onPress={this._nextQuote} />
        </View>
        <View style={styles.prevButton}>
          <Button title="Vorheriges" onPress={this._previousQuote} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center"
  },
  newButton: {
    position: "absolute",
    top: 50,
    right: 20
  },
  nextButton: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 50 : 20,
    right: 20
  },
  prevButton: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 50 : 20,
    left: 20
  }
});
