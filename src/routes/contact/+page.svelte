<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import { scale } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages.js';

const bentoItems = [
    { 
        id: 1, 
        title: "LinkedIn",  // Titre statique
        subtitle: m.contact_item1_subtitle(), // "Rejoignez notre réseau"
        hoverText: m.contact_item1_hoverText(),
        icon: m.contact_item1_icon(),
        cardClass: 'card-1', 
        row: 'top',
        link: "https://www.linkedin.com/company/grg-groupe-sarl/",
        target: "_blank"
    },
    { 
        id: 2, 
        title: "Email",  // Titre statique
        subtitle: m.contact_item5_subtitle(), // Vide ou personnalisable
        hoverText: m.contact_item5_hoverText(),
        icon: m.contact_item5_icon(),
        cardClass: 'card-2', 
        row: 'top',
        link: "mailto:contact@grggroupe.com",
        target: "_self"
    },
    { 
        id: 3, 
        title: "",  // Titre vide, géré par HTML spécial dans la carte
        subtitle: "Notre profil B2B",  // Sous-titre statique
        hoverText: "Découvrez notre profil professionnel sur Europages, la plateforme de référence B2B en Europe pour les fournisseurs de l'industrie alimentaire.",
        icon: "", // Icône vide
        cardClass: 'card-3', 
        row: 'top',
        link: "https://www.europages.fr/fr/request/create?companySlug=grg-groupe-food-beverage-label-prive-22269045&source=WEB_COMPANY_PROFILE", // À vérifier l'URL exacte
        target: "_blank"
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
		if (item.link && item.link !== "#") {
			if (item.target === "_blank") {
				window.open(item.link, '_blank', 'noopener,noreferrer');
			} else {
				window.location.href = item.link;
			}
		}
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
	<!-- Ligne du haut : 3 cartes (LinkedIn, Email, Europages) -->
	<div class="bento-row top">
		{#each bentoItems.filter(i => i.row === 'top') as item, i (item.id)}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
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
					
					{#if item.id === 3}
						<!-- Titre spécial pour Europages -->
						<h3 class="card-title europages-title">
							<span class="euro-text">EURO</span>
							<span class="pages-text">PAGES</span>
						</h3>
					{:else}
						<h3 class="card-title">{item.title}</h3>
					{/if}
					
					<p class="card-subtitle">{item.subtitle}</p>
				</div>

				<div class="card-hover-content" class:show={hoveredCard === item.id}>
					<p class="hover-text">{@html item.hoverText}</p>
				</div>

				<div class="card-overlay" class:show={hoveredCard === item.id}></div>
			</div>
		{/each}
	</div>

	<!-- Ligne du bas : Vide mais garde la structure -->
	<div class="bento-row bottom">
		<!-- Cette ligne est vide mais garde la structure de la page -->
	</div>

	<!-- Texte GRG GROUPE en bas à droite -->
	<div class="grg-brand">
		<h2 class="grg-title">GRG GROUPE</h2>
		<p class="grg-subtitle">Food & BEVERAGE</p>
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
	position: relative; /* Pour positionner le texte GRG */
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
	height: 50%; /* Garde la hauteur d'origine */
	box-sizing: border-box;
}

/* La ligne du bas est vide mais garde sa hauteur */
.bento-row.bottom {
	/* On peut réduire la marge ou la garder pour l'espace */
	margin-bottom: 0;
	/* Ou même réduire l'opacité pour la rendre invisible mais présente */
	opacity: 0;
	height: 50%; /* Garde la structure */
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
	transition: flex 0.3s ease, opacity 0.2s ease, transform 0.3s ease;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.bento-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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

/* ICÔNES TOUJOURS BLANCHES */
.card-icon {
	font-size: 3.5rem;
	margin-bottom: 1.25rem;
	filter: brightness(0) invert(1) !important; /* Icônes blanches forcées */
	transition: all 0.3s ease;
}

:global(.dark) .card-icon {
	filter: brightness(0) invert(1) !important; /* Restent blanches en mode sombre */
}

/* Hover effect - icônes restent blanches */
.bento-card:hover .card-icon {
	filter: brightness(0) invert(1) !important; /* Restent blanches au hover */
	transform: scale(1.05);
}

/* TITRES ET SOUS-TITRES - TOUJOURS BLANCS */
.card-title {
	font-size: 2rem;
	font-weight: 800;
	margin: 0 0 0.5rem;
	line-height: 1.2;
	color: var(--gray-100, #f5f5f5) !important; /* Texte blanc forcé */
	text-transform: uppercase;
}

.card-subtitle {
	font-size: 1.25rem;
	font-weight: 600;
	margin: 0;
	opacity: 0.85;
	line-height: 1.5;
	color: var(--gray-100, #f5f5f5) !important; /* Texte blanc forcé */
	text-transform: uppercase;
}

/* BACKGROUNDS MONOCHROMES AVEC OVERLAY ALLÉGÉ */
.card-1 {
	background: 
		linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)),
		url('/IN.png') center/cover no-repeat;
	position: relative;
}

.card-2 {
	background: 
		linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)),
		url('/mail.png') center/cover no-repeat;
	position: relative;
}

.card-3 {
	background: #002e1f !important; /* Fond vert foncé spécifique */
	position: relative;
}

/* Style spécial pour le titre Europages */
.europages-title {
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
}

.euro-text {
	color: #ffffff !important; /* EURO en blanc */
	font-size: 2.2rem;
	font-weight: 900;
	letter-spacing: 0.05em;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.pages-text {
	color: #7faf0d !important; /* PAGES en vert clair */
	font-size: 2.2rem;
	font-weight: 900;
	letter-spacing: 0.05em;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Overlay pour toutes les cartes avec images */
.card-1::before,
.card-2::before,
.card-3::before {
	content: '';
	position: absolute;
	top: 0; left: 0; right: 0; bottom: 0;
	background: rgba(0, 0, 0, 0.2); /* Overlay allégé */
	border-radius: 1.75rem;
	z-index: 1;
	transition: background 0.3s ease;
}

.card-1:hover::before,
.card-2:hover::before {
	background: rgba(0, 0, 0, 0.4); /* Overlay hover allégé */
}

.card-3::before {
	background: rgba(0, 46, 31, 0.1) !important; /* Overlay très léger pour Europages */
}

.card-3:hover::before {
	background: rgba(0, 46, 31, 0.3) !important; /* Overlay hover pour Europages */
}

/* HOVER CONTENT */
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
	pointer-events: auto; /* maintenant les liens peuvent être cliqués */
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

/* Styles pour les liens dans le hover text */
.hover-link {
	color: var(--gray-300, #d4d4d4);
	font-weight: 600;
	text-decoration: underline;
	transition: all 0.2s ease;
}

.hover-link:hover {
	color: var(--gray-100, #f5f5f5);
	text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

/* OVERLAY ALLÉGÉ */
.card-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.6); /* Opacité réduite */
	backdrop-filter: blur(4px); /* Blur réduit */
	opacity: 0;
	transition: opacity 0.2s ease;
	z-index: 1;
}

.card-overlay.show { 
	opacity: 1; 
}

/* MODE SOMBRE - TOUT RESTE BLANC */
:global(.dark) .card-title,
:global(.dark) .card-subtitle {
	color: var(--gray-100, #f5f5f5) !important; /* Reste blanc en mode sombre */
}

/* TEXTE GRG GROUPE en bas à droite */
.grg-brand {
	position: absolute;
	bottom: 3rem;
	right: 3rem;
	text-align: right;
	z-index: 10;
	pointer-events: none;
}

.grg-title {
	font-family: 'raleway', sans-serif;
	font-size: 4rem;
	font-weight: 900;
	color: #002e1f;
	line-height: 1;
	margin: 0 0 0.5rem 0;
	letter-spacing: 0.05em;
	text-transform: uppercase;
}

.grg-subtitle {
	font-family: 'open-sans', sans-serif;
	font-size: 1.5rem;
	font-weight: 700;
	color: #7faf0d;
	margin: 0;
	letter-spacing: 0.1em;
	text-transform: uppercase;
}

:global(.dark) .grg-title {
	color: #ffffff;
}

:global(.dark) .grg-subtitle {
	color: #a8d64e;
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

	.bento-row.bottom {
		display: none; /* Cache la ligne vide sur mobile */
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
	
	.euro-text,
	.pages-text {
		font-size: 1.6rem;
	}
	
	.card-subtitle { 
		font-size: 1.05rem; 
	}
	
	.hover-text { 
		font-size: 0.95rem; 
		line-height: 1.5; 
	}
	
	.card-hover-content { 
		width: 90%; 
	}
	
	/* Répositionnement du texte GRG sur mobile */
	.grg-brand {
		position: relative;
		bottom: auto;
		right: auto;
		text-align: center;
		margin-top: 3rem;
		margin-bottom: 2rem;
		width: 100%;
	}
	
	.grg-title {
		font-size: 3rem;
	}
	
	.grg-subtitle {
		font-size: 1.3rem;
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
	
	.euro-text,
	.pages-text {
		font-size: 1.4rem;
	}
	
	.card-subtitle { 
		font-size: 1rem; 
	}
	
	.hover-text { 
		font-size: 0.9rem; 
		line-height: 1.5; 
	}
	
	.grg-title {
		font-size: 2.5rem;
	}
	
	.grg-subtitle {
		font-size: 1.1rem;
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
	
	.euro-text,
	.pages-text {
		font-size: 1.2rem;
	}
	
	.card-subtitle { 
		font-size: 0.95rem; 
	}
	
	.hover-text { 
		font-size: 0.85rem; 
		line-height: 1.45; 
	}
	
	.card-hover-content { 
		width: 92%; 
	}
	
	.grg-title {
		font-size: 2rem;
	}
	
	.grg-subtitle {
		font-size: 0.95rem;
	}
}

/* Scroll et animation */
@media (max-width: 1024px) {
	.page-wrapper { 
		-webkit-overflow-scrolling: touch; 
	}
	
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
	
	.euro-text,
	.pages-text {
		font-size: 1rem;
	}

	.card-subtitle {
		font-size: 0.875rem;
	}

	.hover-text {
		font-size: 0.8rem;
	}
	
	.grg-title {
		font-size: 1.8rem;
	}
	
	.grg-subtitle {
		font-size: 0.85rem;
	}
}

.card-title {
	font-size: 2rem;
	font-weight: 800;
	text-transform: uppercase;
	margin: 0 0 0.5rem;
	line-height: 1.2;
	position: relative;  /* essentiel pour le ::before */
	display: inline-block;  /* essentiel pour que le highlight suive la largeur du texte */
	z-index: 2;
}

.card-title::before {
	content: "";
	position: absolute;
	left: 0;
	bottom: -4px;
	width: 100%;
	height: 80%;
	background: url('/image/highlight.png') center/contain no-repeat;
	z-index: -1;
	pointer-events: none;
	opacity: 0.9;
}

/* Indicateur de lien externe pour les cartes avec target="_blank" */
.bento-card[class*="card-"]:after {
	content: "";
	position: absolute;
	top: 1rem;
	right: 1rem;
	width: 16px;
	height: 16px;
	background: rgba(255, 255, 255, 0.7);
	mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'/%3E%3Cpath d='m15 3 6 6'/%3E%3Cpath d='M10 14 21 3'/%3E%3C/svg%3E") center/contain no-repeat;
	opacity: 0;
	transition: opacity 0.3s ease;
	z-index: 4;
}

.bento-card:hover:after {
	opacity: 0.8;
}

/* Pour la carte Europages, l'indicateur est blanc sur fond vert */
.card-3:after {
	background: rgba(255, 255, 255, 0.9);
}
</style>