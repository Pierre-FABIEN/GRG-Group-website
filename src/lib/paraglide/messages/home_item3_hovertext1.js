/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_home_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `We support brands and distributors in every key step, with flexibility and rigor, to bring their ideas to market.`
};

const es_home_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Apoyamos a marcas y distribuidores en cada paso clave, con flexibilidad y rigor, para llevar sus ideas al mercado.`
};

const fr_home_item3_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Nous accompagnons marques et distributeurs dans chaque étape clé, avec flexibilité et rigueur, pour amener leurs idées sur le marché.`
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
const home_item3_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.home_item3_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("home_item3_hovertext1", locale)
	if (locale === "en") return en_home_item3_hovertext1(inputs)
	if (locale === "es") return es_home_item3_hovertext1(inputs)
	return fr_home_item3_hovertext1(inputs)
};
export { home_item3_hovertext1 as "home_item3_hoverText" }