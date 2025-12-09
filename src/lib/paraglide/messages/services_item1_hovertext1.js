/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_services_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `We offer a wide range of formats: cans, glass or PET bottles, shots, pill organizers, and much more, to adapt to every type of project.`
};

const es_services_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Ofrecemos una amplia gama de formatos: latas, botellas de vidrio o PET, shots, pastilleros y mucho más, para adaptarse a cada tipo de proyecto.`
};

const fr_services_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Nous proposons une large gamme de formats : canettes, bouteilles en verre ou PET, shots, piluliers et bien plus encore, pour s'adapter à chaque type de projet.`
};

const de_services_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Wir bieten ein breites Spektrum an Formaten: Dosen, Glas- oder PET-Flaschen, Shots, Pillenboxen und vieles mehr, um uns an jede Projektart anzupassen.`
};

const it_services_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Offriamo un'ampia gamma di formati: lattine, bottiglie di vetro o PET, shot, portapillole e molto altro, per adattarci ad ogni tipo di progetto.`
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
const services_item1_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.services_item1_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("services_item1_hovertext1", locale)
	if (locale === "en") return en_services_item1_hovertext1(inputs)
	if (locale === "es") return es_services_item1_hovertext1(inputs)
	if (locale === "fr") return fr_services_item1_hovertext1(inputs)
	if (locale === "de") return de_services_item1_hovertext1(inputs)
	return it_services_item1_hovertext1(inputs)
};
export { services_item1_hovertext1 as "services_item1_hoverText" }