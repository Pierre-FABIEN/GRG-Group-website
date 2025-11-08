/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_contact_item2_title = /** @type {(inputs: {}) => string} */ () => {
	return `Facebook GRG GROUP`
};

const es_contact_item2_title = /** @type {(inputs: {}) => string} */ () => {
	return `Facebook GRG GRUPO`
};

const fr_contact_item2_title = /** @type {(inputs: {}) => string} */ () => {
	return `Facebook GRG GROUPE`
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
export const contact_item2_title = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.contact_item2_title(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("contact_item2_title", locale)
	if (locale === "en") return en_contact_item2_title(inputs)
	if (locale === "es") return es_contact_item2_title(inputs)
	return fr_contact_item2_title(inputs)
};