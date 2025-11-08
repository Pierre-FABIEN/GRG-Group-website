/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_contact_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Visit our <a href="https://www.linkedin.com/company/grg-groupe-sarl/" target="_blank" rel="noopener noreferrer" class="hover-link">LinkedIn</a> page to follow our news.`
};

const es_contact_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Visite nuestra página de <a href="https://www.linkedin.com/company/grg-groupe-sarl/" target="_blank" rel="noopener noreferrer" class="hover-link">LinkedIn</a> para seguir nuestras noticias.`
};

const fr_contact_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Visitez notre page <a href="https://www.linkedin.com/company/grg-groupe-sarl/" target="_blank" rel="noopener noreferrer" class="hover-link">LinkedIn</a> pour suivre nos actualités.`
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
const contact_item1_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.contact_item1_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("contact_item1_hovertext1", locale)
	if (locale === "en") return en_contact_item1_hovertext1(inputs)
	if (locale === "es") return es_contact_item1_hovertext1(inputs)
	return fr_contact_item1_hovertext1(inputs)
};
export { contact_item1_hovertext1 as "contact_item1_hoverText" }