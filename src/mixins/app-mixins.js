/**
 * Creates environment variables
 * @class AppProxy
 */
class AppProxy {

	/**
	 * Environment
	 * @type {string}
	 */
	get environment() {
		return window.app.env;
	}

	/**
	 * Env
	 * @type {string}
	 */
	get env() {
		return this.environment;
	}

	/**
	 * Check if the app ENV is staging
	 * @method isStaging
	 * @return {object} true if, env is staging
	 */
	envIsStaging() {
		return this.environment === 'staging';
	}

	/**
	 * Check if the app ENV is release
	 * @method envIsRelease
	 * @return {object} true if, env is release
	 */
	envIsRelease() {
		return this.environment === 'release';
	}

	/**
	 * Check if the app ENV is test
	 * @method envIsTest
	 * @return {object} true if, env is test
	 */
	envIsTest() {
		return this.environment === 'test';
	}

	/**
	 * Check if the app ENV is acceptance
	 * @method envIsAcceptance
	 * @return {object} true if, env is acceptance
	 */
	envIsAcceptance() {
		return this.environment === 'acceptance';
	}

	/**
	 * Watch
	 * @type {boolean}
	 */
	get watch() {
		return window.app.watch;
	}

}

/**
 * Creates the AppProxy and merge it inside the superclass
 * @method
 * @protected
 * @param     {function} superclass Superclass to extend
 * @return    {Object} AppMixins
 */
export default (superclass) => {
	return class AppMixins extends superclass {
		static contextTypes = {
			...superclass.contextTypes,
		};

		/**
		 * Init the app mixins
		 * @method  constructor
		 * @return  {void}
		 */
		constructor() {

			// init the superclass
			super(...arguments);

			// map the app proxy
			this.app = new AppProxy();
		}
	};
};
