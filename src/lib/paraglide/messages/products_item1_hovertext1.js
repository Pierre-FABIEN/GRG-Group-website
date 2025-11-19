/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_products_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `International supplier of BPANI aluminium cans designed for private-label food products and beverages.`
};

const es_products_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Proveedor internacional de latas de aluminio BPANI diseñadas para productos alimentarios y bebidas de marca blanca.`
};

const fr_products_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Fournisseur international de canettes aluminium BPANI destinées aux produits alimentaires et boissons en marque blanche.`
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
const products_item1_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.products_item1_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("products_item1_hovertext1", locale)
	if (locale === "en") return en_products_item1_hovertext1(inputs)
	if (locale === "es") return es_products_item1_hovertext1(inputs)
	return fr_products_item1_hovertext1(inputs)
};
export { products_item1_hovertext1 as "products_item1_hoverText" }