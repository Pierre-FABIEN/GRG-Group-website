<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import { scale } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages.js';


	// Rows inversées : 2 cartes en haut, 3 cartes en bas
const bentoItems = [
    { 
        id: 1, 
        title: m.about_item1_title(),
        subtitle: m.about_item1_subtitle(),
        hoverText: m.about_item1_hoverText(),
        icon: m.about_item1_icon(),
        cardClass: 'card-1', 
        row: 'top',
        iconClass: 'white-icon' // Icône blanche pour la première carte
    },
    { 
        id: 2, 
        title: m.about_item2_title(),
        subtitle: m.about_item2_subtitle(),
        hoverText: m.about_item2_hoverText(),
        icon: m.about_item2_icon(),
        cardClass: 'card-2', 
        row: 'top', 
		iconClass: 'white-icon' // Icône blanche pour la carte

    },
    { 
        id: 3, 
        title: m.about_item3_title(),
        subtitle: m.about_item3_subtitle(),
        hoverText: m.about_item3_hoverText(),
        icon: m.about_item3_icon(),
        cardClass: 'card-3', 
        row: 'bottom',
        iconClass: 'black-icon' // Icône noire pour la troisième carte
    },
    { 
        id: 4, 
        title: m.about_item4_title(),
        subtitle: m.about_item4_subtitle(),
        hoverText: m.about_item4_hoverText(),
        icon: m.about_item4_icon(),
        cardClass: 'card-4', 
        row: 'bottom' 
    },
    { 
        id: 5, 
        title: m.about_item5_title(),
        subtitle: m.about_item5_subtitle(),
        hoverText: m.about_item5_hoverText(),
        icon: m.about_item5_icon(),
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
	<!-- Ligne du haut (2 cartes) -->
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
<div class="card-icon {item.iconClass}">{item.icon}</div>
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

	<!-- Ligne du bas (3 cartes) -->
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
	flex: 1 1 0;
	min-width: 0;
	max-width: 100%;
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

/* CONTENU CARTE - TEXTES */ 
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

/* ICÔNES - COULEURS SPÉCIFIQUES */
.card-icon {
	font-size: 3.5rem;
	margin-bottom: 1.25rem;
	filter: brightness(0.9);
}

.card-icon.white-icon {
	filter: brightness(0) invert(1); /* Icône blanche */
}

.card-icon.black-icon {
	filter: brightness(0); /* Icône noire */
}

/* FORCER l'icône noire sur la carte 3 */
.card-3 .card-icon {
	filter: brightness(0) !important; /* Icône noire forcée */
}

:global(.dark) .card-icon {
	filter: brightness(1.1);
}

:global(.dark) .card-icon.white-icon {
	filter: brightness(0) invert(1); /* Reste blanche en mode sombre */
}

:global(.dark) .card-icon.black-icon {
	filter: brightness(0) invert(0.9); /* Légèrement plus claire en mode sombre */
}

:global(.dark) .card-3 .card-icon {
	filter: brightness(0) invert(0.1) !important; /* Icône presque noire en mode sombre */
}

.bento-card:hover .card-icon {
	transform: scale(1.05);
}

/* Hover spécifique pour les icônes normales */
.bento-card:hover .card-icon:not(.white-icon):not(.black-icon) {
	filter: grayscale(1) brightness(0.9);
}

:global(.dark) .bento-card:hover .card-icon:not(.white-icon):not(.black-icon) {
	filter: grayscale(1) brightness(1.5);
}

/* TITRES ET SOUS-TITRES - COULEURS MONOCHROMES */
.card-title {
	font-size: 2rem;
	font-weight: 800;
	text-transform: uppercase;
	margin: 0 0 0.75rem;
	line-height: 1.2;
	color: var(--gray-900, #171717);
}

.card-subtitle {
	font-size: 1.25rem;
	font-weight: 600;
	text-transform: uppercase;
	margin: 0;
	opacity: 0.85;
	line-height: 1.4;
	color: var(--gray-700, #404040);
}

/* Ajustement carte 1 */
.card-1 .card-title {
	font-size: 2.5rem;
}
.card-1 .card-subtitle {
	font-size: 1.4rem;
}

/* Cartes avec images - texte blanc */
.card-1 .card-title,
.card-1 .card-subtitle,
.card-4 .card-title,
.card-4 .card-subtitle,
.card-5 .card-title,
.card-5 .card-subtitle {
    color: var(--gray-100, #f5f5f5);
}

/* BACKGROUNDS MONOCHROMES - PLUS LÉGERS */
.card-1 {
	background: 
		linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), /* Réduit l'opacité */
		url('/can_product.png') center/cover no-repeat;
	position: relative;
}

.card-2 { 
	background: var(--gradient-card2, linear-gradient(135deg, #e5e5e5 0%, #d4d4d4 100%)); 
}

.card-3 { 
	background: var(--gradient-card3, linear-gradient(135deg, #d4d4d4 0%, #a3a3a3 100%)); 
}

.card-4 {
	background: 
		linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), /* Réduit l'opacité */
		url('/xplicit-drink.jpg') center/cover no-repeat;
	position: relative;
}

.card-5 {
	background: 
		linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), /* Réduit l'opacité */
		url('/friendship.jpg') center/cover no-repeat;
	position: relative;
}

/* Overlay plus léger */
.card-1::before,
.card-4::before,
.card-5::before {
	content: '';
	position: absolute;
	top: 0; left: 0; right: 0; bottom: 0;
	background: rgba(0, 0, 0, 0.3); /* Réduit de 0.4 à 0.3 */
	border-radius: 1.75rem;
	z-index: 1;
	transition: background 0.3s ease;
}

.card-1:hover::before,
.card-4:hover::before,
.card-5:hover::before {
	background: rgba(0, 0, 0, 0.5); /* Réduit de 0.6 à 0.5 */
}

/* HOVER TEXT */
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

.card-1 .hover-text { 
	font-size: 1.25rem; 
	color: var(--gray-50, #fafafa);
	text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

.card-4 .hover-text { 
	font-size: 1.15rem; 
	color: var(--gray-50, #fafafa);
	text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

/* OVERLAY - PLUS LÉGER */
.card-overlay {
	position: absolute;
	top: 0; left: 0; right: 0; bottom: 0;
	background: rgba(0, 0, 0, 0.6); /* Réduit de 0.8 à 0.6 */
	backdrop-filter: blur(6px); /* Réduit de 8px à 6px */
	opacity: 0;
	transition: opacity 0.2s ease;
	z-index: 1;
}

.card-overlay.show { 
	opacity: 1; 
}

/* MODE SOMBRE - AJUSTEMENTS */
:global(.dark) .card-title {
	color: var(--gray-100, #f5f5f5);
}

:global(.dark) .card-subtitle {
	color: var(--gray-300, #d4d4d4);
}

:global(.dark) .card-2 .card-title,
:global(.dark) .card-2 .card-subtitle,
:global(.dark) .card-3 .card-title,
:global(.dark) .card-3 .card-subtitle {
	color: var(--gray-900, #171717);
}

/* RESPONSIVE - VERSION OPTIMISÉE */
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

	.bento-row:last-child {
		margin-bottom: 0;
	}

	.bento-card {
		flex: 1 1 auto !important;
		height: 200px !important;
		opacity: 1 !important;
	}

	.bento-card.hovered {
		flex: 1 1 auto !important;
		height: 280px !important;
	}

	.bento-card.same-row {
		flex: 1 1 auto !important;
		opacity: 1 !important;
	}

	.card-icon { 
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.card-title { 
		font-size: 1.6rem;
		margin-bottom: 0.5rem;
	}

	.card-1 .card-title {
		font-size: 1.8rem;
	}

	.card-subtitle { 
		font-size: 1.05rem;
	}

	.card-1 .card-subtitle {
		font-size: 1.15rem;
	}

	.hover-text { 
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.card-1 .hover-text {
		font-size: 1.05rem;
	}

	.card-hover-content {
		width: 90%;
	}
}

@media (max-width: 768px) {
	.page-wrapper { 
		padding: 1rem;
	}

	.bento-row {
		gap: 0.875rem;
	}

	.bento-card { 
		padding: 1.75rem;
		height: 180px !important;
		border-radius: 1.5rem;
	}

	.bento-card.hovered {
		height: 260px !important;
	}

	.card-icon { 
		font-size: 2.25rem;
		margin-bottom: 0.875rem;
	}

	.card-title { 
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.card-1 .card-title {
		font-size: 1.65rem;
	}

	.card-subtitle { 
		font-size: 1rem;
	}

	.card-1 .card-subtitle {
		font-size: 1.1rem;
	}

	.hover-text { 
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.card-1 .hover-text {
		font-size: 1rem;
	}

	.card-4 .hover-text {
		font-size: 0.95rem;
	}
}

@media (max-width: 480px) {
	.page-wrapper {
		padding: 0.875rem;
	}

	.bento-row {
		gap: 0.75rem;
	}

	.bento-card {
		padding: 1.5rem;
		height: 160px !important;
		border-radius: 1.25rem;
	}

	.bento-card.hovered {
		height: 240px !important;
	}

	.card-icon {
		font-size: 2rem;
		margin-bottom: 0.75rem;
	}

	.card-title {
		font-size: 1.35rem;
		margin-bottom: 0.4rem;
	}

	.card-1 .card-title {
		font-size: 1.5rem;
	}

	.card-subtitle {
		font-size: 0.95rem;
	}

	.card-1 .card-subtitle {
		font-size: 1.05rem;
	}

	.hover-text {
		font-size: 0.85rem;
		line-height: 1.45;
	}

	.card-1 .hover-text {
		font-size: 0.95rem;
	}

	.card-4 .hover-text {
		font-size: 0.9rem;
	}

	.card-hover-content {
		width: 92%;
	}
}

/* Amélioration du scroll sur mobile */
@media (max-width: 1024px) {
	.page-wrapper {
		-webkit-overflow-scrolling: touch;
	}

	/* Meilleure lisibilité du texte hover sur mobile */
	.card-hover-content.show {
		animation: fadeInUp 0.3s ease;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translate(-50%, -45%);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%);
		}
	}
}

/* Adaptation pour les très petits écrans */
@media (max-width: 360px) {
	.bento-card {
		padding: 1.25rem;
		height: 140px !important;
	}

	.bento-card.hovered {
		height: 220px !important;
	}

	.card-icon {
		font-size: 1.75rem;
	}

	.card-title {
		font-size: 1.2rem;
	}

	.card-subtitle {
		font-size: 0.875rem;
	}

	.hover-text {
		font-size: 0.8rem;
	}
}
</style>
