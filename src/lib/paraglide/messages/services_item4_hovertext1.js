/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_services_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Thanks to our industrial network spread across several European sites, we ensure production continuity and high logistical availability.`
};

const es_services_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Gracias a nuestra red industrial distribuida en varios sitios europeos, aseguramos una continuidad de producción y una gran disponibilidad logística.`
};

const fr_services_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Grâce à notre réseau industriel réparti sur plusieurs sites européens, nous assurons une continuité de production et une grande disponibilité logistique.`
};

const de_services_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Dank unseres über mehrere europäische Standorte verteilten Industrienetzwerks gewährleisten wir Produktionskontinuität und hohe logistische Verfügbarkeit.`
};

const it_services_item4_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Grazie alla nostra rete industriale distribuita su diversi siti europei, assicuriamo una continuità produttiva e una grande disponibilità logistica.`
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
const services_item4_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.services_item4_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("services_item4_hovertext1", locale)
	if (locale === "en") return en_services_item4_hovertext1(inputs)
	if (locale === "es") return es_services_item4_hovertext1(inputs)
	if (locale === "fr") return fr_services_item4_hovertext1(inputs)
	if (locale === "de") return de_services_item4_hovertext1(inputs)
	return it_services_item4_hovertext1(inputs)
};
export { services_item4_hovertext1 as "services_item4_hoverText" }