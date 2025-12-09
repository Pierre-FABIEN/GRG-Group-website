/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_products_item4_title = /** @type {(inputs: {}) => string} */ () => {
	return `Packaging`
};

const es_products_item4_title = /** @type {(inputs: {}) => string} */ () => {
	return `Envase`
};

const fr_products_item4_title = /** @type {(inputs: {}) => string} */ () => {
	return `Packaging`
};

const de_products_item4_title = /** @type {(inputs: {}) => string} */ () => {
	return `Verpackung`
};

const it_products_item4_title = /** @type {(inputs: {}) => string} */ () => {
	return `Packaging`
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
export const products_item4_title = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.products_item4_title(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("products_item4_title", locale)
	if (locale === "en") return en_products_item4_title(inputs)
	if (locale === "es") return es_products_item4_title(inputs)
	if (locale === "fr") return fr_products_item4_title(inputs)
	if (locale === "de") return de_products_item4_title(inputs)
	return it_products_item4_title(inputs)
};