/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_home_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Our priority: quality, safe, and compliant products that meet consumer expectations and industry standards.`
};

const es_home_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Nuestra prioridad: productos de calidad, seguros y conformes, que responden a las expectativas de los consumidores y a las normas industriales.`
};

const fr_home_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Notre priorité : des produits de qualité, sûrs et conformes, qui répondent aux attentes des consommateurs et aux normes industrielles.`
};

const de_home_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Unsere Priorität: qualitativ hochwertige, sichere und konforme Produkte, die den Verbrauchererwartungen und Industriestandards entsprechen.`
};

const it_home_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `La nostra priorità: prodotti di qualità, sicuri e conformi, che rispondono alle aspettative dei consumatori e alle norme industriali.`
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
const home_item4_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.home_item4_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("home_item4_hovertext1", locale)
	if (locale === "en") return en_home_item4_hovertext1(inputs)
	if (locale === "es") return es_home_item4_hovertext1(inputs)
	if (locale === "fr") return fr_home_item4_hovertext1(inputs)
	if (locale === "de") return de_home_item4_hovertext1(inputs)
	return it_home_item4_hovertext1(inputs)
};
export { home_item4_hovertext1 as "home_item4_hoverText" }