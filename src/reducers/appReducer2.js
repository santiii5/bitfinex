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
        tickerData: action.data,
        tickerStatus: true,
      }
    case 'API_FETCHING_TRADES':
      return {
        ...state,
        tradesData: action.data,
        tradesStatus: true,
      }
    case 'API_FETCHING_BOOK':
      return {
        ...state,
        bookData: action.data,
        bookStatus: true,
      }
    case 'API_UPDATE_PAIR':
      return {
        ...defaultState,
        pair: action.data
      }
    case 'API_STOP_ALL':
      return {
        ...state,
        tickerStatus: false,
        tradesStatus: false,
        bookStatus: false,
      }
    case 'API_STOP_TICKER':
      return {
        ...state,
        tickerStatus: false,
      }
    case 'API_STOP_TRADES':
      return {
        ...state,
        tradesStatus: false,
      }
    case 'API_STOP_BOOK':
      return {
        ...state,
        bookStatus: false,
      }
    default:
      return state
  }
}
