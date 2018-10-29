import Actions from './actions'
import actionTypes from '../actiontypes/api'

export default class ApiActions extends Actions {
	actionTypes = actionTypes;
	stateName = 'default';

	static forge(stateId = 'default') {
		return new ApiActions(stateId)
	}

  fetchingTicker(data) {
  	return {
  		type: this.actionTypes.FETCHING_TICKER,
  		data,
  	}
  }

  fetchingTrades(data) {
  	return {
  		type: this.actionTypes.FETCHING_TRADES,
  		data,
  	}
  }

  fetchingBook(data) {
  	return {
  		type: this.actionTypes.FETCHING_BOOK,
  		data,
  	}
  }

  updatePair(data) {
  	return {
  		type: this.actionTypes.UPDATE_PAIR,
  		data,
  	}
  }

  stopAll() {
  	return {
  		type: this.actionTypes.STOP_ALL,
  	}
  }

  stopTicker() {
  	return {
  		type: this.actionTypes.STOP_TICKER,
  	}
  }

  stopTrades() {
  	return {
  		type: this.actionTypes.STOP_TRADES,
  	}
  }

  stopBook() {
  	return {
  		type: this.actionTypes.STOP_BOOK,
  	}
  }
}
