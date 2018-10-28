import {default as __store} from '../stores/app'

/**
 * The default Container class, all container have to extend it.
 * Actions are the files that send data to the store. They are the only source of data.
 * Permit to avoid duplication of generic and simple method
 * @class Actions
 */
export default class Actions {
	/**
	 * The stateId in which to dispatch the action
	 * @type {String}
	 */
	stateId = 'default';

	/**
	 * Constructor
	 * @method constructor
	 * @param {String} stateId Name of the state
	 * @return {void}
	 */
	constructor(stateId = 'default') {
		this.stateId = stateId
	}

	/**
	 * Return a new instance if not exists, else the current instance
	 * @method forge
	 * @param {String} stateId Name of the state
	 * @return {Object} current instance
	 */
	static forge(stateId = 'default') {
		return new this(stateId)
	}

	/**
	 * Dispatch
	 * @param  {Objecte}  action  The action to be dispatched (type can also be function)
	 * @return {void}
	 */
	dispatch(action) {
		// if is not a function, set the stateId
		if (typeof (action) !== 'function' && !action.stateId) {
			action.stateId = this.stateId
		}
		__store.dispatch(action)
	}

	/**
	 * Return the state identify by the parameter
	 * @method getState
	 * @param {String} stateName The name of the state to return
	 * @param {String} stateId The identifier of the state
	 * @return {Object} The current state
	 */
	getState(stateName = this.stateName, stateId = this.stateId) {
		// check if has a name specified
		if (!stateName) {
			throw new Error('The "getState" method need at least that you pass the "stateName" as a parameter, or that you specify it on the class instance itself...')
		}

		const state = __store.getState()

		if (state[stateName] && state[stateName].has(stateId)) {
			return state[stateName].get(stateId)
		}
		else {
			return state
		}
	}

	/**
	 * Get the state
	 */
	get state() {
		return __store.getState()
	}
}
