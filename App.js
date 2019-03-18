import React, { Component } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Platform, View, Text } from 'react-native'
import Firebase from './js/Firebase'
import Quote from './js/components/Quote'
import NewQuote from './js/components/NewQuote'
import StyledButton from './js/components/StyledButton'

export default class App extends Component {
  state = { index: 0, showNewQuoteScreen: false, quotes: [], isLoading: true }

  _nextQuote = () => {
    this.setState(state => ({
      index: (state.index + 1) % state.quotes.length
    }))
  }

  _previousQuote = () => {
    this.setState(state => ({
      index: (state.index - 1 + state.quotes.length) % state.quotes.length
    }))
  }

  _showNewQuote = () => {
    this.setState(state => ({
      showNewQuoteScreen: true
    }))
  }

  _retrieveData = async () => {
    let quotes = []
    let query = await Firebase.db.collection('quotes').get()
    query.forEach(quote => {
      quotes.push({
        id: quote.id,
        text: quote.data().text,
        author: quote.data().author
      })
    })
    this.setState({ quotes, isLoading: false })
  }

  _saveQuoteToDB = async (text, author, quotes) => {
    let docRef = await Firebase.db.collection('quotes').add({ text, author })
    quotes[quotes.length - 1].id = docRef.id
  }

  _removeQuoteFromDB(id) {
    Firebase.db
      .collection('quotes')
      .doc(id)
      .delete()
  }

  _addQuote = (text, author) => {
    let { quotes } = this.state
    if (text && author) {
      quotes.push({ text, author })
      this._saveQuoteToDB(text, author, quotes)
    }
    this.setState(state => ({
      index: quotes.length - 1,
      showNewQuoteScreen: false,
      quotes
    }))
  }

  _deleteQuoteAlert = () => {
    Alert.alert('Zitat löschen?', '', [
      { text: 'Abbrechen', style: 'cancel' },
      {
        text: 'Löschen',
        style: 'destructive',
        onPress: this._deleteQuote
      }
    ])
  }

  _deleteQuote = () => {
    let { quotes, index } = this.state
    this._removeQuoteFromDB(quotes[index].id)
    quotes.splice(index, 1)
    this.setState(state => ({
      index: index > 0 ? index - 1 : 0,
      quotes
    }))
  }

  componentDidMount() {
    Firebase.init()
    this._retrieveData()
  }

  render() {
    let { index, quotes, isLoading } = this.state
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )
    }
    const quote = quotes[index]
    return (
      <View style={styles.container}>
        <StyledButton
          style={styles.deleteButton}
          visible={quotes.length > 0}
          title="Zitat löschen"
          onPress={this._deleteQuoteAlert}
        />
        <StyledButton style={styles.newButton} title="Neues Zitat" onPress={this._showNewQuote} />
        <NewQuote visible={this.state.showNewQuoteScreen} onSave={this._addQuote} />
        {quote ? <Quote text={quote.text} author={quote.author} /> : <Text>Keine Zitate</Text>}
        <StyledButton
          style={styles.nextButton}
          visible={quotes.length > 1}
          title="Nächstes"
          onPress={this._nextQuote}
        />
        <StyledButton
          style={styles.prevButton}
          visible={quotes.length > 2}
          title="Vorheriges"
          onPress={this._previousQuote}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButton: {
    position: 'absolute',
    top: 50,
    left: 20
  },
  newButton: {
    position: 'absolute',
    top: 50,
    right: 20
  },
  nextButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 50 : 20,
    right: 20
  },
  prevButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 50 : 20,
    left: 20
  }
})
