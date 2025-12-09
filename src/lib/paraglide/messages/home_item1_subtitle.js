/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_home_item1_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Since 2007`
};

const es_home_item1_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Desde 2007`
};

const fr_home_item1_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Depuis 2007`
};

const de_home_item1_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Seit 2007`
};

const it_home_item1_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Dal 2007`
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
export const home_item1_subtitle = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.home_item1_subtitle(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("home_item1_subtitle", locale)
	if (locale === "en") return en_home_item1_subtitle(inputs)
	if (locale === "es") return es_home_item1_subtitle(inputs)
	if (locale === "fr") return fr_home_item1_subtitle(inputs)
	if (locale === "de") return de_home_item1_subtitle(inputs)
	return it_home_item1_subtitle(inputs)
};