/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_about_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Creative solutions for packaging, with the possibility to partially or fully delegate this phase according to your needs.`
};

const es_about_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Soluciones creativas para el envase, con la posibilidad de delegar parcial o totalmente esta fase según sus necesidades.`
};

const fr_about_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Des solutions créatives pour le packaging, avec la possibilité de déléguer partiellement ou totalement cette phase selon vos besoins.`
};

const de_about_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Kreative Lösungen für die Verpackung, mit der Möglichkeit, diese Phase je nach Bedarf teilweise oder vollständig zu delegieren.`
};

const it_about_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Soluzioni creative per il packaging, con la possibilità di delegare parzialmente o totalmente questa fase in base alle vostre esigenze.`
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
const about_item4_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.about_item4_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("about_item4_hovertext1", locale)
	if (locale === "en") return en_about_item4_hovertext1(inputs)
	if (locale === "es") return es_about_item4_hovertext1(inputs)
	if (locale === "fr") return fr_about_item4_hovertext1(inputs)
	if (locale === "de") return de_about_item4_hovertext1(inputs)
	return it_about_item4_hovertext1(inputs)
};
export { about_item4_hovertext1 as "about_item4_hoverText" }