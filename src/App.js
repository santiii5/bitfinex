import React from 'react'
import './App.css'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { stateProxy } from './stores'
import {startTickerWebsocket, startTradesWebsocket, startBookWebsocket, closeWebSocket} from './config/api'
import ApiActions from './actions/api-actions'
import Container from './containers/container'
import styled from 'styled-components'
import {
  Book,
  Trades,
  Ticker,
  Header,
} from './components/'

const AppLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 15px;
  grid-gap: 15px;
`

class App extends Container {
  constructor(props) {
    super(props)

    this.actions = ApiActions.forge(this.props.stateId)

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
    !bookStatus && startBookWebsocket(this.receiveBook, pair)
  }

  receiveTicker(data) {
    const {
      tickerData,
    } = this.props
    const isValidData = data.event === undefined && typeof data[1] !== 'string'

    if (isValidData && tickerData !== data) {
      this.dispatch(this.actions.fetchingTicker(data[1]))
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

      this.dispatch(this.actions.fetchingTrades(newData))
    }
  }

  receiveBook(data) {
    const {
      bookData,
    } = this.props
    const isValidData = data.event === undefined && typeof data[1] !== 'string'

    if (isValidData && bookData !== data) {
      const theData = Array.isArray(data[1][0]) ? data[1] : [data[1]]
      const newData = bookData.concat(theData)

      this.dispatch(this.actions.fetchingBook(newData))
    }
  }

  changePair(newPair) {
    this.dispatch(this.actions.updatePair(newPair))
    this.offAll()
  }

  offAll(cb = null) {
    closeWebSocket('all')
    this.dispatch(this.actions.stopAll())
  }

  offTicker() {
    closeWebSocket('ticker')
    this.dispatch(this.actions.stopTicker())
  }

  offTrades() {
    closeWebSocket('trades')
    this.dispatch(this.actions.stopTrades())
  }

  offBook() {
    closeWebSocket('book')
    this.dispatch(this.actions.stopBook())
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
        <Header
          pair={pair}
          availablePairs={Immutable.Iterable.isIterable(availablePairs) ? availablePairs.toJS() : []}
          changePair={this.changePair}
          startSocket={this.startAll}
          stopSocket={this.offAll}
          startText="Start All"
          stopText="Stop all"
          status={tickerStatus && tradesStatus && bookStatus} />
        <AppLayout>
          <Ticker
            data={tickerData}
            pair={pair}
            startWebsocket={startTickerWebsocket.bind(this, this.receiveTicker, pair)}
            stopWebsocket={this.offTicker}
            status={tickerStatus}
          />
          <Trades
            data={Array.isArray(tradesData) ? tradesData : []}
            startWebsocket={startTradesWebsocket.bind(this, this.receiveTrades, pair)}
            stopWebsocket={this.offTrades}
            status={tradesStatus}
          />
          <Book
            data={Immutable.Iterable.isIterable(bookData) ? bookData.toJS() : []}
            startWebsocket={startBookWebsocket.bind(this, this.receiveBook, pair)}
            stopWebsocket={this.offBook}
            status={bookStatus}
          />
        </AppLayout>
      </div>
    );
  }
}

export default connect((state, props) => {
	const apiState = stateProxy(state.AppReducer, props.stateId)

	return {
    pair: apiState.get('pair') || state.AppReducer.get('pair'),
    availablePairs: apiState.get('availablePairs'),
    tickerStatus: apiState.get('tickerStatus'),
    tradesStatus: apiState.get('tradesStatus'),
    bookStatus: apiState.get('bookStatus'),
    tickerData: apiState.get('tickerData'),
    bookData: apiState.get('bookData'),
    tradesData: apiState.get('tradesData'),
	}
})(App)
