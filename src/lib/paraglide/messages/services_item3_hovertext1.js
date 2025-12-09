/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_services_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Our partner sites adhere to the most demanding quality standards, ensuring safe, traceable products that comply with international regulations.`
};

const es_services_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Nuestros sitios asociados respetan los estándares de calidad más exigentes, asegurando productos seguros, trazables y conformes a las regulaciones internacionales.`
};

const fr_services_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Nos sites partenaires respectent les standards de qualité les plus exigeants, assurant des produits sûrs, traçables et conformes aux réglementations internationales.`
};

const de_services_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Unsere Partnerstandorte halten die höchsten Qualitätsstandards ein und gewährleisten sichere, rückverfolgbare Produkte, die internationalen Vorschriften entsprechen.`
};

const it_services_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `I nostri siti partner rispettano gli standard di qualità più esigenti, garantendo prodotti sicuri, tracciabili e conformi alle normative internazionali.`
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
const services_item3_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.services_item3_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("services_item3_hovertext1", locale)
	if (locale === "en") return en_services_item3_hovertext1(inputs)
	if (locale === "es") return es_services_item3_hovertext1(inputs)
	if (locale === "fr") return fr_services_item3_hovertext1(inputs)
	if (locale === "de") return de_services_item3_hovertext1(inputs)
	return it_services_item3_hovertext1(inputs)
};
export { services_item3_hovertext1 as "services_item3_hoverText" }