/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_contact_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Join us on <a href="https://www.facebook.com/GRFBSmilkteasupplies/" target="_blank" rel="noopener noreferrer" class="hover-link">Facebook</a> to discover our latest updates.`
};

const es_contact_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Únase a nosotros en <a href="https://www.facebook.com/GRFBSmilkteasupplies/" target="_blank" rel="noopener noreferrer" class="hover-link">Facebook</a> para descubrir nuestras novedades.`
};

const fr_contact_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Rejoignez-nous sur <a href="https://www.facebook.com/GRFBSmilkteasupplies/" target="_blank" rel="noopener noreferrer" class="hover-link">Facebook</a> pour découvrir nos nouveautés.`
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
const contact_item2_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.contact_item2_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("contact_item2_hovertext1", locale)
	if (locale === "en") return en_contact_item2_hovertext1(inputs)
	if (locale === "es") return es_contact_item2_hovertext1(inputs)
	return fr_contact_item2_hovertext1(inputs)
};
export { contact_item2_hovertext1 as "contact_item2_hoverText" }