<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import { scale } from 'svelte/transition';

	const bentoItems = [
    { 
        id: 1, 
        title: 'Formats & Conditionnements', 
        subtitle: 'Canettes, bouteilles, shots…', 
        hoverText: 'Nous proposons une large gamme de formats : canettes, bouteilles en verre ou PET, shots, piluliers et bien plus encore, pour s’adapter à chaque type de projet.', 
        icon: '🥫', 
        cardClass: 'card-1', 
        row: 'top' 
    },
    { 
        id: 2, 
        title: 'Flexibilité Industrielle', 
        subtitle: 'Adaptation & Réactivité', 
        hoverText: 'Notre réseau industriel européen garantit une capacité d’adaptation rapide, pour répondre efficacement aux évolutions du marché et aux besoins spécifiques de chaque client.', 
        icon: '⚙️', 
        cardClass: 'card-2', 
        row: 'top' 
    },
    { 
        id: 3, 
        title: 'Qualité & Sécurité', 
        subtitle: 'Normes Européennes', 
        hoverText: 'Nos sites partenaires respectent les standards de qualité les plus exigeants, assurant des produits sûrs, traçables et conformes aux réglementations internationales.', 
        icon: '🔒', 
        cardClass: 'card-3', 
        row: 'bottom' 
    },
    { 
        id: 4, 
        title: 'Production Multi-sites', 
        subtitle: 'Un réseau européen', 
        hoverText: 'Grâce à notre réseau industriel réparti sur plusieurs sites européens, nous assurons une continuité de production et une grande disponibilité logistique.', 
        icon: '🌍', 
        cardClass: 'card-4', 
        row: 'bottom' 
    },
    { 
        id: 5, 
        title: 'Accompagnement Technique', 
        subtitle: 'De l’idée au produit fini', 
        hoverText: 'Nos équipes techniques accompagnent chaque étape du développement produit, du choix du format à la mise en production, avec un haut niveau d’expertise.', 
        icon: '🧰', 
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

<div class="page-wrapper">
	<!-- Ligne du haut : 3 cartes -->
	<div class="bento-row top">
		{#each bentoItems.filter(i => i.row === 'top') as item, i (item.id)}
			<div
				class="bento-card {item.cardClass}"
				class:hovered={hoveredCard === item.id}
				class:same-row={isInSameRow(item)}
				on:mouseenter={() => handleCardHover(item.id)}
				on:mouseleave={handleCardLeave}
				on:click={() => handleCardClick(item)}
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

	<!-- Ligne du bas : 2 cartes, une double largeur -->
	<div class="bento-row bottom">
		{#each bentoItems.filter(i => i.row === 'bottom') as item, i (item.id)}
			<div
				class="bento-card {item.cardClass} {item.id === 4 ? 'double' : ''}"
				class:hovered={hoveredCard === item.id}
				class:same-row={isInSameRow(item)}
				on:mouseenter={() => handleCardHover(item.id)}
				on:mouseleave={handleCardLeave}
				on:click={() => handleCardClick(item)}
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

.bento-card.double { flex: 2 1 0; }
.bento-card.double.hovered { flex: 3 1 0; }

.bento-card.hovered { flex: 2 1 0; }
.bento-card.same-row { flex: 1 1 0; opacity: 0.8; }

/* === TEXTE ET CONTENU CARTE === */
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

.card-title {
	font-size: 1.75rem;
	font-weight: 700;
	margin: 0 0 0.5rem;
	line-height: 1.2;
	color: var(--text-color-1);
}

.card-1 .card-title { font-size: 2.5rem; font-weight: 800; }

.card-subtitle {
	font-size: 1rem;
	font-weight: 500;
	margin: 0;
	opacity: 0.85;
	line-height: 1.5;
	color: var(--text-color-2);
}

.card-1 .card-subtitle { font-size: 1.15rem; }

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
	pointer-events: none;
	color: white;
}

.card-hover-content.show {
	opacity: 1;
}

.hover-text {
	color: white;
	font-size: 1.1rem;
	line-height: 1.6;
	font-weight: 500;
	text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.card-1 .hover-text { font-size: 1.25rem; }
.card-4 .hover-text { font-size: 1.15rem; }




/* BACKGROUND IMAGES ET GRADIENTS */
.card-1 {
	background: url('/box.jpg') center/cover no-repeat;
	position: relative;
}


/* GRADIENTS PAR CARTE */

.card-2 { background: var(--gradient-card2); }
.card-3 { background: var(--gradient-card3); }
.card-4 { background: var(--gradient-card4); }
.card-5 { background: var(--gradient-card5); }

/* OVERLAY */
.card-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
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

