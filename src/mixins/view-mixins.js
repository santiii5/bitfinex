/**
 * @class ViewProxy
 */
class ViewProxy {

	/**
	 * Object instance permit to manage a singleton pattern
	 * @type {ViewProxy}
	 */
	static instance = null;

	/**
	 * Static constructor allows only one instance
	 * @method    forge
	 * @protected
	 * @param     {function} dispatch the dispatch fn to use
	 * @return    {ViewProxy} Instance
	 */
	static forge() {
		if (ViewProxy.instance === null) {
			ViewProxy.instance = new ViewProxy();
		}

		return ViewProxy.instance;
	}

	/**
	 * Content DOM node reference
	 * @type {Object}
	 */
	contentDomNode = null;

	/**
	 * Scroll in the content
	 * @method scrollInContent
	 * @param  {Number}  ypos	Y position
	 * @return {void}
	 */
	scrollInContent(ypos) {
		setTimeout(() => {
			const newYpos = ypos - this.contentDomNode.offsetTop;

			if (this.contentDomNode.scrollTop !== newYpos) {
				this.contentDomNode.scrollTop = newYpos;
			}
		}, 1);
	}

}

/**
 * Creates the ViewMixins and merge it inside the superclass
 * @method
 * @protected
 * @param     {function} superclass Superclass to extend
 * @return    {Object} ViewMixins
 */
export default (superclass) => {
	return class ViewMixins extends superclass {

		/**
		 * Init the view mixins
		 * @constructor
		 */
		constructor() {
			// init the superclass
			super(...arguments);
			// set the view properties on the instance itself
			this.view = ViewProxy.forge();
		}

	};
};
