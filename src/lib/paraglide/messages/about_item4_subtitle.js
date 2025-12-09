/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_about_item4_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Packaging & Creativity`
};

const es_about_item4_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Packaging & Creatividad`
};

const fr_about_item4_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Packaging & Créativité`
};

const de_about_item4_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Verpackung & Kreativität`
};

const it_about_item4_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Packaging & Creatività`
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
export const about_item4_subtitle = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.about_item4_subtitle(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("about_item4_subtitle", locale)
	if (locale === "en") return en_about_item4_subtitle(inputs)
	if (locale === "es") return es_about_item4_subtitle(inputs)
	if (locale === "fr") return fr_about_item4_subtitle(inputs)
	if (locale === "de") return de_about_item4_subtitle(inputs)
	return it_about_item4_subtitle(inputs)
};