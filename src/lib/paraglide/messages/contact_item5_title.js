/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_contact_item5_title = /** @type {(inputs: {}) => string} */ () => {
	return `Email Contact`
};

const es_contact_item5_title = /** @type {(inputs: {}) => string} */ () => {
	return `Contacto por Email`
};

const fr_contact_item5_title = /** @type {(inputs: {}) => string} */ () => {
	return `Contact Email`
};

/**
* This function has been compiled by [Paraglide JS](https://inlang.com/m/gerre34r).
*
* - Changing this function will be over-written by the next build.
*
* - If you want to change the translations, you can either edit the source files e.g. `en.json`, or
* use another inlang app like [Fink](https://inlang.com/m/tdozzpar) or the [VSCode extension Sherlock](https://inlang.com/m/r7kp499g).
* 
* @param {{}} inputs
* @param {{ locale?: "en" | "es" | "fr" }} options
* @returns {string}
*/
/* @__NO_SIDE_EFFECTS__ */
export const contact_item5_title = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.contact_item5_title(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("contact_item5_title", locale)
	if (locale === "en") return en_contact_item5_title(inputs)
	if (locale === "es") return es_contact_item5_title(inputs)
	return fr_contact_item5_title(inputs)
};