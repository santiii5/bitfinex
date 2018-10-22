import store from '../stores/app';

export default (superclass) => {
	return class StateMixins extends superclass {

		/**
		 * Function to dispatch action.
		 * @type {function}
		 */
		dispatch = null;

		/**
		 * @constructor
		 */
		constructor() {
			super(...arguments);

			// set the dispatch function
			this.dispatch = (action) => {

				if (typeof(action) !== 'function' && ! action.stateId) {
					action.stateId = this.props.stateId || 'default';
				}
				store.dispatch(action);
			};
		}

	};
};
