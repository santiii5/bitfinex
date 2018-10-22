import React from 'react'
import {Mix, ViewMixins, AppMixins, StateMixins} from '../mixins'

/**
 * The default Container class, all container have to extend it
 * Container manage data and use Redux pattern
 * In 99% (I'm always searching the 1%) of case container have to be injected in a view component
 *
 * It inclued the mixins:
 * - Router: so it can be used easily: `this.theme.colors.grey100`
 * - Layout
 * - App
 *
 * @class Container
 * @extends {React.Component}
 */
export default class Container extends Mix(ViewMixins, AppMixins, StateMixins).in(React.Component) {
	/**
	 * Action class used by the container
	 * Redux pattern
	 * @type {object}
	 */
	actions = null;

	/**
	 * Global callback used in action, when the init is a success
	 * Could be override, check sub container class
	 * @method onInitSuccess
	 * @return {void}
	 */
	onInitSuccess() {
		// empty method to be override
	}

	/**
 	 * Global callback used in action, when the init is a fail
 	 * Could be override, check sub container class
	 * @method onInitSuccess
	 * @return {void}
	 */
	onInitError() {
		// empty method to be override
	}
}
