/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_products_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Premium energy drink, a brand born in Toulouse in 2007. More indulgent recipes, more juice and less sugar.`
};

const es_products_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Bebida energética premium, una marca nacida en Toulouse en 2007. Recetas más indulgentes, más jugo y menos azúcar.`
};

const fr_products_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Boisson énergisantes premium, une marque née à Toulouse en 2007. Recettes plus gourmandes, plus de jus et moins de sucre.`
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