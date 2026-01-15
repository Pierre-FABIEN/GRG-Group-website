<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import { scale } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages.js';
	const highlightImg = '/highlight.png';

	const bentoItems = [
		{ 
			id: 1, 
			title: m.services_item1_title(),
			subtitle: m.services_item1_subtitle(),
			hoverText: m.services_item1_hoverText(),
			icon: m.services_item1_icon(),
			cardClass: 'card-1', 
			row: 'top'
		},
		{ 
			id: 2, 
			title: m.services_item2_title(),
			subtitle: m.services_item2_subtitle(),
			hoverText: m.services_item2_hoverText(),
			icon: m.services_item2_icon(),
			cardClass: 'card-2', 
			row: 'top' 
		},
		{ 
			id: 3, 
			title: m.services_item3_title(),
			subtitle: m.services_item3_subtitle(),
			hoverText: m.services_item3_hoverText(),
			icon: m.services_item3_icon(),
			cardClass: 'card-3', 
			row: 'bottom'
		},
		{ 
			id: 4, 
			title: m.services_item4_title(),
			subtitle: m.services_item4_subtitle(),
			hoverText: m.services_item4_hoverText(),
			icon: m.services_item4_icon(),
			cardClass: 'card-4', 
			row: 'bottom' 
		},
		{ 
			id: 5, 
			title: m.services_item5_title(),
			subtitle: m.services_item5_subtitle(),
			hoverText: m.services_item5_hoverText(),
			icon: m.services_item5_icon(),
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
					{#if item.id === 1}
						<p class="card-title card-1-title">{item.title}</p>
						<h3 class="card-subtitle card-1-subtitle">{item.subtitle}</h3>
					{:else if item.id === 5}
						<p class="card-title card-5-title">{item.title}</p>
						<h3 class="card-subtitle card-5-subtitle">{item.subtitle}</h3>
					{:else}
						<h3 class="card-title">{item.title}</h3>
						<p class="card-subtitle">{item.subtitle}</p>
					{/if}
				</div>
				<div class="card-hover-content" class:show={hoveredCard === item.id}>
					<p class="hover-text">{item.hoverText}</p>
				</div>
				<div class="card-overlay" class:show={hoveredCard === item.id}></div>
			</div>
		{/each}
	</div>

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
					{#if item.id === 1}
						<p class="card-title card-1-title">{item.title}</p>
						<h3 class="card-subtitle card-1-subtitle">{item.subtitle}</h3>
					{:else if item.id === 5}
						<p class="card-title card-5-title">{item.title}</p>
						<h3 class="card-subtitle card-5-subtitle">{item.subtitle}</h3>
					{:else}
						<h3 class="card-title">{item.title}</h3>
						<p class="card-subtitle">{item.subtitle}</p>
					{/if}
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

	.bento-row.bottom .bento-card {
		flex: 1 1 0;
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
		transition: flex 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease, transform 0.3s ease;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.bento-card.hovered {
		flex: 2 1 0;
		z-index: 10;
		transform: scale(1.02);
	}

	.bento-row.bottom .bento-card.hovered {
		flex: 1.8 1 0;
	}

	.bento-card.same-row {
		flex: 0.7 1 0;
		opacity: 0.7;
	}

	.bento-row.bottom .bento-card.same-row {
		flex: 0.8 1 0;
	}

	.card-content {
		position: relative;
		z-index: 2;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		transition: opacity 0.2s ease, transform 0.2s ease;
	}

	.card-content.hide-content {
		opacity: 0;
		transform: translateY(-10px);
	}

	.card-icon {
		font-size: 3.5rem;
		margin-bottom: 1.25rem;
	}

	/* Modifié pour la carte 3 - icône toujours blanche car image foncée */
	.card-1 .card-icon,
	.card-2 .card-icon,
	.card-3 .card-icon,
	.card-5 .card-icon {
		filter: brightness(0) invert(1);
	}

	.card-4 .card-icon {
		filter: brightness(0);
	}

	:global(.dark) .card-4 .card-icon {
		filter: brightness(0) invert(1);
	}

	.card-title {
		font-size: 2rem;
		font-weight: 800;
		text-transform: uppercase;
		margin: 0 0 0.5rem;
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
		background: url({highlightImg}) center/contain no-repeat;
		z-index: -1;
		pointer-events: none;
		opacity: 0.9;
	}

	.card-subtitle {
		font-size: 1.25rem;
		font-weight: 600;
		text-transform: uppercase;
		margin: 0;
		opacity: 0.85;
		line-height: 1.4;
	}

	.card-1-title {
		font-size: 1.25rem;
		font-weight: 600;
		opacity: 0.85;
		line-height: 1.4;
		margin: 0 0 0.5rem;
	}

	.card-1-title::before {
		display: none;
	}

	.card-1-subtitle {
		font-size: 2.5rem;
		font-weight: 800;
		opacity: 1;
		line-height: 1.2;
		margin: 0 0 0.75rem;
		position: relative;
		z-index: 2;
	}

	.card-1-subtitle::before {
		content: "";
		position: absolute;
		left: 0;
		bottom: -4px;
		width: 100%;
		height: 80%;
		background: url({highlightImg}) center/contain no-repeat;
		z-index: -1;
		pointer-events: none;
		opacity: 0.9;
	}

	.card-5-title {
		font-size: 1.25rem;
		font-weight: 600;
		opacity: 0.85;
		line-height: 1.4;
		margin: 0 0 0.5rem;
	}

	.card-5-title::before {
		display: none;
	}

	.card-5-subtitle {
		font-size: 2rem;
		font-weight: 800;
		opacity: 1;
		line-height: 1.2;
		margin: 0 0 0.75rem;
		position: relative;
		z-index: 2;
	}

	.card-5-subtitle::before {
		content: "";
		position: absolute;
		left: 0;
		bottom: -4px;
		width: 100%;
		height: 80%;
		background: url({highlightImg}) center/contain no-repeat;
		z-index: -1;
		pointer-events: none;
		opacity: 0.9;
	}

	/* Modifié pour la carte 3 - texte toujours noir */
	.card-3 .card-title,
	.card-3 .card-subtitle {
		color: #000000 !important;
		text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
	}

	.card-4 .card-title,
	.card-4 .card-subtitle {
		color: var(--gray-900, #171717);
	}

	.card-1 .card-title,
	.card-1 .card-subtitle,
	.card-2 .card-title,
	.card-2 .card-subtitle,
	.card-5 .card-title,
	.card-5 .card-subtitle {
		color: var(--gray-100, #f5f5f5);
	}

	:global(.dark) .card-4 .card-title,
	:global(.dark) .card-4 .card-subtitle {
		color: var(--gray-100, #f5f5f5);
	}

	.card-1 {
		background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('/box.jpg') center/cover no-repeat;
	}

	.card-2 {
		background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('/nature.jpg') center/cover no-repeat;
	}

	/* Modifié pour la carte 3 - ajout de l'image certifications.png */
	.card-3 {
		background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url('/certifications.png') center/cover no-repeat;
	}

	.card-4 { 
		background: linear-gradient(135deg, #d4d4d4 0%, #a3a3a3 100%);
	}
	
	.card-5 { 
		background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('/soda-can.png') center/cover no-repeat;
	}

	:global(.dark) .card-4 { 
		background: linear-gradient(135deg, #525252 0%, #737373 100%);
	}

	/* Overlay pour les cartes avec image (1, 2, 3, 5) */
	.card-1::before,
	.card-2::before,
	.card-3::before,
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
	.card-2:hover::before,
	.card-3:hover::before,
	.card-5:hover::before {
		background: rgba(0, 0, 0, 0.4);
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
		font-size: 1.1rem;
		line-height: 1.6;
		font-weight: 500;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
	}

	.card-1 .hover-text,
	.card-4 .hover-text {
		font-size: 1.25rem;
		color: var(--gray-50, #fafafa);
		text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
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
			flex: 1 1 auto;
			height: 200px;
			opacity: 1;
			transform: none;
		}

		.bento-card.hovered {
			height: 280px;
		}

		.card-icon {
			font-size: 2.5rem;
			margin-bottom: 1rem;
		}

		.card-title { font-size: 1.6rem; }
		.card-1-subtitle { font-size: 1.8rem; }
		.card-subtitle { font-size: 1.05rem; }
		.card-1-title { font-size: 1.05rem; }
		.card-5-subtitle { font-size: 1.6rem; }
		.card-5-title { font-size: 1.05rem; }
		
		/* Pour la carte 3 - texte toujours noir sur mobile aussi */
		.card-3 .card-title,
		.card-3 .card-subtitle {
			color: #000000 !important;
			text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
		}
	}

	@media (max-width: 768px) {
		.page-wrapper { padding: 1rem; }
		.bento-row { gap: 0.875rem; }
		.bento-card {
			padding: 1.75rem;
			height: 180px;
			border-radius: 1.5rem;
		}
		.card-icon { font-size: 2.25rem; }
		.card-title { font-size: 1.5rem; }
		.card-1-subtitle { font-size: 1.65rem; }
		.card-subtitle { font-size: 1rem; }
		.card-1-title { font-size: 1rem; }
		.card-5-subtitle { font-size: 1.5rem; }
		.card-5-title { font-size: 1rem; }
	}

	@media (max-width: 480px) {
		.page-wrapper { padding: 0.875rem; }
		.bento-row { gap: 0.75rem; }
		.bento-card {
			padding: 1.5rem;
			height: 160px;
			border-radius: 1.25rem;
		}
		.card-icon { font-size: 2rem; }
		.card-title { font-size: 1.35rem; }
		.card-1-subtitle { font-size: 1.5rem; }
		.card-subtitle { font-size: 0.95rem; }
		.card-1-title { font-size: 0.95rem; }
		.card-5-subtitle { font-size: 1.35rem; }
		.card-5-title { font-size: 0.95rem; }
	}
</style>