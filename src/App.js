import React from 'react'
import logo from './logo.png';
import './App.css'
import { connect } from 'react-redux'
import {startTickerWebsocket, startTradesWebsocket, startBookWebsocket} from './config/api'
import { fetchingTicker, fetchingTrades, fetchingBook } from './actions/api-actions'
import Container from './containers/container'
import styled from 'styled-components'
import Book from './components/Book'
import Trades from './components/Trades'
import Ticker from './components/Ticker'

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
  }

  componentDidMount() {
    startTickerWebsocket(this.receiveTicker.bind(this))
    startTradesWebsocket(this.receiveTrades.bind(this))
    startBookWebsocket(this.receiveBook.bind(this))
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

  render() {
    return (
      <div className="App">
        <AppHeader>
          <img src={logo} alt="logo" />
        </AppHeader>
        <AppLayout>
          <Ticker data={this.props.AppReducer.tickerData} pair={this.props.AppReducer.pair} />
          <Trades data={this.props.AppReducer.tradesData} />
          <Book data={this.props.AppReducer.bookData} />
        </AppLayout>

        <button onClick={startTickerWebsocket.bind(this, this.receiveTicker.bind(this))}>Open ticker</button>
        <button onClick={startTradesWebsocket.bind(this, this.receiveTrades.bind(this))}>Open trades</button>
        <button onClick={startBookWebsocket.bind(this, this.receiveBook.bind(this))}>Open books</button>
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
  fetchingBook: (data) => dispatch(fetchingBook(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
