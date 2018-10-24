const defaultState = {
  pair: 'BTCUSD',
  availablePairs: ['BTCUSD', 'LTCUSD', 'ETHUSD'],
  tickerStatus: false,
  tradesStatus: false,
  bookStatus: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'API_FETCHING_TICKER':
      return {
        ...state,
        tickerData: action.data
      }
    case 'API_FETCHING_TRADES':
      return {
        ...state,
        tradesData: action.data,
      }
    case 'API_FETCHING_BOOK':
      return {
        ...state,
        bookData: action.data
      }
    case 'API_UPDATE_PAIR':
      return {
        ...state,
        pair: action.data
      }
    default:
      return state
  }
}
