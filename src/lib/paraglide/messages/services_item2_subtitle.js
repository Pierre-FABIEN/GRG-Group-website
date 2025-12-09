/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_services_item2_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Adaptation & Responsiveness`
};

const es_services_item2_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Adaptación & Reactividad`
};

const fr_services_item2_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Adaptation & Réactivité`
};

const de_services_item2_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Anpassung & Reaktionsfähigkeit`
};

const it_services_item2_subtitle = /** @type {(inputs: {}) => string} */ () => {
	return `Adattamento & Reattività`
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
export const services_item2_subtitle = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.services_item2_subtitle(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("services_item2_subtitle", locale)
	if (locale === "en") return en_services_item2_subtitle(inputs)
	if (locale === "es") return es_services_item2_subtitle(inputs)
	if (locale === "fr") return fr_services_item2_subtitle(inputs)
	if (locale === "de") return de_services_item2_subtitle(inputs)
	return it_services_item2_subtitle(inputs)
};