/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_products_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Creation of beverage and supplement recipes according to your objectives: energy, wellness, sports, focus or sleep. We provide ingredient mapping, samples, technical sheets and analysis certificates.`
};

const es_products_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Creación de recetas de bebidas y complementos según sus objetivos: energía, bienestar, deporte, concentración o sueño. Realizamos mapeo de ingredientes, muestras, fichas técnicas y certificados de análisis.`
};

const fr_products_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Création de recettes boissons et compléments selon vos objectifs : énergie, bien-être, sport, focus ou sommeil. Nous réalisons mapping ingrédients, échantillons, fiches techniques et certificats d'analyse.`
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
const products_item2_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.products_item2_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("products_item2_hovertext1", locale)
	if (locale === "en") return en_products_item2_hovertext1(inputs)
	if (locale === "es") return es_products_item2_hovertext1(inputs)
	return fr_products_item2_hovertext1(inputs)
};
export { products_item2_hovertext1 as "products_item2_hoverText" }