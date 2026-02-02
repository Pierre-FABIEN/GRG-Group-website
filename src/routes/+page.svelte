<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import { scale } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages.js';

const bentoItems = [
	{ 
		id: 1, 
		title: m.home_item1_title(),
		subtitle: m.home_item1_subtitle(),
		hoverText: m.home_item1_hoverText(),
		additionalText: m.home_item1_additionalText(),
		icon: '',
		cardClass: 'card-1', 
		row: 'top',
		extraTall: true
	},
	{ 
		id: 2, 
		title: m.home_item2_title(),
		subtitle: m.home_item2_subtitle(),
		hoverText: m.home_item2_hoverText(),
		additionalText: m.home_item2_additionalText(),
		icon: '',
		cardClass: 'card-2', 
		row: 'top'
	},
	{ 
		id: 3, 
		title: m.home_item3_title(),
		subtitle: m.home_item3_subtitle(),
		hoverText: m.home_item3_hoverText(),
		additionalText: m.home_item3_additionalText(),
		icon: '',
		cardClass: 'card-3', 
		row: 'bottom'
	},
	{ 
		id: 4, 
		title: m.home_item4_title(),
		subtitle: m.home_item4_subtitle(),
		hoverText: m.home_item4_hoverText(),
		additionalText: m.home_item4_additionalText(),
		icon: '',
		cardClass: 'card-4', 
		row: 'bottom'
	},
	{ 
		id: 5, 
		title: m.home_item5_title(),
		subtitle: m.home_item5_subtitle(),
		hoverText: m.home_item5_hoverText(),
		additionalText: m.home_item5_additionalText(),
		icon: '',
		cardClass: 'card-5', 
		row: 'bottom',
		needsMargin: true
	}
];


	let hoveredCard: number | null = null;
	let hoveredRow: string | null = null;

	function handleCardHover(id: number) {
		hoveredCard = id;
		const card = bentoItems.find(item => item.id === id);
		hoveredRow = card?.row || null;
	}

	function handleCardLeave() {
		hoveredCard = null;
		hoveredRow = null;
	}

	function handleCardClick(item: any) {
		console.log('Clicked:', item.title);
	}

	function isInSameRow(item: any): boolean {
		return hoveredRow !== null && item.row === hoveredRow && hoveredCard !== item.id;
	}

function getHighlightedText(text: string): any[] {
	if (!text || text.trim() === '') return [];

	const words = text.split(' ');
	if (words.length === 1) return [text];

	const lastWord = words.pop();
	const rest = words.join(' ');

	return [
		rest + ' ',
		{ type: 'highlight', text: lastWord }
	];
}

function getForcedHighlightedText(text: string): any[] {
	if (!text || text.trim() === '') return [];
	return [{ type: 'highlight', text }];
}


	function getTitleParts(item: any): any[] {
	// Carte 1 : highlight ciblé "GRG GROUPE"
	if (item.id === 1) {
		const searchTerm = 'GRG GROUPE';
		if (item.title.includes(searchTerm)) {
			const parts = item.title.split(searchTerm);
			return [
				parts[0],
				{ type: 'highlight', text: searchTerm },
				parts[1] || ''
			].filter(Boolean);
		}
		return [item.title];
	}

	// Cartes 3 et 4 : highlight FORCÉ (même 1 mot)
	if (item.id === 3 || item.id === 4) {
		return getForcedHighlightedText(item.title);
	}

	// Autres cartes : highlight classique
	return getHighlightedText(item.title);
}

function getSubtitleParts(item: any): any {
    if (item.id === 4) {
        // Item 4: highlight "Creativity" dans le sous-titre
        return getHighlightedText(item.subtitle); // ✅ CORRECT - highlight dernier mot
    }
    return item.subtitle;
}
</script>

<h1 style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap">
	GRG Groupe : Food and Beverages
</h1>

<h2 style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap">
	Marque blanche de boissons et compléments alimentaires
</h2>

<h2 style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap">
	Création, production et personnalisation de boissons fonctionnelles
</h2>

<div class="page-wrapper">
	<div class="bento-container">
		<div class="bento-row top">
			{#each bentoItems.filter(i => i.row === 'top') as item, i (item.id)}
				<div
					class="bento-card {item.cardClass}"
					class:extra-tall={item.extraTall}
					class:hovered={hoveredCard === item.id}
					class:same-row={isInSameRow(item)}
					class:expanded-mobile={hoveredCard === item.id}
					onmouseenter={() => handleCardHover(item.id)}
					onmouseleave={handleCardLeave}
					onclick={() => handleCardClick(item)}
					role="button"
					tabindex="0"
					in:scale={{ delay: i * 100, duration: 600 }}
				>
					<div class="card-content" class:hide-content={hoveredCard === item.id}>
						{#if item.icon}
							<div class="card-icon">{item.icon}</div>
						{/if}
						<h3 class="card-title">
							{#each getTitleParts(item) as part}
								{#if typeof part === 'object' && part.type === 'highlight'}
									<span class="highlight-word">{part.text}</span>
								{:else}
									{part}
								{/if}
							{/each}
						</h3>
						<p class="card-subtitle">
							{#if item.id === 4}
								{#each getSubtitleParts(item) as part}
									{#if typeof part === 'object' && part.type === 'highlight'}
										<span class="highlight-word">{part.text}</span>
									{:else}
										{part}
									{/if}
								{/each}
							{:else}
								{item.subtitle}
							{/if}
						</p>
						{#if item.additionalText}
	<p class="additional-text">{item.additionalText}</p>
{/if}


					</div>

					<div class="card-hover-content" class:show={hoveredCard === item.id}>
						<p class="hover-text">{@html item.hoverText}</p>
					</div>

					<div class="card-overlay" class:show={hoveredCard === item.id}></div>
				</div>
			{/each}
		</div>

		<div class="bento-row bottom">
			{#each bentoItems.filter(i => i.row === 'bottom') as item, i (item.id)}
				<div
					class="bento-card {item.cardClass}"
					class:needs-margin={item.needsMargin}
					class:hovered={hoveredCard === item.id}
					class:same-row={isInSameRow(item)}
					class:expanded-mobile={hoveredCard === item.id}
					onmouseenter={() => handleCardHover(item.id)}
					onmouseleave={handleCardLeave}
					onclick={() => handleCardClick(item)}
					role="button"
					tabindex="0"
					in:scale={{ delay: i * 100, duration: 600 }}
				>
					<div class="card-content" class:hide-content={hoveredCard === item.id}>
						{#if item.icon}
							<div class="card-icon">{item.icon}</div>
						{/if}
						<h3 class="card-title">
							{#each getTitleParts(item) as part}
								{#if typeof part === 'object' && part.type === 'highlight'}
									<span class="highlight-word">{part.text}</span>
								{:else}
									{part}
								{/if}
							{/each}
						</h3>
						<p class="card-subtitle">
							{#if item.id === 4}
								{#each getSubtitleParts(item) as part}
									{#if typeof part === 'object' && part.type === 'highlight'}
										<span class="highlight-word">{part.text}</span>
									{:else}
										{part}
									{/if}
								{/each}
							{:else}
								{item.subtitle}
							{/if}
						</p>
						{#if item.additionalText}
	<p class="additional-text">{item.additionalText}</p>
{/if}


					</div>
					<div class="card-hover-content" class:show={hoveredCard === item.id}>
						<p class="hover-text">{@html item.hoverText}</p>
					</div>

					<div class="card-overlay" class:show={hoveredCard === item.id}></div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	/* VARIABLES */
:root {
	--contrast-light-1: #e5e5e5;
	--contrast-light-2: #d4d4d4;
	--contrast-light-3: #a3a3a3;
	--contrast-dark-1: #404040;
	--contrast-dark-2: #525252;
	--contrast-dark-3: #737373;
}

/* ============================================ */
/* STYLES DE BASE */
/* ============================================ */

.page-wrapper {
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	box-sizing: border-box;
	font-family: 'open-sans', sans-serif;
	overflow: hidden;
	background: transparent;
}

.bento-container {
	width: 100%;
	max-width: 1400px;
	padding: 1.5rem;
	box-sizing: border-box;
	margin: 0 auto;
}

.bento-row {
	display: flex;
	width: 100%;
	gap: 1.25rem;
	margin-bottom: 1.25rem;
	height: calc(50vh - 2.25rem);
	box-sizing: border-box;
}

.bento-row:last-child {
	margin-bottom: 0;
}

.bento-card {
	position: relative;
	border-radius: 1.75rem;
	padding: 2.5rem;
	cursor: pointer;
	overflow: hidden;
	box-sizing: border-box;
	min-width: 0;
	max-width: 100%;
	flex: 1 1 0;
	transition: flex 0.3s ease, opacity 0.2s ease;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.bento-card.extra-tall {
	flex: 1.2 1 0;
}

.bento-card.hovered {
	flex: 2 1 0;
	z-index: 10;
}

.bento-card.same-row {
	flex: 1 1 0;
	opacity: 0.8;
}

.bento-card.needs-margin {
	margin-bottom: 2rem;
}

/* ============================================ */
/* CONTENU DES CARTES */
/* ============================================ */

.card-content {
	position: relative;
	z-index: 2;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: start;
	transition: opacity 0.1s ease, transform 0.1s ease;
}

.card-content.hide-content {
	opacity: 0;
	transform: translateY(-10px);
}

.card-title {
	font-size: 2rem;
	font-weight: 800;
	text-transform: uppercase;
	margin: 0 0 0.75rem;
	line-height: 1.2;
}

.card-subtitle {
	font-size: 1.25rem;
	font-weight: 600;
	text-transform: uppercase;
	margin: 0;
	opacity: 0.85;
	line-height: 1.4;
}

.additional-text {
	font-size: 1.25rem;
	line-height: 1.6;
	font-weight: 500;
	margin-top: 1rem;
	margin-bottom: 0;
	text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

/* ============================================ */
/* COULEURS DES TEXTES */
/* ============================================ */

/* Cartes claires (1, 3, 4, 5) : texte noir */
.card-1 .card-title,
.card-1 .card-subtitle,
.card-1 .additional-text,
.card-3 .card-title,
.card-3 .card-subtitle,
.card-3 .additional-text,
.card-4 .card-title,
.card-4 .card-subtitle,
.card-4 .additional-text,
.card-5 .card-title,
.card-5 .card-subtitle,
.card-5 .additional-text {
	color: var(--gray-900, #171717);
}

.card-1 .additional-text,
.card-3 .additional-text,
.card-4 .additional-text,
.card-5 .additional-text {
	text-shadow: 0 2px 12px rgba(255, 255, 255, 0.7);
}

/* Carte sombre (2) : texte blanc */
.card-2 .card-title,
.card-2 .card-subtitle,
.card-2 .additional-text {
	color: var(--gray-100, #f5f5f5);
}

.card-2 .additional-text {
	text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

/* Mode sombre : inversion */
:global(.dark) .card-1 .card-title,
:global(.dark) .card-1 .card-subtitle,
:global(.dark) .card-1 .additional-text,
:global(.dark) .card-3 .card-title,
:global(.dark) .card-3 .card-subtitle,
:global(.dark) .card-3 .additional-text,
:global(.dark) .card-4 .card-title,
:global(.dark) .card-4 .card-subtitle,
:global(.dark) .card-4 .additional-text,
:global(.dark) .card-5 .card-title,
:global(.dark) .card-5 .card-subtitle,
:global(.dark) .card-5 .additional-text {
	color: var(--gray-100, #f5f5f5);
	text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

:global(.dark) .card-2 .additional-text {
	color: var(--gray-100, #f5f5f5);
	text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

/* ============================================ */
/* TAILLES SPÉCIFIQUES */
/* ============================================ */

.card-1 .card-title {
	font-size: 2.5rem;
}

.card-1 .card-subtitle {
	font-size: 1.4rem;
}

.card-4 .card-title {
	font-size: 1.25rem;
	font-weight: 600;
	opacity: 0.85;
	line-height: 1.4;
	margin-bottom: 0;
}

.card-4 .card-subtitle {
	font-size: 2rem;
	font-weight: 800;
	opacity: 1;
	line-height: 1.2;
	margin-bottom: 0.75rem;
}

/* ============================================ */
/* HIGHLIGHT */
/* ============================================ */

.highlight-word {
	position: relative;
	display: inline-block;
	z-index: 2;
}

.highlight-word::before {
	content: "";
	position: absolute;
	left: -2%;
	bottom: 0;
	width: 104%;
	height: 45%;
	background: linear-gradient(90deg, 
		rgba(255, 85, 85, 0.35) 0%, 
		rgba(255, 85, 85, 0.4) 50%, 
		rgba(255, 85, 85, 0.35) 100%
	);
	z-index: -1;
	pointer-events: none;
	transform: skewY(-1deg);
}

/* ============================================ */
/* HOVER CONTENT */
/* ============================================ */

.card-hover-content {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 3;
	width: 85%;
	text-align: center;
	opacity: 0;
	transition: opacity 0.2s ease;
	pointer-events: none;
}

.card-hover-content.show {
	opacity: 1;
}

.hover-text {
	color: var(--gray-100, #f5f5f5);
	font-size: 1.25rem;
	line-height: 1.6;
	font-weight: 500;
	text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
	margin: 0;
}

/* ============================================ */
/* BACKGROUNDS */
/* ============================================ */

.card-1 {
	background: linear-gradient(135deg, var(--contrast-light-1, #e5e5e5) 0%, var(--contrast-light-2, #d4d4d4) 100%);
}

.card-2 {
	background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25)), url('/grgFB.png') center/cover no-repeat;
}

.card-3 { 
	background: linear-gradient(135deg, var(--contrast-light-2, #d4d4d4) 0%, var(--contrast-light-3, #a3a3a3) 100%); 
}

.card-4 {
	background: linear-gradient(135deg, var(--contrast-light-1, #e5e5e5) 0%, var(--contrast-light-2, #d4d4d4) 100%);
}

.card-5 {
	background: linear-gradient(135deg, var(--contrast-light-2, #d4d4d4) 0%, var(--contrast-light-3, #a3a3a3) 100%);
}

:global(.dark) .card-1 { 
	background: linear-gradient(135deg, var(--contrast-dark-1, #404040) 0%, var(--contrast-dark-2, #525252) 100%); 
}

:global(.dark) .card-3 { 
	background: linear-gradient(135deg, var(--contrast-dark-2, #525252) 0%, var(--contrast-dark-3, #737373) 100%); 
}

:global(.dark) .card-4 { 
	background: linear-gradient(135deg, var(--contrast-dark-1, #404040) 0%, var(--contrast-dark-2, #525252) 100%); 
}

:global(.dark) .card-5 { 
	background: linear-gradient(135deg, var(--contrast-dark-2, #525252) 0%, var(--contrast-dark-3, #737373) 100%); 
}

.card-2::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.2);
	border-radius: 1.75rem;
	z-index: 1;
	transition: background 0.3s ease;
}

.card-2:hover::before {
	background: rgba(0, 0, 0, 0.4);
}

/* ============================================ */
/* OVERLAY */
/* ============================================ */

.card-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.4);
	backdrop-filter: blur(4px);
	opacity: 0;
	transition: opacity 0.2s ease;
	z-index: 1;
}

.card-overlay.show {
	opacity: 1;
}

/* ============================================ */
/* RESPONSIVE MOBILE */
/* ============================================ */

@media (max-width: 1024px) {
	.page-wrapper {
		height: auto;
		min-height: 100vh;
		overflow-y: auto;
		padding: 1rem 0;
	}

	.bento-container {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.bento-row {
		display: contents;
	}

	/* Toutes les cartes */
	.bento-card {
		width: 100%;
		height: 40vh;
		flex: none !important;
		opacity: 1 !important;
		transition: all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
		transform-origin: center center;
		touch-action: pan-y;
		padding: 2.25rem;
	}

	.bento-card.extra-tall {
		height: 45vh;
	}

	/* Carte ouverte */
	.bento-card.expanded-mobile {
		height: 65vh;
		z-index: 100;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
		touch-action: none;
	}

	/* Cartes compressées */
	.bento-card.expanded-mobile ~ .bento-card,
	.bento-card:has(~ .bento-card.expanded-mobile):not(.expanded-mobile) {
		height: 30vh;
		opacity: 0.85;
		filter: brightness(0.9);
	}

	/* Cartes au-dessus */
	.bento-card:has(~ .bento-card.expanded-mobile):not(.expanded-mobile) {
		transform: translateY(8px) scale(0.97);
	}

	/* Cartes en-dessous */
	.bento-card.expanded-mobile ~ .bento-card {
		transform: translateY(-8px) scale(0.97);
	}

	/* Contenu */
	.card-content {
		text-align: center;
		align-items: center;
		padding: 2rem;
	}

	.card-title {
		font-size: clamp(1.8rem, 5vw, 2.2rem);
		text-align: center;
		width: 100%;
	}

	.card-subtitle {
		font-size: clamp(1.3rem, 3.8vw, 1.6rem);
		text-align: center;
		width: 100%;
	}

	.card-1 .card-title {
		font-size: clamp(2rem, 5.5vw, 2.4rem);
	}

	.card-1 .card-subtitle {
		font-size: clamp(1.5rem, 4.2vw, 1.8rem);
	}

	.card-4 .card-subtitle {
		font-size: clamp(1.6rem, 4.5vw, 2rem);
	}

	.additional-text {
		font-size: clamp(1.1rem, 3.2vw, 1.4rem);
		text-align: center;
	}

	.hover-text {
		font-size: clamp(1.2rem, 3.5vw, 1.5rem);
		padding: 2rem;
	}

	.card-overlay.show {
		backdrop-filter: blur(10px);
		background: rgba(0, 0, 0, 0.5);
	}
}

@media (max-width: 768px) {
	.bento-container {
		padding: 0.875rem;
		gap: 0.875rem;
	}

	.bento-card {
		height: 38vh;
		padding: 2rem;
		border-radius: 1.5rem;
	}

	.bento-card.extra-tall {
		height: 42vh;
	}

	.bento-card.expanded-mobile {
		height: 60vh;
		padding: 2.25rem;
	}

	.bento-card.expanded-mobile ~ .bento-card,
	.bento-card:has(~ .bento-card.expanded-mobile):not(.expanded-mobile) {
		height: 28vh;
	}

	.card-content {
		padding: 1.5rem;
	}

	.card-title {
		font-size: clamp(1.7rem, 4.8vw, 2rem);
	}

	.card-subtitle {
		font-size: clamp(1.2rem, 3.5vw, 1.5rem);
	}

	.card-1 .card-title {
		font-size: clamp(1.9rem, 5.2vw, 2.2rem);
	}

	.card-1 .card-subtitle {
		font-size: clamp(1.4rem, 4vw, 1.7rem);
	}

	.card-4 .card-subtitle {
		font-size: clamp(1.5rem, 4.2vw, 1.8rem);
	}

	.hover-text {
		font-size: clamp(1.1rem, 3.2vw, 1.4rem);
		padding: 1.75rem;
	}

	.additional-text {
		font-size: clamp(1rem, 3vw, 1.3rem);
	}
}

@media (max-width: 480px) {
	.bento-container {
		padding: 0.75rem;
		gap: 0.75rem;
	}

	.bento-card {
		height: 36vh;
		padding: 1.75rem;
		border-radius: 1.25rem;
	}

	.bento-card.extra-tall {
		height: 40vh;
	}

	.bento-card.expanded-mobile {
		height: 55vh;
		padding: 2rem;
	}

	.bento-card.expanded-mobile ~ .bento-card,
	.bento-card:has(~ .bento-card.expanded-mobile):not(.expanded-mobile) {
		height: 25vh;
		opacity: 0.75;
		filter: brightness(0.85);
	}

	.bento-card:has(~ .bento-card.expanded-mobile):not(.expanded-mobile) {
		transform: translateY(10px) scale(0.96);
	}

	.bento-card.expanded-mobile ~ .bento-card {
		transform: translateY(-10px) scale(0.96);
	}

	.card-content {
		padding: 1.25rem;
	}

	.card-title {
		font-size: clamp(1.6rem, 4.5vw, 1.9rem);
	}

	.card-subtitle {
		font-size: clamp(1.1rem, 3.2vw, 1.4rem);
	}

	.card-1 .card-title {
		font-size: clamp(1.8rem, 5vw, 2.1rem);
	}

	.card-1 .card-subtitle {
		font-size: clamp(1.3rem, 3.8vw, 1.6rem);
	}

	.card-4 .card-subtitle {
		font-size: clamp(1.4rem, 4vw, 1.7rem);
	}

	.hover-text {
		font-size: clamp(1rem, 3vw, 1.3rem);
		padding: 1.5rem;
	}

	.additional-text {
		font-size: clamp(0.95rem, 2.8vw, 1.2rem);
	}

	.highlight-word::before {
		height: 38%;
	}
}

@media (max-width: 360px) {
	.bento-container {
		padding: 0.625rem;
		gap: 0.625rem;
	}

	.bento-card {
		height: 34vh;
		padding: 1.5rem;
		border-radius: 1.125rem;
	}

	.bento-card.extra-tall {
		height: 38vh;
	}

	.bento-card.expanded-mobile {
		height: 50vh;
		padding: 1.75rem;
	}

	.bento-card.expanded-mobile ~ .bento-card,
	.bento-card:has(~ .bento-card.expanded-mobile):not(.expanded-mobile) {
		height: 22vh;
		opacity: 0.7;
		filter: brightness(0.8);
	}

	.bento-card:has(~ .bento-card.expanded-mobile):not(.expanded-mobile) {
		transform: translateY(12px) scale(0.94);
	}

	.bento-card.expanded-mobile ~ .bento-card {
		transform: translateY(-12px) scale(0.94);
	}

	.bento-card.needs-margin {
		margin-bottom: 1.5rem;
	}

	.card-content {
		padding: 1rem;
	}

	.card-title {
		font-size: clamp(1.5rem, 4.2vw, 1.8rem);
	}

	.card-subtitle {
		font-size: clamp(1rem, 3vw, 1.3rem);
	}

	.card-1 .card-title {
		font-size: clamp(1.7rem, 4.8vw, 2rem);
	}

	.card-1 .card-subtitle {
		font-size: clamp(1.2rem, 3.5vw, 1.5rem);
	}

	.card-4 .card-subtitle {
		font-size: clamp(1.3rem, 3.8vw, 1.6rem);
	}

	.hover-text {
		font-size: clamp(0.95rem, 2.8vw, 1.2rem);
		padding: 1.25rem;
	}

	.additional-text {
		font-size: clamp(0.9rem, 2.6vw, 1.1rem);
	}

	.highlight-word::before {
		height: 35%;
	}
}

/* Désactiver hover sur mobile */
@media (hover: none) and (pointer: coarse) {
	.bento-card.hovered,
	.bento-card.same-row {
		flex: none !important;
		opacity: 1 !important;
	}

	.card-overlay.show {
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(8px);
	}
}
</style>