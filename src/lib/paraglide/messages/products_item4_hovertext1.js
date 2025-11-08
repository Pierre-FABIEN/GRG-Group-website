/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_products_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Flexible European production: aluminum cans, glass or PET bottles, sticks, sachets, pill organizers... High quality standards and quick adaptation to market needs.`
};

const es_products_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Producción europea flexible: latas de aluminio, botellas de vidrio o PET, sticks, sobres, pastilleros... Altos estándares de calidad y rápida adaptación a las necesidades del mercado.`
};

const fr_products_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Production européenne flexible : canettes aluminium, bouteilles verre ou PET, sticks, sachets, piluliers... Standards qualité élevés et adaptation rapide aux besoins du marché.`
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
const products_item4_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.products_item4_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("products_item4_hovertext1", locale)
	if (locale === "en") return en_products_item4_hovertext1(inputs)
	if (locale === "es") return es_products_item4_hovertext1(inputs)
	return fr_products_item4_hovertext1(inputs)
};
export { products_item4_hovertext1 as "products_item4_hoverText" }