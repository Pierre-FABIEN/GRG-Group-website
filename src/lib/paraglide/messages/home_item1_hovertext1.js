/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_home_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `For over 15 years, GRG Groupe Food & Beverage has been supporting brands and project leaders in the development of beverages and food supplements.`
};

const es_home_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Desde hace más de 15 años, GRG Groupe Food & Beverage acompaña a marcas y promotores de proyectos en el desarrollo de bebidas y complementos alimenticios.`
};

const fr_home_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `GRG Groupe Food & Beverage accompagne depuis plus de 15 ans les marques et porteurs de projet dans le développement de boissons et compléments alimentaires.`
};

const de_home_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Seit über 15 Jahren begleitet GRG Groupe Food & Beverage Marken und Projektinitiatoren bei der Entwicklung von Getränken und Nahrungsergänzungsmitteln.`
};

const it_home_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Da oltre 15 anni, GRG Groupe Food & Beverage accompagna marchi e promotori di progetti nello sviluppo di bevande e integratori alimentari.`
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
const home_item1_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.home_item1_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("home_item1_hovertext1", locale)
	if (locale === "en") return en_home_item1_hovertext1(inputs)
	if (locale === "es") return es_home_item1_hovertext1(inputs)
	if (locale === "fr") return fr_home_item1_hovertext1(inputs)
	if (locale === "de") return de_home_item1_hovertext1(inputs)
	return it_home_item1_hovertext1(inputs)
};
export { home_item1_hovertext1 as "home_item1_hoverText" }