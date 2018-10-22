const defaultState = {
  pair: 'USD/BTC'
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
    default:
      return state
  }
}
