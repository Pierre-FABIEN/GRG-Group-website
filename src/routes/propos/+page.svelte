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
        row: 'top' 
    },
    { 
        id: 2, 
        title: m.about_item2_title(),
        subtitle: m.about_item2_subtitle(),
        hoverText: m.about_item2_hoverText(),
        icon: m.about_item2_icon(),
        cardClass: 'card-2', 
        row: 'top' 
    },
    { 
        id: 3, 
        title: m.about_item3_title(),
        subtitle: m.about_item3_subtitle(),
        hoverText: m.about_item3_hoverText(),
        icon: m.about_item3_icon(),
        cardClass: 'card-3', 
        row: 'bottom' 
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
/* On réutilise exactement ton CSS existant pour les textes et cards */
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

.card-icon {
	font-size: 3.5rem;
	margin-bottom: 1.25rem;
}

/* TITRES ET SOUS-TITRES - MAJUSCULES ET PLUS GRANDS */
.card-title {
	font-size: 2rem;
	font-weight: 800;
	text-transform: uppercase;
	margin: 0 0 0.75rem;
	line-height: 1.2;
	color: var(--text-color-1);
}

.card-subtitle {
	font-size: 1.25rem;
	font-weight: 600;
	text-transform: uppercase;
	margin: 0;
	opacity: 0.85;
	line-height: 1.4;
	color: var(--text-color-2);
}

/* Ajustement carte 1 */
.card-1 .card-title {
	font-size: 2.5rem;
}
.card-1 .card-subtitle {
	font-size: 1.4rem;
}

.card-1 .card-subtitle { font-size: 1.15rem; }

.card-1 .card-title,
.card-4 .card-title,
.card-5 .card-title{

    color: white;
}



/* BACKGROUND IMAGES ET GRADIENTS */
.card-1 {
	background: url('/seagull.jpg') center/cover no-repeat;
	position: relative;
}


.card-4 {
	background: url('/xplicit-drink.jpg') center/cover no-repeat;
	position: relative;
}

.card-5 {
	background: url('/friendship.jpg') center/cover no-repeat;
	position: relative;
}


.card-1::before,
.card-4::before,
.card-5::before {
	content: '';
	position: absolute;
	top: 0; left: 0; right: 0; bottom: 0;
	background: rgba(0,0,0,0.45);
	border-radius: 1.75rem;
	z-index: 1;
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
	color: white;
}

.card-hover-content.show { opacity: 1; }

.hover-text {
	color: white;
	font-size: 1.1rem;
	line-height: 1.6;
	font-weight: 500;
	text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.card-1 .hover-text { font-size: 1.25rem; }
.card-4 .hover-text { font-size: 1.15rem; }

/* GRADIENTS PAR CARTE */

.card-2 { background: var(--gradient-card2); }
.card-3 { background: var(--gradient-card3); }



/* OVERLAY */
.card-overlay {
	position: absolute;
	top: 0; left: 0; right: 0; bottom: 0;
	background: rgba(0,0,0,0.7);
	backdrop-filter: blur(8px);
	opacity: 0;
	transition: opacity 0.2s ease;
	z-index: 1;
}

.card-overlay.show { opacity: 1; }

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

	/* Désactiver l'agrandissement horizontal sur mobile */
	.bento-card.hovered {
		flex: 1 1 auto !important;
		height: 280px !important; /* Agrandissement vertical seulement */
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
