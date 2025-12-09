/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_contact_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Discover the feedback and experiences of our satisfied clients and their collaboration with our team.`
};

const es_contact_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Descubra los comentarios y experiencias de nuestros clientes satisfechos y su colaboración con nuestro equipo.`
};

const fr_contact_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Découvrez les retours d'expérience de nos clients satisfaits et leur collaboration avec notre équipe.`
};

const de_contact_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Entdecken Sie die Rückmeldungen und Erfahrungen unserer zufriedenen Kunden und ihre Zusammenarbeit mit unserem Team.`
};

const it_contact_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Scopri i feedback e le esperienze dei nostri clienti soddisfatti e la loro collaborazione con il nostro team.`
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
const contact_item4_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.contact_item4_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("contact_item4_hovertext1", locale)
	if (locale === "en") return en_contact_item4_hovertext1(inputs)
	if (locale === "es") return es_contact_item4_hovertext1(inputs)
	if (locale === "fr") return fr_contact_item4_hovertext1(inputs)
	if (locale === "de") return de_contact_item4_hovertext1(inputs)
	return it_contact_item4_hovertext1(inputs)
};
export { contact_item4_hovertext1 as "contact_item4_hoverText" }