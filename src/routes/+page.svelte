<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import { scale } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages.js';
	import highlightImg from '$lib/assets/highlight.png';

const bentoItems = [
   { 
        id: 1, 
        title: m.home_item1_title(),
        subtitle: m.home_item1_subtitle(),
        hoverText: m.home_item1_hoverText(),
        icon: m.home_item1_icon(),
        cardClass: 'card-1', 
        row: 'top'
    },
    { 
        id: 2, 
        title: m.home_item2_title(),
        subtitle: m.home_item2_subtitle(),
        hoverText: m.home_item2_hoverText(),
        icon: m.home_item2_icon(),
        cardClass: 'card-2', 
        row: 'top' 
    },
    { 
        id: 3, 
        title: m.home_item3_title(),
        subtitle: m.home_item3_subtitle(),
        hoverText: m.home_item3_hoverText(),
        icon: m.home_item3_icon(),
        cardClass: 'card-3', 
        row: 'top'
    },
    { 
        id: 4, 
		 title: m.home_item4_title(),
		subtitle: m.home_item4_subtitle(),
       
        hoverText: m.home_item4_hoverText(),
        icon: m.home_item4_icon(),
        cardClass: 'card-4', 
        row: 'bottom' 
    },
    { 
        id: 5, 
        title: m.home_item5_title(),
        subtitle: m.home_item5_subtitle(),
        hoverText: m.home_item5_hoverText(),
        icon: m.home_item5_icon(),
        cardClass: 'card-5', 
        row: 'bottom' 
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
</script>
<h1 style="
  position:absolute;
  width:1px;
  height:1px;
  margin:-1px;
  padding:0;
  border:0;
  clip:rect(0 0 0 0);
  overflow:hidden;
  white-space:nowrap;
">
  GRG Groupe : Food and Beverages
</h1>

<h2 style="
  position:absolute;
  width:1px;
  height:1px;
  margin:-1px;
  padding:0;
  border:0;
  clip:rect(0 0 0 0);
  overflow:hidden;
  white-space:nowrap;
">
  Marque blanche de boissons et compléments alimentaires
</h2>

<h2 style="
  position:absolute;
  width:1px;
  height:1px;
  margin:-1px;
  padding:0;
  border:0;
  clip:rect(0 0 0 0);
  overflow:hidden;
  white-space:nowrap;
">
  Création, production et personnalisation de boissons fonctionnelles
</h2>

<div class="page-wrapper">
	<!-- Ligne du haut -->
	<div class="bento-row top">
		{#each bentoItems.filter(i => i.row === 'top') as item, i (item.id)}
			<div
				class="bento-card {item.cardClass}"
				class:hovered={hoveredCard === item.id}
				class:same-row={isInSameRow(item)}
				onmouseenter={() => handleCardHover(item.id)}
				onmouseleave={handleCardLeave}
				onclick={() => handleCardClick(item)}
				role="button"
				tabindex="0"
				in:scale={{ delay: i * 100, duration: 600 }}
			>
				<div class="card-content" class:hide-content={hoveredCard === item.id}>
					<div class="card-icon">{item.icon}</div>
					<h3 class="card-title">{item.title}</h3>
					<p class="card-subtitle">{item.subtitle}</p>
				</div>

				<div class="card-hover-content" class:show={hoveredCard === item.id}>
					<p class="hover-text">{item.hoverText}</p>
				</div>

				<div class="card-overlay" class:show={hoveredCard === item.id}></div>
			</div>
		{/each}
	</div>

	<!-- Ligne du bas -->
	<div class="bento-row bottom">
		{#each bentoItems.filter(i => i.row === 'bottom') as item, i (item.id)}
			<div
				class="bento-card {item.cardClass}"
				class:hovered={hoveredCard === item.id}
				class:same-row={isInSameRow(item)}
				onmouseenter={() => handleCardHover(item.id)}
				onmouseleave={handleCardLeave}
				onclick={() => handleCardClick(item)}
				role="button"
				tabindex="0"
				in:scale={{ delay: i * 100, duration: 600 }}
			>
				<div class="card-content" class:hide-content={hoveredCard === item.id}>
					<div class="card-icon">{item.icon}</div>
					<h3 class="card-title">{item.title}</h3>
					<p class="card-subtitle">{item.subtitle}</p>
				</div>

				<div class="card-hover-content" class:show={hoveredCard === item.id}>
					<p class="hover-text">{item.hoverText}</p>
				</div>

				<div class="card-overlay" class:show={hoveredCard === item.id}></div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
/* --- CSS ENTIER INCHANGÉ --- */
.page-wrapper {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1.5rem;
	box-sizing: border-box;
	font-family: 'open-sans', sans-serif;
	overflow: hidden;
	background: var(--gray-50, #fafafa);
}

:global(.dark) .page-wrapper {
	background: var(--gray-900, #171717);
}

.bento-row {
	display: flex;
	width: 100%;
	max-width: 1500px;
	gap: 1.25rem;
	margin-bottom: 1.25rem;
	height: 50%;
	box-sizing: border-box;
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

.bento-card.hovered {
	flex: 2 1 0;
}

.bento-card.same-row {
	flex: 1 1 0;
	opacity: 0.8;
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

.card-icon {
	font-size: 3.5rem;
	margin-bottom: 1.25rem;
}

/* Cartes 1, 4 et 5 - icônes blanches */
.card-1 .card-icon,
.card-4 .card-icon,
.card-5 .card-icon {
	filter: brightness(0) invert(1) !important;
}

:global(.dark) .card-1 .card-icon,
:global(.dark) .card-4 .card-icon,
:global(.dark) .card-5 .card-icon {
	filter: brightness(0) invert(1) !important;
}

/* Icônes adaptatives */
.card-2 .card-icon,
.card-3 .card-icon {
	filter: brightness(0);
}
:global(.dark) .card-2 .card-icon,
:global(.dark) .card-3 .card-icon {
	filter: brightness(0) invert(1);
}

/* TITRES */
.card-title {
	font-size: 2rem;
	font-weight: 800;
	text-transform: uppercase;
	margin: 0 0 0.75rem;
	line-height: 1.2;
	position: relative;
	display: inline-block;
	z-index: 2;
}

.card-title::before {
	content: "";
	position: absolute;
	left: 0;
	bottom: -4px;
	width: 100%;
	height: 80%;
	background: url({hightlightImg}) center/contain no-repeat;
	z-index: -1;
	pointer-events: none;
	opacity: 0.9;
}

/* SOUS-TITRES */
.card-subtitle {
	font-size: 1.25rem;
	font-weight: 600;
	text-transform: uppercase;
	margin: 0;
	opacity: 0.85;
	line-height: 1.4;
}

/* Cartes texte blanc */
.card-1 .card-title,
.card-1 .card-subtitle,
.card-4 .card-title,
.card-4 .card-subtitle,
.card-5 .card-title,
.card-5 .card-subtitle {
	color: var(--gray-100, #f5f5f5) !important;
}

/* Cartes texte adaptatif */
.card-2 .card-title,
.card-2 .card-subtitle,
.card-3 .card-title,
.card-3 .card-subtitle {
	color: var(--gray-900, #171717);
}
:global(.dark) .card-2 .card-title,
:global(.dark) .card-2 .card-subtitle,
:global(.dark) .card-3 .card-title,
:global(.dark) .card-3 .card-subtitle {
	color: var(--gray-100, #f5f5f5);
}

/* Ajustement carte 1 */
.card-1 .card-title { font-size: 2.5rem; }
.card-1 .card-subtitle { font-size: 1.4rem; }

/* ========================================================= */
/* === MODIFICATION SPÉCIALE CARD 4 (seule modification) === */
/* ========================================================= */

/* 1 — Inversion des styles */
.card-4 .card-title { /* devient le subtitle */
	font-size: 1.25rem !important;
	font-weight: 600 !important;
	opacity: 0.85 !important;
	line-height: 1.4 !important;
	margin-bottom: 0 !important;
}

/* retirer le stabilo du title de la card 4 uniquement */
.card-4 .card-title::before {
	display: none !important;
}

.card-4 .card-subtitle { /* devient le title */
	font-size: 2rem !important;
	font-weight: 800 !important;
	opacity: 1 !important;
	line-height: 1.2 !important;
	margin-bottom: 0.75rem !important;
	position: relative;
	z-index: 2;
}

/* 2 — AJOUT DU STABILO sur le "nouveau title" = subtitle */
.card-4 .card-subtitle::before {
	content: "";
	position: absolute;
	left: 0;
	bottom: -4px;
	width: 100%;
	height: 80%;
	background: url({hightlightImg}) center/contain no-repeat;
	z-index: -1;
	pointer-events: none;
	opacity: 0.9;
}
/* ========================================================= */
/* === FIN MODIFICATION CARD 4 === */
/* ========================================================= */

/* Hover text */
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
	font-size: 1.1rem;
	line-height: 1.6;
	font-weight: 500;
	text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.card-1 .hover-text,
.card-4 .hover-text,
.card-5 .hover-text {
	font-size: 1.25rem;
	color: var(--gray-50, #fafafa);
	text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

.card-4 .hover-text {
	font-size: 1.15rem;
}

/* BACKGROUNDS */
.card-1 {
	background:
		linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),
		url('/beer-can.jpg') center/cover no-repeat;
	position: relative;
}

.card-2 { background: linear-gradient(135deg, #e5e5e5 0%, #d4d4d4 100%); }
.card-3 { background: linear-gradient(135deg, #d4d4d4 0%, #a3a3a3 100%); }

.card-4 {
	background:
		linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25)),
		url('/grgFB.png') center/cover no-repeat;
	position: relative;
}

.card-5 {
	background:
		linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),
		url('/cans_production.png') center/cover no-repeat;
	position: relative;
}

/* Dark mode gradients */
:global(.dark) .card-2 { background: linear-gradient(135deg, #404040 0%, #525252 100%); }
:global(.dark) .card-3 { background: linear-gradient(135deg, #525252 0%, #737373 100%); }

/* Overlay */
.card-1::before,
.card-4::before,
.card-5::before {
	content: '';
	position: absolute;
	top: 0; left: 0; right: 0; bottom: 0;
	background: rgba(0, 0, 0, 0.2);
	border-radius: 1.75rem;
	z-index: 1;
	transition: background 0.3s ease;
}

.card-1:hover::before,
.card-4:hover::before,
.card-5:hover::before {
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

/* RESPONSIVE */
@media (max-width: 1024px) {
	.page-wrapper {
		height: auto;
		min-height: 100vh;
		padding: 1.5rem;
		justify-content: flex-start;
	}

	.bento-row {
		flex-direction: column;
		gap: 1rem;
		height: auto;
		margin-bottom: 1rem;
	}

	.bento-card {
		flex: 1 1 auto !important;
		height: 200px !important;
		opacity: 1 !important;
	}

	.bento-card.hovered {
		height: 280px !important;
	}

	.card-icon {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.card-title { font-size: 1.6rem; }
	.card-1 .card-title { font-size: 1.8rem; }

	.card-subtitle { font-size: 1.05rem; }
	.card-1 .card-subtitle { font-size: 1.15rem; }
}

@media (max-width: 768px) {
	.page-wrapper { padding: 1rem; }
	.bento-row { gap: 0.875rem; }

	.bento-card {
		padding: 1.75rem;
		height: 180px !important;
		border-radius: 1.5rem;
	}

	.card-icon { font-size: 2.25rem; }

	.card-title { font-size: 1.5rem; }
	.card-1 .card-title { font-size: 1.65rem; }

	.card-subtitle { font-size: 1rem; }
}

@media (max-width: 480px) {
	.page-wrapper { padding: 0.875rem; }
	.bento-row { gap: 0.75rem; }

	.bento-card {
		padding: 1.5rem;
		height: 160px !important;
		border-radius: 1.25rem;
	}

	.card-icon { font-size: 2rem; }
	.card-title { font-size: 1.35rem; }
	.card-subtitle { font-size: 0.95rem; }
}

</style>

