<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import { scale } from 'svelte/transition';

	// 5 cellules avec leurs lignes (rows)
	const bentoItems = [
		{
			id: 1,
			title: 'Lorem Ipsum Dolor',
			subtitle: 'Sit amet consectetur adipiscing elit',
			hoverText:
				'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.',
			icon: '🍱',
			cardClass: 'card-1',
			row: 'top'
		},
		{
			id: 2,
			title: 'Consectetur Adipiscing',
			subtitle: 'Elit sed do eiusmod',
			hoverText:
				'Tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.',
			icon: '🎨',
			cardClass: 'card-2',
			row: 'top'
		},
		{
			id: 3,
			title: 'Tempor Incididunt',
			subtitle: 'Ut labore et dolore',
			hoverText: 'Magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi.',
			icon: '🏆',
			cardClass: 'card-3',
			row: 'top'
		},
		{
			id: 4,
			title: 'Magna Aliqua Enim',
			subtitle: 'Ad minim veniam quis nostrud',
			hoverText:
				'Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
			icon: '🎯',
			cardClass: 'card-4',
			row: 'bottom'
		},
		{
			id: 5,
			title: 'Exercitation Ullamco',
			subtitle: 'Laboris nisi ut aliquip',
			hoverText: 'Ex ea commodo consequat duis aute irure dolor in reprehenderit voluptate velit.',
			icon: '🎥',
			cardClass: 'card-5',
			row: 'bottom'
		}
	];

	let hoveredCard = $state<number | null>(null);
	let hoveredRow = $state<string | null>(null);

	function handleCardHover(id: number) {
		hoveredCard = id;
		const card = bentoItems.find((item) => item.id === id);
		hoveredRow = card ? card.row : null;
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
	<div class="bento-container">
		{#each bentoItems as item, i (item.id)}
			<div
				class="bento-card {item.cardClass}"
				class:hovered={hoveredCard === item.id}
				class:same-row={isInSameRow(item)}
				onmouseenter={() => handleCardHover(item.id)}
				onmouseleave={handleCardLeave}
				onclick={() => handleCardClick(item)}
				onkeypress={(e) => e.key === 'Enter' && handleCardClick(item)}
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
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
		overflow: hidden;
		box-sizing: border-box;
	}

	.bento-container {
		width: 100%;
		max-width: 1500px;
		height: 100%;
		max-height: 850px;
		display: flex;
		flex-wrap: wrap;
		gap: 1.25rem;
	}

	.bento-card {
		position: relative;
		border-radius: 1.75rem;
		padding: 2.5rem;
		cursor: pointer;
		overflow: hidden;
		transition: width 0.1s cubic-bezier(0.34, 1.56, 0.64, 1),
			opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		flex-shrink: 0;
	}

	/* Application des gradients depuis les variables CSS */
	.card-1 {
		background: var(--gradient-card1);
		color: var(--text-color-1);
		width: calc(33.33% - 0.84rem);
		height: calc(50% - 0.625rem);
	}

	.card-2 {
		background: var(--gradient-card2);
		color: var(--text-color-2);
		width: calc(33.33% - 0.84rem);
		height: calc(50% - 0.625rem);
	}

	.card-3 {
		background: var(--gradient-card3);
		color: var(--text-color-3);
		width: calc(33.33% - 0.84rem);
		height: calc(50% - 0.625rem);
	}

	.card-4 {
		background: var(--gradient-card4);
		color: var(--text-color-4);
		width: calc(66.66% - 0.625rem);
		height: calc(50% - 0.625rem);
	}

	.card-5 {
		background: var(--gradient-card5);
		color: var(--text-color-5);
		width: calc(33.33% - 0.84rem);
		height: calc(50% - 0.625rem);
		margin-left: auto;
	}

	/* Carte survolée : agrandissement en width */
	.bento-card.hovered {
		width: calc(var(--base-width) * 1.1) !important;
		z-index: 10;
	}

	.card-1.hovered {
		--base-width: calc(33.33% - 0.84rem);
	}

	.card-2.hovered {
		--base-width: calc(33.33% - 0.84rem);
	}

	.card-3.hovered {
		--base-width: calc(33.33% - 0.84rem);
	}

	.card-4.hovered {
		--base-width: calc(66.66% - 0.625rem);
	}

	.card-5.hovered {
		--base-width: calc(33.33% - 0.84rem);
	}

	/* Autres cartes de la MÊME ROW : rétrécissent proportionnellement */
	/* ROW 1 (top) : PAS DE MODIFICATION - on garde le comportement original */
	.card-1.same-row {
		width: calc(var(--base-width) * 0.95) !important;
		--base-width: calc(33.33% - 0.84rem);
		opacity: 0.8;
	}

	.card-2.same-row {
		width: calc(var(--base-width) * 0.95) !important;
		--base-width: calc(33.33% - 0.84rem);
		opacity: 0.8;
	}

	.card-3.same-row {
		width: calc(var(--base-width) * 0.95) !important;
		--base-width: calc(33.33% - 0.84rem);
		opacity: 0.8;
	}

	/* ROW 2 (bottom) : MODIFICATION SPÉCIALE pour éviter le glissement */
	/* Quand card-4 est survolée, card-5 doit BEAUCOUP rétrécir (card-4 fait 66% de base) */
	.card-5.same-row {
		width: calc(var(--base-width) * 0.78) !important;
		--base-width: calc(33.33% - 0.84rem);
		opacity: 0.8;
		margin-left: auto;
	}

	/* Quand card-5 est survolée, card-4 rétracte moins (elle est déjà grande) */
	.card-4.same-row {
		width: calc(var(--base-width) * 0.93) !important;
		--base-width: calc(66.66% - 0.625rem);
		opacity: 0.8;
	}

	.card-content {
		position: relative;
		z-index: 2;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		transition: opacity 0.1s ease, transform 0.1s ease;
	}

	.card-content.hide-content {
		opacity: 0;
		transform: translateY(-10px);
	}

	.card-icon {
		font-size: 3.5rem;
		margin-bottom: 1.25rem;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
	}

	.card-1 .card-icon {
		font-size: 4.5rem;
	}

	.card-title {
		font-size: 1.75rem;
		font-weight: 700;
		margin: 0 0 0.5rem;
		line-height: 1.2;
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
	}

	.card-1 .card-subtitle {
		font-size: 1.15rem;
	}

	/* Overlay sombre avec blur au survol */
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

	/* Texte révélé au survol */
	.card-hover-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 3;
		width: 85%;
		text-align: center;
		opacity: 0;
		transition: opacity 0.2s ease 0.0s;
		pointer-events: none;
	}

	.card-hover-content.show {
		opacity: 1;
	}

	.hover-text {
		color: white;
		font-size: 1.1rem;
		line-height: 1.6;
		font-weight: 500;
		margin: 0;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	}

	.card-1 .hover-text {
		font-size: 1.25rem;
	}

	.card-4 .hover-text {
		font-size: 1.15rem;
	}

	/* === RESPONSIVE === */
	@media (max-width: 1200px) {
		.page-wrapper {
			padding: 1.25rem;
		}

		.bento-container {
			max-width: 1200px;
			max-height: 750px;
		}

		.hover-text {
			font-size: 1rem !important;
		}
	}

	@media (max-width: 768px) {
		.page-wrapper {
			padding: 1rem;
			height: auto;
			min-height: 100vh;
			width: 100%;
			overflow-y: auto;
		}

		.bento-container {
			flex-direction: column;
			max-height: none;
			height: auto;
		}

		.bento-card {
			transition: none !important;
			padding: 1.75rem;
		}

		.card-1,
		.card-2,
		.card-3,
		.card-4,
		.card-5 {
			width: 100% !important;
			height: auto !important;
			min-height: 150px;
		}

		/* Désactiver toutes les animations de largeur sur mobile */
		.bento-card.hovered,
		.bento-card.same-row {
			width: 100% !important;
			transition: none !important;
		}

		.card-icon {
			font-size: 2.5rem !important;
		}

		.card-title {
			font-size: 1.4rem !important;
		}

		.card-subtitle {
			font-size: 0.9rem !important;
		}

		.hover-text {
			font-size: 0.95rem !important;
		}
	}
</style>