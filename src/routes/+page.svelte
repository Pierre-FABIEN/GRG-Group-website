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

<style lang="scss">/* VARIABLES */
:root {
	--contrast-light-1: #e5e5e5;
	--contrast-light-2: #d4d4d4;
	--contrast-light-3: #a3a3a3;
	--contrast-dark-1: #404040;
	--contrast-dark-2: #525252;
	--contrast-dark-3: #737373;
}

.additional-text {
    font-size: 1.25rem;
    line-height: 1.6;
    font-weight: 500;
    margin-top: 1rem;
    margin-bottom: 0;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

/* CARTES CLAIRES (1, 3, 4, 5) : TEXTE NOIR */
.card-1 .additional-text,
.card-3 .additional-text,
.card-4 .additional-text,
.card-5 .additional-text {
    color: var(--gray-900, #171717) !important;
    text-shadow: 0 2px 12px rgba(255, 255, 255, 0.7);
}

/* CARTES SOMBRES (2) : TEXTE BLANC */
.card-2 .additional-text {
    color: var(--gray-100, #f5f5f5) !important;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

/* MODE SOMBRE : INVERSION COMPLÈTE */
:global(.dark) .card-1 .additional-text,
:global(.dark) .card-3 .additional-text,
:global(.dark) .card-4 .additional-text,
:global(.dark) .card-5 .additional-text {
    color: var(--gray-100, #f5f5f5) !important;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

:global(.dark) .card-2 .additional-text {
    color: var(--gray-100, #f5f5f5) !important;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

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

.card-1 .card-title,
.card-1 .card-subtitle,
.card-3 .card-title,
.card-3 .card-subtitle,
.card-4 .card-title,
.card-4 .card-subtitle,
.card-5 .card-title,
.card-5 .card-subtitle {
	color: var(--gray-900, #171717);
}

.card-2 .card-title,
.card-2 .card-subtitle {
	color: var(--gray-100, #f5f5f5);
}

:global(.dark) .card-1 .card-title,
:global(.dark) .card-1 .card-subtitle,
:global(.dark) .card-3 .card-title,
:global(.dark) .card-3 .card-subtitle,
:global(.dark) .card-4 .card-title,
:global(.dark) .card-4 .card-subtitle,
:global(.dark) .card-5 .card-title,
:global(.dark) .card-5 .card-subtitle {
	color: var(--gray-100, #f5f5f5);
}

.card-1 .card-title { font-size: 2.5rem; }
.card-1 .card-subtitle { font-size: 1.4rem; }

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
	top: 0; left: 0; right: 0; bottom: 0;
	background: rgba(0, 0, 0, 0.2);
	border-radius: 1.75rem;
	z-index: 1;
	transition: background 0.3s ease;
}

.card-2:hover::before {
	background: rgba(0, 0, 0, 0.4);
}

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
/* RESPONSIVE MOBILE - CELLULES HAUTES + SCROLL */
/* ============================================ */

@media (max-width: 1024px) {
	.page-wrapper {
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 0;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
		scroll-padding-top: 1rem;
	}

	.bento-container {
		padding: 1rem 1rem 3rem 1rem;
		min-height: auto;
	}

	.bento-row {
		flex-direction: column;
		gap: 1.5rem;
		height: auto;
		margin-bottom: 0;
	}

	/* Première carte : commence en haut */
	.bento-row.top {
		padding-top: 0;
	}

	/* CELLULES HAUTES (70vh) */
	.bento-card {
		flex: none !important;
		width: 100% !important;
		min-height: 70vh !important;
		height: 70vh !important;
		max-height: 70vh !important;
		opacity: 1 !important;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		z-index: 1;
		padding: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		scroll-snap-align: start;
		transform-origin: top center;
	}

	.bento-card.extra-tall {
		min-height: 75vh !important;
		height: 75vh !important;
		max-height: 75vh !important;
	}

	/* EXPANSION : vers le bas pour toutes SAUF la dernière */
	.bento-card.expanded-mobile {
		z-index: 100;
	}

	/* Cartes normales : expansion vers le bas */
	.bento-row.top .bento-card.expanded-mobile:not(:last-child),
	.bento-row.bottom .bento-card.expanded-mobile:not(:last-child) {
		min-height: 80vh !important;
		height: 80vh !important;
		max-height: 80vh !important;
		transform: scale(1.02);
		transform-origin: top center;
	}

	/* Dernière carte : expansion vers le haut */
	.bento-row.bottom .bento-card.expanded-mobile:last-child {
		min-height: 80vh !important;
		height: 80vh !important;
		max-height: 80vh !important;
		transform: scale(1.02);
		transform-origin: bottom center;
	}

	/* EFFET ÉCRASEMENT DES CELLULES ADJACENTES */
	.bento-card:has(+ .bento-card.expanded-mobile) {
		transform: scale(0.96);
		opacity: 0.7;
		filter: brightness(0.9);
		transform-origin: bottom center;
	}

	.bento-card.expanded-mobile + .bento-card {
		transform: scale(0.96);
		opacity: 0.7;
		filter: brightness(0.9);
		transform-origin: top center;
	}

	/* Dernière carte qui pousse vers le haut */
	.bento-row.bottom .bento-card.expanded-mobile:last-child + .bento-card,
	.bento-row.bottom .bento-card:has(+ .bento-card.expanded-mobile:last-child) {
		transform-origin: bottom center;
	}

	.bento-card.needs-margin {
		margin-bottom: 3rem !important;
	}

	.card-content {
		padding: 2rem;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.card-title {
		font-size: clamp(2rem, 6vh, 2.8rem);
		margin-bottom: 1rem;
		line-height: 1.1;
		text-align: center;
		width: 100%;
	}
	
	.card-subtitle {
		font-size: clamp(1.4rem, 4vh, 2rem);
		line-height: 1.3;
		margin-bottom: 0;
		text-align: center;
		width: 100%;
	}
	
	.card-1 .card-title {
		font-size: clamp(2.2rem, 6.5vh, 3rem);
	}
	
	.card-1 .card-subtitle {
		font-size: clamp(1.6rem, 4.5vh, 2.2rem);
	}
	
	.card-4 .card-subtitle {
		font-size: clamp(2rem, 6vh, 2.8rem);
	}
	
	.additional-text {
		font-size: clamp(1.3rem, 3.5vh, 1.8rem);
		line-height: 1.5;
		margin-top: 1.5rem;
		text-align: center;
	}

	.hover-text {
		padding: 2rem;
		font-size: clamp(1.3rem, 3.5vh, 1.8rem);
		line-height: 1.5;
		max-height: 80%;
		overflow-y: auto;
	}

	.highlight-word::before {
		height: 42%;
		bottom: -2px;
	}

	.card-overlay.show {
		backdrop-filter: blur(5px);
	}
}

@media (max-width: 768px) {
	.bento-container { 
		padding: 0.75rem 0.75rem 2.5rem 0.75rem;
	}
	
	.bento-row { 
		gap: 1.25rem; 
	}
	
	.bento-card {
		min-height: 65vh !important;
		height: 65vh !important;
		max-height: 65vh !important;
		padding: 2rem;
	}
	
	.bento-card.extra-tall {
		min-height: 70vh !important;
		height: 70vh !important;
		max-height: 70vh !important;
	}
	
	.bento-row.top .bento-card.expanded-mobile:not(:last-child),
	.bento-row.bottom .bento-card.expanded-mobile:not(:last-child) {
		min-height: 75vh !important;
		height: 75vh !important;
		max-height: 75vh !important;
	}

	.bento-row.bottom .bento-card.expanded-mobile:last-child {
		min-height: 75vh !important;
		height: 75vh !important;
		max-height: 75vh !important;
	}
	
	.card-content {
		padding: 1.5rem;
	}

	.card-title {
		font-size: clamp(1.8rem, 5.5vh, 2.5rem);
		margin-bottom: 0.8rem;
	}
	
	.card-subtitle {
		font-size: clamp(1.2rem, 3.5vh, 1.8rem);
	}
	
	.card-1 .card-title {
		font-size: clamp(2rem, 6vh, 2.7rem);
	}
	
	.card-1 .card-subtitle {
		font-size: clamp(1.4rem, 4vh, 2rem);
	}
	
	.card-4 .card-subtitle {
		font-size: clamp(1.8rem, 5.5vh, 2.5rem);
	}
	
	.hover-text {
		font-size: clamp(1.2rem, 3.2vh, 1.6rem);
		padding: 1.5rem;
	}
	
	.additional-text {
		font-size: clamp(1.2rem, 3.2vh, 1.6rem);
	}
}

@media (max-width: 480px) {
	.bento-container { 
		padding: 0.5rem 0.5rem 2rem 0.5rem;
	}
	
	.bento-row { 
		gap: 1rem; 
	}
	
	.bento-card {
		min-height: 60vh !important;
		height: 60vh !important;
		max-height: 60vh !important;
		padding: 1.75rem;
		border-radius: 1.5rem;
	}
	
	.bento-card.extra-tall {
		min-height: 65vh !important;
		height: 65vh !important;
		max-height: 65vh !important;
	}
	
	.bento-row.top .bento-card.expanded-mobile:not(:last-child),
	.bento-row.bottom .bento-card.expanded-mobile:not(:last-child) {
		min-height: 70vh !important;
		height: 70vh !important;
		max-height: 70vh !important;
	}

	.bento-row.bottom .bento-card.expanded-mobile:last-child {
		min-height: 70vh !important;
		height: 70vh !important;
		max-height: 70vh !important;
	}
	
	.card-content {
		padding: 1.25rem;
	}

	.card-title {
		font-size: clamp(1.6rem, 5vh, 2.2rem);
		margin-bottom: 0.7rem;
		line-height: 1.1;
	}
	
	.card-subtitle {
		font-size: clamp(1.1rem, 3.2vh, 1.6rem);
		line-height: 1.25;
	}
	
	.card-1 .card-title {
		font-size: clamp(1.8rem, 5.5vh, 2.4rem);
	}
	
	.card-1 .card-subtitle {
		font-size: clamp(1.3rem, 3.7vh, 1.8rem);
	}
	
	.card-4 .card-subtitle {
		font-size: clamp(1.6rem, 5vh, 2.2rem);
	}
	
	.hover-text {
		font-size: clamp(1.1rem, 3vh, 1.5rem);
		line-height: 1.4;
		padding: 1.25rem;
	}
	
	.additional-text {
		font-size: clamp(1.1rem, 3vh, 1.5rem);
		line-height: 1.4;
	}

	.highlight-word::before {
		height: 38%;
		bottom: -3px;
	}
}

@media (max-width: 360px) {
	.bento-container {
		padding: 0.5rem 0.5rem 1.5rem 0.5rem;
	}
	
	.bento-card {
		min-height: 55vh !important;
		height: 55vh !important;
		max-height: 55vh !important;
		padding: 1.5rem;
		border-radius: 1.25rem;
	}
	
	.bento-card.extra-tall {
		min-height: 60vh !important;
		height: 60vh !important;
		max-height: 60vh !important;
	}
	
	.bento-row.top .bento-card.expanded-mobile:not(:last-child),
	.bento-row.bottom .bento-card.expanded-mobile:not(:last-child) {
		min-height: 65vh !important;
		height: 65vh !important;
		max-height: 65vh !important;
	}

	.bento-row.bottom .bento-card.expanded-mobile:last-child {
		min-height: 65vh !important;
		height: 65vh !important;
		max-height: 65vh !important;
	}

	.bento-card.needs-margin {
		margin-bottom: 2.5rem !important;
	}
	
	.card-content {
		padding: 1rem;
	}

	.card-title {
		font-size: clamp(1.4rem, 4.5vh, 2rem);
		margin-bottom: 0.6rem;
	}
	
	.card-subtitle {
		font-size: clamp(1rem, 2.8vh, 1.4rem);
	}
	
	.card-1 .card-title {
		font-size: clamp(1.6rem, 5vh, 2.2rem);
	}
	
	.card-1 .card-subtitle {
		font-size: clamp(1.2rem, 3.4vh, 1.6rem);
	}
	
	.card-4 .card-subtitle {
		font-size: clamp(1.4rem, 4.5vh, 2rem);
	}
	
	.hover-text {
		font-size: clamp(1rem, 2.7vh, 1.3rem);
		line-height: 1.35;
		padding: 1rem;
	}
	
	.additional-text {
		font-size: clamp(1rem, 2.7vh, 1.3rem);
		line-height: 1.35;
		margin-top: 1rem;
	}

	.highlight-word::before {
		height: 35%;
		bottom: -4px;
	}
}</style>