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
/* RESPONSIVE MOBILE - VERSION VERTICALE FLUIDE */
/* ============================================ */

@media (max-width: 1024px) {
	.page-wrapper {
		height: auto;
		min-height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 0;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
		position: relative;
	}

	.bento-container {
		padding: 1rem;
		min-height: auto;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.bento-row {
		flex-direction: column;
		gap: 1rem;
		height: auto;
		margin-bottom: 1rem;
		width: 100%;
	}

	.bento-row.top,
	.bento-row.bottom {
		/* Fusionner les deux rows en une seule colonne */
		display: contents;
	}

	/* TOUTES LES CARTES EN UNE SEULE COLONNE - HAUTEUR FIXE INITIALE */
	.bento-card {
		flex: none !important;
		width: 100% !important;
		height: 50vh !important;
		min-height: 50vh !important;
		max-height: 50vh !important;
		opacity: 1 !important;
		transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
		position: relative;
		z-index: 1;
		padding: 2.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem !important;
		transform-origin: center;
		transform: scale(1);
		will-change: height, transform;
	}

	.bento-card.extra-tall {
		height: 55vh !important;
		min-height: 55vh !important;
		max-height: 55vh !important;
	}

	/* CARTE EXPANDÉE - AGGRANDISSEMENT VERTICAL SEULEMENT */
	.bento-card.expanded-mobile {
		z-index: 100;
		height: 75vh !important;
		min-height: 75vh !important;
		max-height: 75vh !important;
		transform: scale(1) !important; /* Pas de scale horizontal */
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
		transition: height 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), 
					transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	/* SYSTÈME D'ÉCRASEMENT VERTICAL - CARTES ADJACENTES SEULEMENT */
	
	/* Carte PRÉCÉDENTE (au-dessus) - Écrasée vers le HAUT */
	.bento-card:has(+ .bento-card.expanded-mobile) {
		height: 35vh !important;
		min-height: 35vh !important;
		max-height: 35vh !important;
		transform: translateY(-8px) scale(0.98);
		opacity: 0.75;
		filter: brightness(0.85);
		transform-origin: bottom center;
		margin-bottom: 0.5rem !important;
		transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
		will-change: height, transform;
	}

	/* Carte SUIVANTE (en-dessous) - Écrasée vers le BAS */
	.bento-card.expanded-mobile + .bento-card {
		height: 35vh !important;
		min-height: 35vh !important;
		max-height: 35vh !important;
		transform: translateY(8px) scale(0.98);
		opacity: 0.75;
		filter: brightness(0.85);
		transform-origin: top center;
		margin-top: 0.5rem !important;
		transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
		will-change: height, transform;
	}

	/* Première carte : s'étend vers le bas seulement */
	.bento-card:first-child.expanded-mobile {
		transform-origin: top center;
	}

	/* Dernière carte : s'étend vers le haut seulement */
	.bento-card:last-child.expanded-mobile {
		transform-origin: bottom center;
	}

	/* CONTENU DES CARTES */
	.card-content {
		padding: 1.75rem;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 2;
		overflow: hidden;
	}

	/* TEXTE PLUS GRAND ET LISIBLE */
	.card-title {
		font-size: clamp(1.8rem, 5vw, 2.2rem);
		margin-bottom: 1rem;
		line-height: 1.25;
		font-weight: 800;
		text-align: center;
		width: 100%;
		letter-spacing: -0.01em;
	}
	
	.card-subtitle {
		font-size: clamp(1.3rem, 3.8vw, 1.6rem);
		line-height: 1.4;
		margin-bottom: 0.75rem;
		text-align: center;
		width: 100%;
		font-weight: 600;
		letter-spacing: -0.005em;
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
		line-height: 1.5;
		margin-top: 1rem;
		text-align: center;
		padding: 0 1rem;
		font-weight: 500;
		letter-spacing: 0.01em;
	}

	.hover-text {
		padding: 2rem;
		font-size: clamp(1.2rem, 3.5vw, 1.5rem);
		line-height: 1.6;
		max-height: 70%;
		overflow-y: auto;
		font-weight: 500;
		letter-spacing: 0.01em;
	}

	.highlight-word::before {
		height: 40%;
		bottom: -1px;
	}

	.card-overlay.show {
		backdrop-filter: blur(10px);
		background: rgba(0, 0, 0, 0.5);
	}
}

@media (max-width: 768px) {
	.bento-container { 
		padding: 0.875rem;
	}
	
	.bento-row { 
		gap: 0.875rem; 
		margin-bottom: 0.875rem;
	}
	
	.bento-card {
		height: 48vh !important;
		min-height: 48vh !important;
		max-height: 48vh !important;
		padding: 2rem;
		border-radius: 1.5rem;
		margin-bottom: 0.875rem !important;
	}
	
	.bento-card.extra-tall {
		height: 53vh !important;
		min-height: 53vh !important;
		max-height: 53vh !important;
	}
	
	.bento-card.expanded-mobile {
		height: 70vh !important;
		min-height: 70vh !important;
		max-height: 70vh !important;
		padding: 2.25rem;
	}

	/* Écrasement exagéré */
	.bento-card:has(+ .bento-card.expanded-mobile) {
		height: 30vh !important;
		min-height: 30vh !important;
		max-height: 30vh !important;
		transform: translateY(-10px) scale(0.96);
		opacity: 0.7;
	}

	.bento-card.expanded-mobile + .bento-card {
		height: 30vh !important;
		min-height: 30vh !important;
		max-height: 30vh !important;
		transform: translateY(10px) scale(0.96);
		opacity: 0.7;
	}
	
	.card-content {
		padding: 1.5rem;
	}

	.card-title {
		font-size: clamp(1.7rem, 4.8vw, 2rem);
		margin-bottom: 0.875rem;
	}
	
	.card-subtitle {
		font-size: clamp(1.2rem, 3.5vw, 1.5rem);
		margin-bottom: 0.625rem;
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
		line-height: 1.55;
	}
	
	.additional-text {
		font-size: clamp(1rem, 3vw, 1.3rem);
		line-height: 1.45;
		margin-top: 0.875rem;
	}
}

@media (max-width: 480px) {
	.bento-container { 
		padding: 0.75rem;
	}
	
	.bento-row { 
		gap: 0.75rem; 
		margin-bottom: 0.75rem;
	}
	
	.bento-card {
		height: 45vh !important;
		min-height: 45vh !important;
		max-height: 45vh !important;
		padding: 1.75rem;
		border-radius: 1.25rem;
		margin-bottom: 0.75rem !important;
	}
	
	.bento-card.extra-tall {
		height: 50vh !important;
		min-height: 50vh !important;
		max-height: 50vh !important;
	}
	
	.bento-card.expanded-mobile {
		height: 65vh !important;
		min-height: 65vh !important;
		max-height: 65vh !important;
		padding: 2rem;
	}

	/* Écrasement très exagéré */
	.bento-card:has(+ .bento-card.expanded-mobile) {
		height: 28vh !important;
		min-height: 28vh !important;
		max-height: 28vh !important;
		transform: translateY(-12px) scale(0.94);
		opacity: 0.65;
		filter: brightness(0.8);
	}

	.bento-card.expanded-mobile + .bento-card {
		height: 28vh !important;
		min-height: 28vh !important;
		max-height: 28vh !important;
		transform: translateY(12px) scale(0.94);
		opacity: 0.65;
		filter: brightness(0.8);
	}
	
	.card-content {
		padding: 1.25rem;
	}

	.card-title {
		font-size: clamp(1.6rem, 4.5vw, 1.9rem);
		margin-bottom: 0.75rem;
		line-height: 1.2;
	}
	
	.card-subtitle {
		font-size: clamp(1.1rem, 3.2vw, 1.4rem);
		line-height: 1.35;
		margin-bottom: 0.5rem;
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
		line-height: 1.5;
		padding: 1.5rem;
		max-height: 65%;
	}
	
	.additional-text {
		font-size: clamp(0.95rem, 2.8vw, 1.2rem);
		line-height: 1.4;
		margin-top: 0.75rem;
	}

	.highlight-word::before {
		height: 38%;
		bottom: -2px;
	}
}

@media (max-width: 360px) {
	.bento-container {
		padding: 0.625rem;
	}
	
	.bento-card {
		height: 42vh !important;
		min-height: 42vh !important;
		max-height: 42vh !important;
		padding: 1.5rem;
		border-radius: 1.125rem;
		margin-bottom: 0.625rem !important;
	}
	
	.bento-card.extra-tall {
		height: 47vh !important;
		min-height: 47vh !important;
		max-height: 47vh !important;
	}
	
	.bento-card.expanded-mobile {
		height: 60vh !important;
		min-height: 60vh !important;
		max-height: 60vh !important;
		padding: 1.75rem;
	}

	.bento-card:has(+ .bento-card.expanded-mobile) {
		height: 25vh !important;
		min-height: 25vh !important;
		max-height: 25vh !important;
		transform: translateY(-15px) scale(0.92);
		opacity: 0.6;
		filter: brightness(0.75);
	}

	.bento-card.expanded-mobile + .bento-card {
		height: 25vh !important;
		min-height: 25vh !important;
		max-height: 25vh !important;
		transform: translateY(15px) scale(0.92);
		opacity: 0.6;
		filter: brightness(0.75);
	}

	.bento-card.needs-margin {
		margin-bottom: 1.5rem !important;
	}
	
	.card-content {
		padding: 1rem;
	}

	.card-title {
		font-size: clamp(1.5rem, 4.2vw, 1.8rem);
		margin-bottom: 0.625rem;
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
		line-height: 1.45;
		padding: 1.25rem;
	}
	
	.additional-text {
		font-size: clamp(0.9rem, 2.6vw, 1.1rem);
		line-height: 1.35;
		margin-top: 0.625rem;
	}

	.highlight-word::before {
		height: 35%;
		bottom: -3px;
	}
}

/* ANIMATIONS FLUIDES POUR MOBILE - PRÉVENTION DU CLIPPING */
@media (max-width: 1024px) {
	.bento-card {
		transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		perspective: 1000px;
		-webkit-perspective: 1000px;
	}
	
	.card-content {
		transition: all 0.3s ease;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
	}
	
	/* Prévention du clipping */
	.bento-container {
		overflow: visible !important;
	}
	
	.bento-card,
	.bento-card.expanded-mobile,
	.bento-card:has(+ .bento-card.expanded-mobile),
	.bento-card.expanded-mobile + .bento-card {
		overflow: visible !important;
		contain: layout style;
	}
	
	/* Effet de compression exagéré et fluide */
	.bento-card:has(+ .bento-card.expanded-mobile),
	.bento-card.expanded-mobile + .bento-card {
		transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
		will-change: height, transform, opacity;
	}
}
</style>