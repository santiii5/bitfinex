import {compose, createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import Immutable from 'immutable'

// import * as GlobalReducers from '../reducers/globals/'
import * as AppReducer from '../reducers/'

// Combine app/reducers and globals/reducers files in one object
const rootReducer = combineReducers({
	// ...GlobalReducers,
	...AppReducer,
})

// Define a function to create the store with middleware injection based on environment variable
// thunkMiddleware permit to return function in actionCreator
// http://rackt.org/redux/docs/advanced/AsyncActions.html
let finalCreateStore = null

if (process.env.NODE_ENV === 'production') {
	finalCreateStore = compose(
		// Enables your middleware:
		applyMiddleware(thunkMiddleware)
	)(createStore)
}
else {
	finalCreateStore = compose(
		// Enables your middleware:
		applyMiddleware(thunkMiddleware),
		// DevTools.instrument(),
		window.devToolsExtension ? window.devToolsExtension() : (f) => f
	)(createStore)
}

const store = finalCreateStore(rootReducer)
export default store

/**
 * Filter in the state the stateId wanted
 * @method stateProxy
 * @param  {Object}   state               The whole state
 * @param  {String}   [stateId='default'] The state Id wanted
 * @return {Object}                       The state of the stateId requested
 */
export function stateProxy(state, stateId = 'default') {
	return state.get(stateId, state.get('default', Immutable.Map({})))
}
