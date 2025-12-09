/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_products_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Complete graphic and packaging support: visual design, product dressing, labels, point-of-sale displays, and digital media. Creative solutions ready for production.`
};

const es_products_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Acompañamiento gráfico y de packaging completo: concepción visual, vestimenta de productos, etiquetas, materiales de punto de venta y soportes digitales. Soluciones creativas listas para producir.`
};

const fr_products_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Accompagnement graphique et packaging complet : conception visuelle, habillages de produits, étiquettes, PLV et supports numériques. Des solutions créatives prêtes à produire.`
};

const de_products_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Umfassende grafische und Verpackungsunterstützung: visuelles Design, Produktgestaltung, Etiketten, POS-Material und digitale Medien. Kreative Lösungen, fertig für die Produktion.`
};

const it_products_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Supporto grafico e di packaging completo: progettazione visiva, vestizione prodotti, etichette, materiali punto vendita e supporti digitali. Soluzioni creative pronte per la produzione.`
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
const products_item5_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.products_item5_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("products_item5_hovertext1", locale)
	if (locale === "en") return en_products_item5_hovertext1(inputs)
	if (locale === "es") return es_products_item5_hovertext1(inputs)
	if (locale === "fr") return fr_products_item5_hovertext1(inputs)
	if (locale === "de") return de_products_item5_hovertext1(inputs)
	return it_products_item5_hovertext1(inputs)
};
export { products_item5_hovertext1 as "products_item5_hoverText" }