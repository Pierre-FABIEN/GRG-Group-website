/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_products_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Development of supplements in capsules, pill organizers, powders, shots or gummies. Turnkey solutions, ready for market launch under your brand.`
};

const es_products_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Desarrollo de complementos en cápsulas, pastilleros, polvos, shots o gomitas. Soluciones llave en mano, listas para su lanzamiento al mercado bajo su marca.`
};

const fr_products_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Développement de compléments en gélules, piluliers, poudres, shots ou gummies. Des solutions clés en main, prêtes à la mise en marché sous votre marque.`
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
const products_item3_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.products_item3_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("products_item3_hovertext1", locale)
	if (locale === "en") return en_products_item3_hovertext1(inputs)
	if (locale === "es") return es_products_item3_hovertext1(inputs)
	return fr_products_item3_hovertext1(inputs)
};
export { products_item3_hovertext1 as "products_item3_hoverText" }