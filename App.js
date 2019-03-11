import React, { Component } from "react";
import { AsyncStorage, StyleSheet, Platform, View } from "react-native";
import Quote from "./js/components/Quote";
import NewQuote from "./js/components/NewQuote";
import StyledButton from "./js/components/StyledButton";

const data = [
  {
    text:
      "Probleme kann man niemals mit der selben Denkweise lösen, durch die sie entstanden sind.",
    author: "Albert Einstein"
  },
  {
    text: "Man braucht nichts im Leben fürchten, man muss nur alles verstehen.",
    author: "Marie Curie"
  },
  {
    text:
      "Es ist schwieriger, eine vorgefasste Meinung zu zertrümmern als ein Atom.",
    author: "Albert Einstein"
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

  _retrieveData() {
    AsyncStorage.getItem("QUOTES").then(value => {
      if (value) {
        this.setState({ quotes: JSON.parse(value) });
      }
    });
  }

  _storeData(quotes) {
    AsyncStorage.setItem("QUOTES", JSON.stringify(quotes));
  }

  _addQuote = (text, author) => {
    let { quotes } = this.state;
    if (text && author) {
      quotes.push({ text, author });
      this._storeData(quotes);
    }
    this.setState(state => ({
      index: quotes.length - 1,
      showNewQuoteScreen: false,
      quotes
    }));
  };

  componentDidMount() {
    this._retrieveData();
  }

  render() {
    let { index, quotes } = this.state;
    const quote = quotes[index];
    return (
      <View style={styles.container}>
        <StyledButton
          style={styles.newButton}
          title="Neues Zitat"
          onPress={this._showNewQuote}
        />
        <NewQuote
          visible={this.state.showNewQuoteScreen}
          onSave={this._addQuote}
        />
        <Quote text={quote.text} author={quote.author} />
        <StyledButton
          style={styles.nextButton}
          title="Nächstes"
          onPress={this._nextQuote}
        />
        <StyledButton
          style={styles.prevButton}
          title="Vorheriges"
          onPress={this._previousQuote}
        />
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
