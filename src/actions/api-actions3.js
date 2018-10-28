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

export const stopAll = () => dispatch => {
	dispatch({
		type: 'API_STOP_ALL',
	})
}

export const stopTicker = () => dispatch => {
	dispatch({
		type: 'API_STOP_TICKER',
	})
}

export const stopTrades = () => dispatch => {
	dispatch({
		type: 'API_STOP_TRADES',
	})
}

export const stopBook = () => dispatch => {
	dispatch({
		type: 'API_STOP_BOOK',
	})
}
