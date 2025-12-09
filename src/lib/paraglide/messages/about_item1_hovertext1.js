/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_about_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `An agile approach, a responsive structure, and accessible production volumes, perfectly suited for brand launches, limited editions, or product line extensions.`
};

const es_about_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Un enfoque ágil, una estructura reactiva y volúmenes de producción accesibles, perfectamente adaptados a lanzamientos de marca, series limitadas o ampliaciones de gama.`
};

const fr_about_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Une approche agile, une structure réactive et des volumes de production accessibles, parfaitement adaptés aux lancements de marque, séries limitées ou extensions de gamme.`
};

const de_about_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Ein agiler Ansatz, eine reaktionsfähige Struktur und zugängliche Produktionsmengen, perfekt geeignet für Markteinführungen, limitierte Auflagen oder Sortimentserweiterungen.`
};

const it_about_item1_hovertext1 = /** @type {(inputs: {}) => string} */ () => {
	return `Un approccio agile, una struttura reattiva e volumi di produzione accessibili, perfettamente adatti a lanci di marca, serie limitate o estensioni di gamma.`
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
const about_item1_hovertext1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.about_item1_hovertext1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("about_item1_hovertext1", locale)
	if (locale === "en") return en_about_item1_hovertext1(inputs)
	if (locale === "es") return es_about_item1_hovertext1(inputs)
	if (locale === "fr") return fr_about_item1_hovertext1(inputs)
	if (locale === "de") return de_about_item1_hovertext1(inputs)
	return it_about_item1_hovertext1(inputs)
};
export { about_item1_hovertext1 as "about_item1_hoverText" }