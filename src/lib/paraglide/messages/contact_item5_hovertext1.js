/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_contact_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Send a message to <a href="mailto:contact@grggroupe.com" class="hover-link">contact@grggroupe.com</a>`
};

const es_contact_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Envíe un mensaje a <a href="mailto:contact@grggroupe.com" class="hover-link">contact@grggroupe.com</a>`
};

const fr_contact_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Envoyez un message à <a href="mailto:contact@grggroupe.com" class="hover-link">contact@grggroupe.com</a>`
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
const contact_item5_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.contact_item5_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("contact_item5_hovertext1", locale)
	if (locale === "en") return en_contact_item5_hovertext1(inputs)
	if (locale === "es") return es_contact_item5_hovertext1(inputs)
	return fr_contact_item5_hovertext1(inputs)
};
export { contact_item5_hovertext1 as "contact_item5_hoverText" }