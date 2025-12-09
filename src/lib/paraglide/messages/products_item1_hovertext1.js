/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_products_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `International supplier of BPANI aluminum cans for white-label food and beverage products.`
};

const es_products_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Proveedor internacional de latas de aluminio BPANI destinadas a productos alimenticios y bebidas de marca blanca.`
};

const fr_products_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Fournisseur international de canettes aluminium BPANI destinées aux produits alimentaires et boissons en marque blanche.`
};

const de_products_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Internationaler Lieferant von BPANI-Aluminiumdosen für White-Label-Lebensmittel- und Getränkeprodukte.`
};

const it_products_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Fornitore internazionale di lattine in alluminio BPANI destinate a prodotti alimentari e bevande a marchio bianco.`
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
const products_item1_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.products_item1_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("products_item1_hovertext1", locale)
	if (locale === "en") return en_products_item1_hovertext1(inputs)
	if (locale === "es") return es_products_item1_hovertext1(inputs)
	if (locale === "fr") return fr_products_item1_hovertext1(inputs)
	if (locale === "de") return de_products_item1_hovertext1(inputs)
	return it_products_item1_hovertext1(inputs)
};
export { products_item1_hovertext1 as "products_item1_hoverText" }