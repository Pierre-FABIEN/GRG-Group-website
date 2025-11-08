/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_services_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Our European industrial network guarantees rapid adaptation capacity to effectively respond to market evolution and specific client needs.`
};

const es_services_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Nuestra red industrial europea garantiza capacidad de adaptación rápida, para responder eficazmente a la evolución del mercado y necesidades específicas de cada cliente.`
};

const fr_services_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Notre réseau industriel européen garantit une capacité d'adaptation rapide, pour répondre efficacement aux évolutions du marché et aux besoins spécifiques de chaque client.`
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
const services_item2_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.services_item2_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("services_item2_hovertext1", locale)
	if (locale === "en") return en_services_item2_hovertext1(inputs)
	if (locale === "es") return es_services_item2_hovertext1(inputs)
	return fr_services_item2_hovertext1(inputs)
};
export { services_item2_hovertext1 as "services_item2_hoverText" }