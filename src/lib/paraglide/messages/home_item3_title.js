/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_home_item3_title = /** @type {(inputs: {}) => string} */ () => {
	return `Our Vision`
};

const es_home_item3_title = /** @type {(inputs: {}) => string} */ () => {
	return `Nuestra Visión`
};

const fr_home_item3_title = /** @type {(inputs: {}) => string} */ () => {
	return `Notre Vision`
};

const de_home_item3_title = /** @type {(inputs: {}) => string} */ () => {
	return `Unsere Vision`
};

const it_home_item3_title = /** @type {(inputs: {}) => string} */ () => {
	return `La Nostra Visione`
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
* @param {{ locale?: "en" | "es" | "fr" | "de" | "it" }} options
* @returns {string}
*/
/* @__NO_SIDE_EFFECTS__ */
export const home_item3_title = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.home_item3_title(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("home_item3_title", locale)
	if (locale === "en") return en_home_item3_title(inputs)
	if (locale === "es") return es_home_item3_title(inputs)
	if (locale === "fr") return fr_home_item3_title(inputs)
	if (locale === "de") return de_home_item3_title(inputs)
	return it_home_item3_title(inputs)
};