/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_products_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Graphic support and complete packaging: visual design, product branding, labels, POS materials and digital supports. Creative solutions ready for production.`
};

const es_products_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Acompañamiento gráfico y packaging completo: diseño visual, branding de productos, etiquetas, materiales POS y soportes digitales. Soluciones creativas listas para producir.`
};

const fr_products_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Accompagnement graphique et packaging complet : conception visuelle, habillages de produits, étiquettes, PLV et supports numériques. Des solutions créatives prêtes à produire.`
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
const products_item5_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.products_item5_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("products_item5_hovertext1", locale)
	if (locale === "en") return en_products_item5_hovertext1(inputs)
	if (locale === "es") return es_products_item5_hovertext1(inputs)
	return fr_products_item5_hovertext1(inputs)
};
export { products_item5_hovertext1 as "products_item5_hoverText" }