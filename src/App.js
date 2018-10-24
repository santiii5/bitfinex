import React from 'react'
import logo from './logo.png'
// import _ from 'lodash'
import './App.css'
import { connect } from 'react-redux'
import {startTickerWebsocket, startTradesWebsocket, startBookWebsocket, closeWebSocket} from './config/api'
import { fetchingTicker, fetchingTrades, fetchingBook, updatePair } from './actions/api-actions'
import Container from './containers/container'
import styled from 'styled-components'
// import Book from './components/Book'
// import Trades from './components/Trades'
// import Ticker from './components/Ticker'
// import SocketOptions from './SocketOptions'
import {
  Book,
  Trades,
  Ticker,
  SocketOptions,
} from './components/'

const AppHeader = styled.div`
  background-color: white;
  color: black;
  padding: 15px;

  img {
    max-width: 150px;
  }
`

const AppLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 15px;
  grid-gap: 15px;
`

class App extends Container {
  constructor(props) {
    super(props)

    this.fetchingTicker = props.fetchingTicker.bind(this)
    this.fetchingTrades = props.fetchingTrades.bind(this)
    this.fetchingBook = props.fetchingBook.bind(this)
    this.updatePair = props.updatePair.bind(this)
    this.startAll = this.startAll.bind(this)
  }

  componentDidMount() {
    this.startAll()
  }

  startAll() {
    startTickerWebsocket(this.receiveTicker.bind(this))
    startTradesWebsocket(this.receiveTrades.bind(this))
    // startBookWebsocket(this.receiveBook.bind(this))
  }

  receiveTicker(data) {
    const {
      tickerData,
    } = this.props.AppReducer
    const isValidData = data.event === undefined && typeof data[1] !== 'string'

    if (isValidData && tickerData !== data) {
      this.fetchingTicker(data[1])
    }
  }

  receiveTrades(data) {
    let {
      tradesData,
    } = this.props.AppReducer
    const isValidData = data.event === undefined && data[1] !== 'hb'

    if (isValidData && tradesData !== data) {
      let theData = typeof data[1] !== 'string' ? data[1] : data[2]
      let newData = theData

      if (!Array.isArray(theData[1])) {
        newData = tradesData.slice()
        newData.unshift(theData)
      }

      this.fetchingTrades(newData)
    }
  }

  receiveBook(data) {
    const {
      bookData,
    } = this.props.AppReducer
    const isValidData = data.event === undefined && typeof data[1] !== 'string'
    if (isValidData && bookData !== data) {
      let theData = [data[1]]
      let newData = theData

      if (Array.isArray(bookData) && Array.isArray(data[1])) {
        newData = bookData.slice()
        newData.unshift(data[1])
      }
      this.fetchingBook(newData)
    }
  }

  changePair(newPair) {
    this.updatePair(newPair)
    // Clean current reducer data (all)
    // Stop all the websockets
    // Start all the websockets with the new Pair
  }

  render() {
    const {
      tickerData,
      pair,
      availablePairs,
      bookData,
      tradesData,
      tickerStatus,
      tradesStatus,
      bookStatus,
    } = this.props.AppReducer

    return (
      <div className="App">
        <AppHeader>
          <img src={logo} alt="logo" />
        </AppHeader>
        <AppLayout>
          <Ticker
            data={tickerData}
            pair={pair}
            availablePairs={availablePairs}
            changePair={this.changePair.bind(this)}
            startWebsocket={startTickerWebsocket.bind(this, this.receiveTicker.bind(this), pair)}
            stopWebsocket={closeWebSocket.bind(this, 'ticker')}
            tickerStatus={tickerStatus}
          />
          <Trades
            data={tradesData}
            startWebsocket={startTradesWebsocket.bind(this, this.receiveTrades.bind(this), pair)}
            stopWebsocket={closeWebSocket.bind(this, 'trades')}
            tradesStatus={tradesStatus}
          />
          <Book
            data={bookData}
            startWebsocket={startBookWebsocket.bind(this, this.receiveBook.bind(this), pair)}
            stopWebsocket={closeWebSocket.bind(this, 'book')}
            bookStatus={bookStatus}
          />
        </AppLayout>

        <SocketOptions
          startSocket={this.startAll()}
          startText="Start All"
          stopSocket={closeWebSocket.bind(this, 'all')}
          stopText="Stop all"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  fetchingTicker: (data) => dispatch(fetchingTicker(data)),
  fetchingTrades: (data) => dispatch(fetchingTrades(data)),
  fetchingBook: (data) => dispatch(fetchingBook(data)),
  updatePair: (pair) => dispatch(updatePair(pair))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
