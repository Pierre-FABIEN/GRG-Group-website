/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_contact_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `They trusted us for the development of their products and share their experience with GRG Group.`
};

const es_contact_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Confiaron en nosotros para el desarrollo de sus productos y comparten su experiencia con GRG Group.`
};

const fr_contact_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Ils nous ont faits confiance pour le développement de leurs produits et partagent leur expérience avec GRG Group.`
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
const contact_item3_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.contact_item3_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("contact_item3_hovertext1", locale)
	if (locale === "en") return en_contact_item3_hovertext1(inputs)
	if (locale === "es") return es_contact_item3_hovertext1(inputs)
	return fr_contact_item3_hovertext1(inputs)
};
export { contact_item3_hovertext1 as "contact_item3_hoverText" }