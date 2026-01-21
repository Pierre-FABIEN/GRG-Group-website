<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import { scale } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages.js';

	const bentoItems = [
		{ 
			id: 1, 
			title: m.contact_item1_title(),
			subtitle: m.contact_item1_subtitle(),
			hoverText: m.contact_item1_hoverText(),
			icon: '',
			cardClass: 'card-1', 
			row: 'top',
			link: "https://www.linkedin.com/company/grg-groupe-sarl/",
			target: "_blank",
			buttonText: "Notre réseau"
		},
		{ 
			id: 2, 
			title: "EUROPAGES",
			subtitle: m.contact_item3_subtitle(),
			hoverText: m.contact_item3_hoverText(),
			icon: '',
			cardClass: 'card-2', 
			row: 'top',
			link: "https://www.europages.fr/fr/request/create?companySlug=grg-groupe-food-beverage-label-prive-22269045&source=WEB_COMPANY_PROFILE",
			target: "_blank",
			buttonText: "Voir sur Europages"
		},
		{ 
			id: 3, 
			title: m.contact_item4_title(),
			subtitle: m.contact_item4_subtitle(),
			hoverText: m.contact_item4_hoverText(),
			icon: '',
			cardClass: 'card-3', 
			row: 'top',
			
		},
		{ 
			id: 4, 
			title: m.contact_item5_title(),
			subtitle: m.contact_item5_subtitle(),
			hoverText: m.contact_item5_hoverText(),
			icon: '',
			cardClass: 'card-4', 
			row: 'bottom',
			link: "mailto:hub@grggroupe.com",
			target: "_self",
			buttonText: "Nous contacter"
		}
	];

	// MODIFICATION: Ajout de la carte logo
	const logoCard = {
		id: 5,
		title: '',
		subtitle: '',
		hoverText: '',
		icon: '',
		cardClass: 'card-logo',
		row: 'bottom',
		isLogo: true,
		link: null,
		buttonText: ''
	};

	// Fusion des cartes
	const allCards = [...bentoItems, logoCard];

	let hoveredCard: number | null = null;
	let hoveredRow: string | null = null;

	function handleCardHover(id: number) {
		hoveredCard = id;
		const card = allCards.find(item => item.id === id);
		hoveredRow = card?.row || null;
	}

	function handleCardLeave() {
		hoveredCard = null;
		hoveredRow = null;
	}

	function handleLinkClick(event: MouseEvent, item: any) {
		if (!item.link) return;
		
		event.stopPropagation();
		event.preventDefault();
		
		if (item.target === "_blank") {
			window.open(item.link, '_blank', 'noopener,noreferrer');
		} else {
			window.location.href = item.link;
		}
	}

	function isInSameRow(item: any): boolean {
		return hoveredRow !== null && item.row === hoveredRow && hoveredCard !== item.id;
	}

	function getHighlightedText(text: string): any {
		if (!text || text.trim() === '') return text;
		
		const words = text.split(' ');
		if (words.length <= 1) return text;
		
		const lastWord = words.pop();
		const rest = words.join(' ');
		
		return [
			rest + (rest ? ' ' : ''),
			{ type: 'highlight', text: lastWord }
		];
	}

	function getTitleParts(item: any): any {
		// MODIFICATION: Force highlight pour les cartes 1 et 2
		if (item.id === 1 || item.id === 2) {
			const result = getHighlightedText(item.title);
			// Si le texte n'a qu'un mot, on le highlight quand même
			if (typeof result === 'string') {
				return [{ type: 'highlight', text: result }];
			}
			return result;
		}
		return getHighlightedText(item.title);
	}
</script>

<h1 style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap">
	GRG Groupe : Contact
</h1>

<h2 style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap">
	Contactez-nous pour vos projets
</h2>

<div class="page-wrapper">
	<div class="bento-container">
		<div class="bento-row top">
			{#each allCards.filter(i => i.row === 'top') as item, i (item.id)}
				<div
					class="bento-card {item.cardClass}"
					class:hovered={hoveredCard === item.id}
					class:same-row={isInSameRow(item)}
					class:expanded-mobile={hoveredCard === item.id}
					onmouseenter={() => handleCardHover(item.id)}
					onmouseleave={handleCardLeave}
					role="article"
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
						<p class="card-subtitle">{item.subtitle}</p>
					</div>

					<div class="card-hover-content" class:show={hoveredCard === item.id}>
						<p class="hover-text">{@html item.hoverText}</p>
						
						{#if item.link && item.buttonText}
							<a 
								href={item.link}
								class="discover-link"
								onclick={(e) => handleLinkClick(e, item)}
								aria-label="{item.buttonText}"
							>
								{item.buttonText}
							</a>
						{/if}
					</div>

					<div class="card-overlay" class:show={hoveredCard === item.id}></div>
				</div>
			{/each}
		</div>

		<div class="bento-row bottom">
			{#each allCards.filter(i => i.row === 'bottom') as item, i (item.id)}
				<div
					class="bento-card {item.cardClass}"
					class:hovered={hoveredCard === item.id}
					class:same-row={isInSameRow(item) && !item.isLogo}
					class:expanded-mobile={hoveredCard === item.id}
					class:logo-card={item.isLogo}
					onmouseenter={item.isLogo ? undefined : () => handleCardHover(item.id)}
					onmouseleave={item.isLogo ? undefined : handleCardLeave}
					role={item.isLogo ? "presentation" : "article"}
					tabindex={item.isLogo ? "-1" : "0"}
					in:scale={{ delay: i * 100, duration: 600 }}
				>
					{#if item.isLogo}
						<!-- Carte Logo -->
						<div class="logo-content">
							<img src="/GRG®_2026_large_2c.png" alt="GRG Groupe" class="logo-image" />
						</div>
					{:else}
						<!-- Carte normale -->
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
							<p class="card-subtitle">{item.subtitle}</p>
						</div>

						<div class="card-hover-content" class:show={hoveredCard === item.id}>
							<p class="hover-text">{@html item.hoverText}</p>
							
							{#if item.link && item.buttonText}
								<a 
									href={item.link}
									class="discover-link"
									onclick={(e) => handleLinkClick(e, item)}
									aria-label="{item.buttonText}"
								>
									{item.buttonText}
								</a>
							{/if}
						</div>

						<div class="card-overlay" class:show={hoveredCard === item.id}></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.page-wrapper {
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		box-sizing: border-box;
		font-family: 'open-sans', sans-serif;
		background: transparent;
		position: relative;
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

	.bento-row.bottom {
		margin-bottom: 0;
		justify-content: space-between;
	}

	.bento-card {
		position: relative;
		border-radius: 1.75rem;
		padding: 2.5rem;
		overflow: hidden;
		box-sizing: border-box;
		min-width: 0;
		max-width: 100%;
		flex: 1 1 0;
		transition: all 0.3s ease;
		height: 100%;
		display: flex;
		flex-direction: column;
		cursor: pointer;
	}

	/* MODIFICATION: Carte 4 fait 50% initial */
	.bento-card.card-4 {
		flex: 0 0 calc(50% - 0.625rem);
	}

	/* MODIFICATION: Carte logo fait 50% initial */
	.bento-card.card-logo {
		flex: 0 0 calc(50% - 0.625rem);
		cursor: default;
		background: transparent;
		padding: 0;
	}

	.bento-card.hovered {
		flex: 2 1 0;
		z-index: 10;
	}

	/* MODIFICATION: Carte 4 grossit à 66% au hover */
	.bento-card.card-4.hovered {
		flex: 0 0 66%;
	}

	/* MODIFICATION: Carte logo rétrécit à 34% quand carte 4 hover */
	.bento-row.bottom .bento-card.card-4.hovered ~ .bento-card.card-logo {
		flex: 0 0 34%;
	}

	.bento-card.same-row {
		flex: 1 1 0;
		opacity: 0.8;
	}

	/* MODIFICATION: Carte logo réagit au hover */
	.bento-card.card-logo.same-row {
		flex: 0 0 calc(50% - 0.625rem);
		opacity: 0.8;
	}

	.bento-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	/* MODIFICATION: Carte logo pas de hover */
	.bento-card.card-logo:hover {
		transform: none;
		box-shadow: none;
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

	/* MODIFICATION: Contenu logo */
	.logo-content {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		padding: 2rem;
		box-sizing: border-box;
		
	}

	.logo-image {
		height: 10rem;
		width: auto;
		opacity: 0.9;
		filter: brightness(0) saturate(100%) invert(12%) sepia(78%) saturate(1535%) hue-rotate(155deg) brightness(95%) contrast(101%);
		transition: all 0.3s ease;
		
	}

	.bento-card.card-logo.same-row .logo-image {
		opacity: 0.6;
		transform: scale(0.9);
	}

	:global(.dark) .logo-image {
		filter: brightness(0) invert(1);
		opacity: 0.8;
	}

	.card-title {
		font-size: 2rem;
		font-weight: 800;
		margin: 0 0 0.75rem;
		line-height: 1.2;
		color: var(--gray-100, #f5f5f5);
		text-transform: uppercase;
	}

	.card-subtitle {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
		opacity: 0.85;
		line-height: 1.5;
		color: var(--gray-100, #f5f5f5);
		text-transform: uppercase;
	}

	.card-1 {
		background: linear-gradient(135deg, var(--contrast-dark-1, #404040) 0%, var(--contrast-dark-2, #525252) 100%);
	}

	.card-2 {
		background: #002e1f;
	}

	.card-3 {
		background: linear-gradient(135deg, var(--contrast-dark-2, #525252) 0%, var(--contrast-dark-3, #737373) 100%);
	}

	.card-4 {
		background: linear-gradient(135deg, var(--contrast-light-1, #e5e5e5) 0%, var(--contrast-light-2, #d4d4d4) 100%);
	}

	.card-4 .card-title,
	.card-4 .card-subtitle {
		color: var(--gray-900, #171717);
	}

	/* MODIFICATION: hoverText et bouton en blanc contrasté */
	.card-4 .hover-text,
	.card-4 .discover-link {
		color: var(--gray-100, #f5f5f5) !important;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5) !important;
	}

	.card-4 .discover-link {
		border: 2px solid var(--gray-100, #f5f5f5) !important;
		background: rgba(255, 255, 255, 0.1) !important;
	}

	.card-4 .discover-link:hover {
		color: var(--gray-50, #fafafa) !important;
		border-color: var(--gray-50, #fafafa) !important;
		background: rgba(255, 255, 255, 0.2) !important;
	}

	:global(.dark) .card-4 .card-title,
	:global(.dark) .card-4 .card-subtitle {
		color: var(--gray-100, #f5f5f5);
	}

	:global(.dark) .card-4 { 
		background: linear-gradient(135deg, var(--contrast-dark-1, #404040) 0%, var(--contrast-dark-2, #525252) 100%); 
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
		pointer-events: auto;
	}

	.hover-text {
		color: var(--gray-100, #f5f5f5);
		font-size: 1.25rem;
		line-height: 1.6;
		font-weight: 500;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
		margin-bottom: 1.5rem;
	}

	.discover-link {
		display: inline-block;
		color: var(--gray-100, #f5f5f5);
		font-size: 1rem;
		font-weight: 700;
		text-decoration: none;
		text-transform: uppercase;
		padding: 0.75rem 1.5rem;
		border: 2px solid var(--gray-100, #f5f5f5);
		border-radius: 50px;
		transition: all 0.3s ease;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(8px);
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
		pointer-events: auto;
		cursor: pointer;
	}

	.discover-link:hover {
		background: rgba(255, 255, 255, 0.2);
		color: var(--gray-50, #fafafa);
		border-color: var(--gray-50, #fafafa);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	:root {
		--contrast-light-1: #e5e5e5;
		--contrast-light-2: #d4d4d4;
		--contrast-dark-1: #404040;
		--contrast-dark-2: #525252;
		--contrast-dark-3: #737373;
	}

	/* RESPONSIVE */
	@media (max-width: 1024px) {
		.page-wrapper {
			height: auto;
			min-height: 100vh;
			justify-content: flex-start;
			padding-top: 1rem;
		}

		.bento-container {
			padding: 1rem;
			padding-bottom: 2rem;
			position: relative;
		}

		.bento-row {
			flex-direction: column;
			gap: 0.75rem;
			height: auto;
			margin-bottom: 0.75rem;
			position: relative;
		}

		.bento-row.bottom {
			justify-content: stretch;
		}

		.bento-card {
			flex: 1 1 auto !important;
			width: 100% !important;
			height: auto !important;
			min-height: 22vh !important;
			max-height: 28vh !important;
			opacity: 1 !important;
			transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
			position: relative;
			z-index: 1;
			padding: 1.5rem;
			display: flex;
			align-items: center;
		}

		.bento-card.card-4,
		.bento-card.card-logo {
			flex: 1 1 auto !important;
			width: 100% !important;
		}

		/* MODIFICATION: En responsive, logo en dessous */
		.bento-card.card-logo {
			order: 2;
			height: 120px !important;
			min-height: 120px !important;
			max-height: 120px !important;
			padding: 1rem !important;
			justify-content: center;
			align-items: center;
		}

		.logo-content {
			padding: 0;
			justify-content: center;
			align-items: center;
		}

		.bento-row.bottom .bento-card.card-4.hovered ~ .bento-card.card-logo {
			flex: 1 1 auto !important;
		}

		.bento-card.expanded-mobile {
			min-height: 32vh !important;
			max-height: 38vh !important;
			z-index: 100;
			position: relative;
		}
		
		.bento-card.expanded-mobile + .bento-card {
			margin-top: 1.5rem;
			transform: translateY(0);
		}

		.bento-row.top .bento-card.expanded-mobile {
			margin-bottom: 1.5rem;
		}

		.bento-card.card-4.hovered {
			flex: 1 1 auto !important;
		}

		.bento-card.card-4.same-row,
		.bento-card.card-logo.same-row {
			flex: 1 1 auto !important;
		}

		.card-content {
			padding: 0.5rem;
			justify-content: center;
			width: 100%;
			height: 100%;
		}

		.card-title {
			font-size: clamp(1.2rem, 4vh, 1.6rem);
			margin-bottom: 0.4rem;
			line-height: 1.15;
			text-align: left;
			width: 100%;
		}
		
		.card-subtitle {
			font-size: clamp(1rem, 3vh, 1.3rem);
			line-height: 1.2;
			margin-bottom: 0;
			text-align: left;
			width: 100%;
		}

		.hover-text {
			padding: 0.75rem;
			font-size: clamp(0.95rem, 2.6vh, 1.1rem);
			line-height: 1.4;
			max-height: calc(100% - 1.5rem);
			overflow-y: auto;
			margin-bottom: 1rem;
		}

		.discover-link {
			font-size: clamp(0.85rem, 2.3vh, 0.95rem);
			padding: clamp(0.5rem, 1.8vh, 0.65rem) clamp(1rem, 3vh, 1.2rem);
		}

		.highlight-word::before {
			height: 40%;
			bottom: -2px;
		}

		.logo-image {
			height: clamp(60px, 8vh, 70px);
		}
	}

	@media (max-width: 768px) {
		.bento-container { 
			padding: 0.75rem; 
			padding-bottom: 1.5rem;
		}
		
		.bento-row { 
			gap: 0.5rem; 
		}
		
		.bento-card {
			min-height: 20vh !important;
			max-height: 26vh !important;
			padding: 1.25rem;
		}
		
		.bento-card.card-logo {
			height: 100px !important;
			min-height: 100px !important;
			max-height: 100px !important;
			padding: 0.75rem !important;
		}
		
		.bento-card.expanded-mobile {
			min-height: 28vh !important;
			max-height: 34vh !important;
		}
		
		.bento-card.expanded-mobile + .bento-card {
			margin-top: 1rem;
		}

		.bento-row.top .bento-card.expanded-mobile {
			margin-bottom: 1rem;
		}
		
		.card-content {
			padding: 0.4rem;
		}

		.card-title {
			font-size: clamp(1.1rem, 3.6vh, 1.5rem);
			margin-bottom: 0.3rem;
		}
		
		.card-subtitle {
			font-size: clamp(0.95rem, 2.6vh, 1.2rem);
		}
		
		.hover-text {
			font-size: clamp(0.9rem, 2.4vh, 1.05rem);
			padding: 0.5rem;
		}
		
		.discover-link {
			font-size: clamp(0.8rem, 2.1vh, 0.9rem);
			padding: clamp(0.45rem, 1.6vh, 0.6rem) clamp(0.9rem, 2.7vh, 1.1rem);
		}
		
		.logo-image {
			height: clamp(50px, 7vh, 60px);
		}
	}

	@media (max-width: 480px) {
		.bento-container { 
			padding: 0.5rem; 
			padding-bottom: 1rem;
		}
		
		.bento-row { 
			gap: 0.4rem; 
		}
		
		.bento-card {
			min-height: 18vh !important;
			max-height: 24vh !important;
			padding: 1rem;
			border-radius: 1.25rem;
		}
		
		.bento-card.card-logo {
			height: 80px !important;
			min-height: 80px !important;
			max-height: 80px !important;
			padding: 0.5rem !important;
		}
		
		.bento-card.expanded-mobile {
			min-height: 26vh !important;
			max-height: 32vh !important;
		}
		
		.bento-card.expanded-mobile + .bento-card {
			margin-top: 0.75rem;
		}
		
		.card-content {
			padding: 0.3rem;
		}

		.card-title {
			font-size: clamp(1rem, 3.2vh, 1.3rem);
			margin-bottom: 0.25rem;
			line-height: 1.1;
		}
		
		.card-subtitle {
			font-size: clamp(0.85rem, 2.2vh, 1.05rem);
			line-height: 1.15;
		}
		
		.hover-text {
			font-size: clamp(0.8rem, 2vh, 0.95rem);
			line-height: 1.3;
			padding: 0.4rem;
		}
		
		.discover-link {
			font-size: clamp(0.75rem, 1.9vh, 0.85rem);
			padding: clamp(0.4rem, 1.4vh, 0.55rem) clamp(0.8rem, 2.4vh, 1rem);
		}
		
		.logo-image {
			height: clamp(40px, 6vh, 50px);
		}

		.highlight-word::before {
			height: 35%;
			bottom: -3px;
		}
	}

	@media (max-width: 360px) {
		.bento-container {
			padding-bottom: 0.75rem;
		}
		
		.bento-card {
			min-height: 16vh !important;
			max-height: 22vh !important;
			padding: 0.75rem;
			border-radius: 1rem;
		}
		
		.bento-card.card-logo {
			height: 60px !important;
			min-height: 60px !important;
			max-height: 60px !important;
			padding: 0.25rem !important;
		}
		
		.bento-card.expanded-mobile {
			min-height: 24vh !important;
			max-height: 30vh !important;
		}
		
		.bento-card.expanded-mobile + .bento-card {
			margin-top: 0.5rem;
		}
		
		.card-content {
			padding: 0.25rem;
		}

		.card-title {
			font-size: clamp(0.9rem, 2.8vh, 1.1rem);
			margin-bottom: 0.2rem;
		}
		
		.card-subtitle {
			font-size: clamp(0.75rem, 2vh, 0.95rem);
		}
		
		.hover-text {
			font-size: clamp(0.75rem, 1.8vh, 0.9rem);
			line-height: 1.25;
			padding: 0.3rem;
		}
		
		.discover-link {
			font-size: clamp(0.7rem, 1.7vh, 0.8rem);
			padding: clamp(0.35rem, 1.2vh, 0.5rem) clamp(0.7rem, 2.1vh, 0.9rem);
		}
		
		.logo-image {
			height: clamp(35px, 5vh, 45px);
		}

		.highlight-word::before {
			height: 30%;
			bottom: -4px;
		}
	}
</style>