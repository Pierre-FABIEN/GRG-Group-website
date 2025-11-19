/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_contact_item4_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Testimonials & feedback`
};

const es_contact_item4_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Testimonios & comentarios`
};

const fr_contact_item4_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Témoignages & retours`
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
export const contact_item4_subtitle = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.contact_item4_subtitle(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("contact_item4_subtitle", locale)
	if (locale === "en") return en_contact_item4_subtitle(inputs)
	if (locale === "es") return es_contact_item4_subtitle(inputs)
	return fr_contact_item4_subtitle(inputs)
};