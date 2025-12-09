/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_home_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `We work hand in hand with each client to transform your ideas into concrete products ready for commercialization.`
};

const es_home_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Trabajamos mano a mano con cada cliente, para transformar sus ideas en productos concretos y listos para comercializar.`
};

const fr_home_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Nous travaillons main dans la main avec chaque client, pour transformer vos idées en produits concrets et prêts à commercialiser.`
};

const de_home_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Wir arbeiten Hand in Hand mit jedem Kunden, um Ihre Ideen in konkrete, marktreife Produkte zu verwandeln.`
};

const it_home_item5_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Lavoriamo a stretto contatto con ogni cliente, per trasformare le vostre idee in prodotti concreti e pronti per la commercializzazione.`
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
const home_item5_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.home_item5_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("home_item5_hovertext1", locale)
	if (locale === "en") return en_home_item5_hovertext1(inputs)
	if (locale === "es") return es_home_item5_hovertext1(inputs)
	if (locale === "fr") return fr_home_item5_hovertext1(inputs)
	if (locale === "de") return de_home_item5_hovertext1(inputs)
	return it_home_item5_hovertext1(inputs)
};
export { home_item5_hovertext1 as "home_item5_hoverText" }