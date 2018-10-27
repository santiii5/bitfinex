import React from 'react'
import logo from './logo.png'
import { mapState } from './helpers/utils'
// import _ from 'lodash'
import './App.css'
import { connect } from 'react-redux'
import {startTickerWebsocket, startTradesWebsocket, startBookWebsocket, closeWebSocket} from './config/api'
import {
  fetchingTicker,
  fetchingTrades,
  fetchingBook,
  updatePair,
  stopAll,
  stopTicker,
  stopTrades,
  stopBook,
} from './actions/api-actions'
import Container from './containers/container'
import styled from 'styled-components'
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

const AppFooter = styled.div`
  width: 500px;
  margin: 0 auto;
`

class App extends Container {
  constructor(props) {
    super(props)

    this.changePair = this.changePair.bind(this)
    this.startAll = this.startAll.bind(this)
    this.offAll = this.offAll.bind(this)
    this.offTicker = this.offTicker.bind(this)
    this.offTrades = this.offTrades.bind(this)
    this.offBook = this.offBook.bind(this)
    this.receiveTicker = this.receiveTicker.bind(this)
    this.receiveTrades = this.receiveTrades.bind(this)
    this.receiveBook = this.receiveBook.bind(this)
  }

  componentDidMount() {
    this.startAll()
  }

  componentWillReceiveProps(newProps) {
    const {
      pair,
    } = this.props
    const {
      pair: newPair,
      tickerStatus,
      tradesStatus,
      bookStatus,
    } = newProps
    if(newPair !== pair && !tickerStatus && !tradesStatus && !bookStatus) {
      this.startAll(newProps)
    }
  }

  startAll(props = this.props) {
    const {
      tickerStatus,
      tradesStatus,
      bookStatus,
      pair,
    } = props
    !tickerStatus && startTickerWebsocket(this.receiveTicker, pair)
    !tradesStatus && startTradesWebsocket(this.receiveTrades, pair)
    // !bookStatus && startBookWebsocket(this.receiveBook, pair)
  }

  receiveTicker(data) {
    const {
      tickerData,
    } = this.props
    const isValidData = data.event === undefined && typeof data[1] !== 'string'

    if (isValidData && tickerData !== data) {
      this.props.fetchingTicker(data[1])
    }
  }

  receiveTrades(data) {
    let {
      tradesData,
    } = this.props
    const isValidData = data.event === undefined && data[1] !== 'hb'

    if (isValidData && tradesData !== data) {
      let theData = typeof data[1] !== 'string' ? data[1] : data[2]
      let newData = theData

      if (!Array.isArray(theData[1])) {
        newData = tradesData.slice()
        newData.unshift(theData)
      }

      this.props.fetchingTrades(newData)
    }
  }

  receiveBook(data) {
    const {
      bookData,
      fetchingBook,
    } = this.props

    const isValidData = data.event === undefined && typeof data[1] !== 'string'
    if (isValidData && bookData !== data) {
      const theData = Array.isArray(data[1][0]) ? data[1] : [data[1]]
      fetchingBook(bookData.concat(theData))
    }
  }

  changePair(newPair) {
    this.props.updatePair(newPair)
    this.offAll()
  }

  offAll(cb = null) {
    closeWebSocket('all')
    this.props.stopAll()
  }

  offTicker() {
    closeWebSocket('ticker')
    this.props.stopTicker()
  }

  offTrades() {
    closeWebSocket('trades')
    this.props.stopTrades()
  }

  offBook() {
    closeWebSocket('book')
    this.props.stopBook()
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
    } = this.props

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
            changePair={this.changePair}
            startWebsocket={startTickerWebsocket.bind(this, this.receiveTicker, pair)}
            stopWebsocket={this.offTicker}
            status={tickerStatus}
            socketText="Ticker"
          />
          <Trades
            data={tradesData}
            startWebsocket={startTradesWebsocket.bind(this, this.receiveTrades, pair)}
            stopWebsocket={this.offTrades}
            status={tradesStatus}
            socketText="Trades"
          />
          <Book
            data={bookData}
            startWebsocket={startBookWebsocket.bind(this, this.receiveBook, pair)}
            stopWebsocket={this.offBook}
            status={bookStatus}
            socketText="Book"
          />
        </AppLayout>
        <AppFooter>
          <SocketOptions
            startSocket={this.startAll}
            stopSocket={this.offAll}
            startText="Start All"
            stopText="Stop all"
            socketText="All sockets"
            status={tickerStatus && tradesStatus && bookStatus}
          />
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = state => (mapState(state.AppReducer))

const mapDispatchToProps = dispatch => ({
  fetchingTicker: (data) => dispatch(fetchingTicker(data)),
  fetchingTrades: (data) => dispatch(fetchingTrades(data)),
  fetchingBook: (data) => dispatch(fetchingBook(data)),
  updatePair: (pair) => dispatch(updatePair(pair)),
  stopAll: () => dispatch(stopAll()),
  stopTicker: () => dispatch(stopTicker()),
  stopTrades: () => dispatch(stopTrades()),
  stopBook: () => dispatch(stopBook()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
