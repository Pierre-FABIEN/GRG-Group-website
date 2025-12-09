/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_home_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `We combine scientific expertise and creativity to design unique and reliable products, from formulation to production.`
};

const es_home_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Combinamos experiencia científica y creatividad para diseñar productos únicos y fiables, desde la formulación hasta la producción.`
};

const fr_home_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Nous combinons expertise scientifique et créativité pour concevoir des produits uniques et fiables, de la formulation à la production.`
};

const de_home_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Wir verbinden wissenschaftliche Expertise und Kreativität, um einzigartige und zuverlässige Produkte zu entwickeln – von der Formulierung bis zur Produktion.`
};

const it_home_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Combiniamo competenza scientifica e creatività per progettare prodotti unici e affidabili, dalla formulazione alla produzione.`
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
const home_item2_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.home_item2_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("home_item2_hovertext1", locale)
	if (locale === "en") return en_home_item2_hovertext1(inputs)
	if (locale === "es") return es_home_item2_hovertext1(inputs)
	if (locale === "fr") return fr_home_item2_hovertext1(inputs)
	if (locale === "de") return de_home_item2_hovertext1(inputs)
	return it_home_item2_hovertext1(inputs)
};
export { home_item2_hovertext1 as "home_item2_hoverText" }