<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import { scale } from 'svelte/transition';

	const bentoItems = [
		{ id: 1, title: 'Lorem Ipsum', subtitle: 'Dolor sit amet', hoverText: 'Sed do eiusmod...', icon: '🍱', cardClass: 'card-1', row: 'top' },
		{ id: 2, title: 'Consectetur Adipiscing', subtitle: 'Elit sed do', hoverText: 'Tempor incididunt...', icon: '🎨', cardClass: 'card-2', row: 'top' },
		{ id: 3, title: 'Tempor Incididunt', subtitle: 'Ut labore', hoverText: 'Magna aliqua...', icon: '🏆', cardClass: 'card-3', row: 'top' },
		{ id: 4, title: 'Magna Aliqua Enim', subtitle: 'Ad minim', hoverText: 'Exercitation ullamco...', icon: '🎯', cardClass: 'card-4', row: 'bottom' },
		{ id: 5, title: 'Exercitation Ullamco', subtitle: 'Laboris nisi', hoverText: 'Ex ea commodo...', icon: '🎥', cardClass: 'card-5', row: 'bottom' }
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
	overflow: hidden; /* pour éviter les débordements lors du scale */
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
	flex: 1 1 0;   /* Les cartes peuvent grandir et rétrécir */
	min-width: 0;   /* Empêche le contenu de pousser la carte */
	max-width: 100%;
	transition: flex 0.3s ease, opacity 0.2s ease;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.bento-card.hovered {
	flex: 2 1 0;  /* Carte survolée double sa largeur relative */
}

.bento-card.same-row {
	flex: 1 1 0;  /* Les autres cartes se réduisent */
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

.card-title {
	font-size: 1.75rem;
	font-weight: 700;
	margin: 0 0 0.5rem;
	line-height: 1.2;
	color: var(--text-color-1);
}

.card-1 .card-title {
	font-size: 2.5rem;
	font-weight: 800;
}

.card-subtitle {
	font-size: 1rem;
	font-weight: 500;
	margin: 0;
	opacity: 0.85;
	line-height: 1.5;
	color: var(--text-color-2);
}

.card-1 .card-subtitle {
	font-size: 1.15rem;
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

.card-1 .hover-text {
	font-size: 1.25rem;
}

.card-4 .hover-text {
	font-size: 1.15rem;
}

/* GRADIENTS DYNAMIQUES PAR CARTE */
.card-1 { background: var(--gradient-card1); }
.card-2 { background: var(--gradient-card2); }
.card-3 { background: var(--gradient-card3); }
.card-4 { background: var(--gradient-card4); }
.card-5 { background: var(--gradient-card5); }

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
	z-index: 1;
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
	.card-title { font-size: 1.4rem; }
	.card-subtitle { font-size: 0.9rem; }
	.hover-text { font-size: 0.95rem; }
}

@media (max-width: 768px) {
	.page-wrapper { padding: 1rem; }
	.bento-card { padding: 1.5rem; }
	.card-icon { font-size: 2rem; }
	.card-title { font-size: 1.2rem; }
	.card-subtitle { font-size: 0.85rem; }
	.hover-text { font-size: 0.9rem; }
}
</style>

