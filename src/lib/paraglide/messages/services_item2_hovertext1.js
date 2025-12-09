/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_services_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Our European industrial network ensures rapid adaptability, to effectively respond to market changes and the specific needs of each client.`
};

const es_services_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Nuestra red industrial europea garantiza una capacidad de adaptación rápida, para responder eficazmente a la evolución del mercado y a las necesidades específicas de cada cliente.`
};

const fr_services_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Notre réseau industriel européen garantit une capacité d'adaptation rapide, pour répondre efficacement aux évolutions du marché et aux besoins spécifiques de chaque client.`
};

const de_services_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Unser europäisches Industrienetzwerk gewährleistet schnelle Anpassungsfähigkeit, um effektiv auf Marktveränderungen und spezifische Kundenbedürfnisse zu reagieren.`
};

const it_services_item2_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `La nostra rete industriale europea garantisce una rapida capacità di adattamento, per rispondere efficacemente all'evoluzione del mercato e alle esigenze specifiche di ogni cliente.`
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
const services_item2_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.services_item2_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("services_item2_hovertext1", locale)
	if (locale === "en") return en_services_item2_hovertext1(inputs)
	if (locale === "es") return es_services_item2_hovertext1(inputs)
	if (locale === "fr") return fr_services_item2_hovertext1(inputs)
	if (locale === "de") return de_services_item2_hovertext1(inputs)
	return it_services_item2_hovertext1(inputs)
};
export { services_item2_hovertext1 as "services_item2_hoverText" }