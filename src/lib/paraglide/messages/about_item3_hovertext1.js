/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_about_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `A catalog of immediately customizable formulas, adapted to your production needs and market requirements.`
};

const es_about_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Un catálogo de fórmulas inmediatamente personalizables, adaptadas a sus necesidades de producción y exigencias del mercado.`
};

const fr_about_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Un catalogue de formules immédiatement personnalisables, adaptées à vos besoins de production et aux exigences du marché.`
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
const about_item3_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.about_item3_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("about_item3_hovertext1", locale)
	if (locale === "en") return en_about_item3_hovertext1(inputs)
	if (locale === "es") return es_about_item3_hovertext1(inputs)
	return fr_about_item3_hovertext1(inputs)
};
export { about_item3_hovertext1 as "about_item3_hoverText" }