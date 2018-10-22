/**
 * Main class used to Mix mixins.
 * Merges classes using a reducer and return the new superclass.
 * @class Mix
 */
class Mix {

	/**
	 * Init the mixer with all the mixins wanted
	 * @constructor
	 * @param  {array.<classes>}  mixins	The mixins wanted
	 * @return {void}
	 */
	constructor(mixins) {
		this.mixins = mixins;
	}

	/**
	 * Set the class in which we want to apply the mixins
	 * @param  {classes}  superclass	The superclass in which to apply the mixins
	 * @return {classes}				The new class instance
	 */
	in(superclass) {
		return this.mixins.reduce((c, mixin) => {
			return mixin(c);
		}, superclass);
	}
}

/**
 * Export used to mix classes
 * @public
 * @method    mix
 * @param     {Object} mixins Mixins to mix
 * @return    {Mix} New mixin
 */
export default (...mixins) => {
	return new Mix(mixins);
};
