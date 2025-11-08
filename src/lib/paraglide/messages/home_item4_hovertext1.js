/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_home_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Our priority: quality, safe and compliant products that meet consumer expectations and industry standards.`
};

const es_home_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Nuestra prioridad: productos de calidad, seguros y conformes, que cumplen con las expectativas de los consumidores y los estándares de la industria.`
};

const fr_home_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Notre priorité : des produits de qualité, sûrs et conformes, qui répondent aux attentes des consommateurs et aux normes industrielles.`
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
const home_item4_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.home_item4_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("home_item4_hovertext1", locale)
	if (locale === "en") return en_home_item4_hovertext1(inputs)
	if (locale === "es") return es_home_item4_hovertext1(inputs)
	return fr_home_item4_hovertext1(inputs)
};
export { home_item4_hovertext1 as "home_item4_hoverText" }