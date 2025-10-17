<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import { scale } from 'svelte/transition';

const bentoItems = [
    { 
        id: 1, 
        title: 'Notre Histoire', 
        subtitle: 'Depuis 2007', 
        hoverText: 'GRG Groupe Food & Beverage accompagne depuis plus de 15 ans les marques et porteurs de projet dans le développement de boissons et compléments alimentaires.', 
        icon: '📖', 
        cardClass: 'card-1', 
        row: 'top' 
    },
    { 
        id: 2, 
        title: 'Notre Mission', 
        subtitle: 'Création & Qualité', 
        hoverText: 'Nous combinons expertise scientifique et créativité pour concevoir des produits uniques et fiables, de la formulation à la production.', 
        icon: '🎯', 
        cardClass: 'card-2', 
        row: 'top' 
    },
    { 
        id: 3, 
        title: 'Notre Vision', 
        subtitle: 'Innovation & Accompagnement', 
        hoverText: 'Nous accompagnons marques et distributeurs dans chaque étape clé, avec flexibilité et rigueur, pour amener leurs idées sur le marché.', 
        icon: '🚀', 
        cardClass: 'card-3', 
        row: 'top' 
    },
    { 
        id: 4, 
        title: 'Nos Valeurs', 
        subtitle: 'Qualité & Fiabilité', 
        hoverText: 'Notre priorité : des produits de qualité, sûrs et conformes, qui répondent aux attentes des consommateurs et aux normes industrielles.', 
        icon: '💎', 
        cardClass: 'card-4', 
        row: 'bottom' 
    },
    { 
        id: 5, 
        title: 'Notre Approche', 
        subtitle: 'Partenaire de vos projets', 
        hoverText: 'Nous travaillons main dans la main avec chaque client, pour transformer vos idées en produits concrets et prêts à commercialiser.', 
        icon: '🤝', 
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

////////////////////////////////////////

.card-1 .card-title,
.card-4 .card-title,
.card-5 .card-title {
    color: white;
}


/// 
/// 

.card-1 .hover-text {
	font-size: 1.25rem;
}
.card-4 .hover-text {
	font-size: 1.15rem;
}

/* BACKGROUND IMAGES ET GRADIENTS */
.card-1 {
	background: url('/beer-can.jpg') center/cover no-repeat;
	position: relative;
}

.card-5 {
	background: url('/approach.jpg') center/cover no-repeat;
	position: relative;
}
.card-2 { background: var(--gradient-card2); }
.card-3 { background: var(--gradient-card3); }

.card-4 {
  background: 
    url('/path1.png') center/cover no-repeat,   /* image au-dessus */
    var(--gradient-card4);                           /* gradient en dessous */
  position: relative;
}


/* Overlay sombre pour lisibilité du texte */
.card-1::before,
.card-5::before {
	content: '';
	position: absolute;
	top: 0; left: 0; right: 0; bottom: 0;
	background: rgba(0,0,0,0.45);
	border-radius: 1.75rem;
	z-index: 1;
}

/* OVERLAY ET HOVER */
.card-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	backdrop-filter: blur(8px);
	opacity: 0;
	transition: opacity 0.2s ease;
	z-index:1;
}

.card-overlay.show {
	opacity: 1;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
	.bento-row {
		flex-direction: column;
		gap: 1rem;
	}
	.bento-card {
		flex-basis: 100% !important;
		height: 150px !important;
	}
	.card-icon { font-size: 2.5rem; }
	.card-title { font-size: 1.6rem; }
	.card-subtitle { font-size: 1.05rem; }
	.hover-text { font-size: 0.95rem; }
}

@media (max-width: 768px) {
	.page-wrapper { padding: 1rem; }
	.bento-card { padding: 1.5rem; }
	.card-icon { font-size: 2rem; }
	.card-title { font-size: 1.4rem; }
	.card-subtitle { font-size: 1rem; }
	.hover-text { font-size: 0.9rem; }
}
</style>


