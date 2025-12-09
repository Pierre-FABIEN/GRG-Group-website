/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_products_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Creation of beverage and supplement recipes according to your objectives: energy, wellness, sports, focus, or sleep. We provide ingredient mapping, samples, technical data sheets, and certificates of analysis.`
};

const es_products_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Creación de recetas de bebidas y complementos según sus objetivos: energía, bienestar, deporte, concentración o sueño. Realizamos mapeo de ingredientes, muestras, fichas técnicas y certificados de análisis.`
};

const fr_products_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Création de recettes boissons et compléments selon vos objectifs : énergie, bien-être, sport, focus ou sommeil. Nous réalisons mapping ingrédients, échantillons, fiches techniques et certificats d'analyse.`
};

const de_products_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Erstellung von Getränke- und Nahrungsergänzungsrezepturen nach Ihren Zielen: Energie, Wohlbefinden, Sport, Fokus oder Schlaf. Wir erstellen Rohstoffkarten, Muster, technische Datenblätter und Analysezertifikate.`
};

const it_products_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Creazione di ricette per bevande e integratori secondo i vostri obiettivi: energia, benessere, sport, concentrazione o sonno. Realizziamo mappatura ingredienti, campioni, schede tecniche e certificati di analisi.`
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
const products_item2_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.products_item2_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("products_item2_hovertext1", locale)
	if (locale === "en") return en_products_item2_hovertext1(inputs)
	if (locale === "es") return es_products_item2_hovertext1(inputs)
	if (locale === "fr") return fr_products_item2_hovertext1(inputs)
	if (locale === "de") return de_products_item2_hovertext1(inputs)
	return it_products_item2_hovertext1(inputs)
};
export { products_item2_hovertext1 as "products_item2_hoverText" }