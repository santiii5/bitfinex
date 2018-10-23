export const fetchingTicker = (data) => dispatch => {
	dispatch({
		type: 'API_FETCHING_TICKER',
		data,
	})
}

export const fetchingTrades = (data) => dispatch => {
	dispatch({
		type: 'API_FETCHING_TRADES',
		data,
	})
}

export const fetchingBook = (data) => dispatch => {
	dispatch({
		type: 'API_FETCHING_BOOK',
		data,
	})
}

export const updatePair = (data) => dispatch => {
	dispatch({
		type: 'API_UPDATE_PAIR',
		data,
	})
}
