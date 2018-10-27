import * as _ from 'lodash'
import Immutable from 'immutable'

export default class Reducer {
	actionTypesPrefix = null
	defaultState = {}
	actions = {}

	constructor(args) {
		// extend instance with args
		Object.assign(this, args)

		// check if we have an actionTypesPrefix
		if (!this.actionTypesPrefix) {
			throw new Error('You do have to specify the actionTypesPrefix on your reducer class...')
		}
	}

	registerAction(name, reducer) {
		// check if the prefix is already in the name
		if (this.actionTypesPrefix) {
			const prefix = this.actionTypesPrefix.toUpperCase() + '_'

			if (name.toUpperCase().indexOf(prefix) === 0) {
				this.actions[name.toUpperCase()] = reducer
			}
			else {
				this.actions[`${prefix}${name.toUpperCase()}`] = reducer
			}
		}
		else {
			this.actions[name] = reducer
		}
	}

	extendDefaultState(defaultState) {
		this.defaultState = Immutable.Map(this.defaultState).mergeDeep(defaultState)

		return this.defaultState
	}

	reduce(state, action) {
		// preparing to work with immutable new state
		const stateId = action.stateId || 'default'
		let newState = Immutable.Map(state)

		// if is the redux init phase
		// simply return the default state for the current stateId
		if (action.type === '@@redux/INIT') {
			return newState.mergeDeep({
				[stateId]: this.defaultState,
			})
		}

		const actionType = action.type.toUpperCase()
		const prefixedActionType = `${this.actionTypesPrefix.toUpperCase()}_${actionType}`

		// grab the reducer from the registered actions
		// if the passed action type does not correspond to any reducer,
		// try to prefix the actionType with the setted prefix to handle non prefixed
		// action types such as the dashboard ones, etc...
		const reducer = _.get(this.actions, actionType,
						_.get(this.actions, prefixedActionType, null))

		// if we have a reducer registered for this action
		// do it
		if (reducer) {
			// if the requested stateId does not exist
			// we return it with a new copy of the default state
			if (!newState.has(stateId)) {
				newState = newState.set(stateId, this.defaultState)
			}

			// call the corresponding reducer function on the current state
			const reduced = reducer(newState.get(stateId), action)

			return newState.set(stateId, reduced)
		}

		// return the default state or the state
		return (state === undefined ? this.defaultState : state)
	}
}
