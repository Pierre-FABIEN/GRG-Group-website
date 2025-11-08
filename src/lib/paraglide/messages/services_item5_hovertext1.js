/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_services_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `From idea to finished product: Our technical teams support each step of product development, from format selection to production, with a high level of expertise.`
};

const es_services_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `De la idea al producto terminado: Nuestros equipos técnicos acompañan cada etapa del desarrollo del producto, desde la elección del formato hasta la puesta en producción, con alto nivel de experiencia.`
};

const fr_services_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `De l'idée au produit fini : Nos équipes techniques accompagnent chaque étape du développement produit, du choix du format à la mise en production, avec un haut niveau d'expertise.`
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
const services_item5_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.services_item5_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("services_item5_hovertext1", locale)
	if (locale === "en") return en_services_item5_hovertext1(inputs)
	if (locale === "es") return es_services_item5_hovertext1(inputs)
	return fr_services_item5_hovertext1(inputs)
};
export { services_item5_hovertext1 as "services_item5_hoverText" }