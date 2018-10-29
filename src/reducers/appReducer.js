import Reducer from './reducer'
import actionTypes from '../actiontypes/api'
import Immutable from 'immutable'

class AppReducer extends Reducer {
	constructor() {
		super({
			actionTypesPrefix: 'API',
		})

		// default state
		this.extendDefaultState({
      pair: 'BTCUSD',
      availablePairs: ['BTCUSD', 'LTCUSD', 'ETHUSD'],
      tickerStatus: false,
      tradesStatus: false,
      bookStatus: false,
      tickerData: Immutable.List(),
      bookData: Immutable.List(),
      tradesData: Immutable.List(),
		})

    this.registerAction(actionTypes.FETCHING_TICKER, (state, action) => {
      return state.set('tickerData', action.data).set('tickerStatus', true)
		})

    this.registerAction(actionTypes.FETCHING_TRADES, (state, action) => {
      return state.set('tradesData', action.data).set('tradesStatus', true)
		})

    this.registerAction(actionTypes.FETCHING_BOOK, (state, action) => {
      return state.set('bookData', action.data).set('bookStatus', true)
		})

    this.registerAction(actionTypes.UPDATE_PAIR, (state, action) => {
      return state.set('pair', action.data).set('bookData', Immutable.List())
		})

    this.registerAction(actionTypes.STOP_ALL, (state, action) => {
      return state.set('tickerStatus', false).set('tradesStatus', false).set('bookStatus', false)
		})

    this.registerAction(actionTypes.STOP_TICKER, (state, action) => {
      return state.set('tickerStatus', false)
		})

    this.registerAction(actionTypes.STOP_TRADES, (state, action) => {
      return state.set('tradesStatus', false)
		})

    this.registerAction(actionTypes.STOP_BOOK, (state, action) => {
      return state.set('bookStatus', false)
		})
	}
}

const reducer = new AppReducer()
export default reducer.reduce.bind(reducer)
