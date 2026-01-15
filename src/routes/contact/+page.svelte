<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import { scale } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages.js';
	const highlightImg = '/highlight.png';

	const bentoItems = [
		{ 
			id: 1, 
			title: m.contact_item1_title(),
			subtitle: m.contact_item1_subtitle(),
			hoverText: m.contact_item1_hoverText(),
			icon: m.contact_item1_icon(),
			cardClass: 'card-1', 
			row: 'top',
			link: "https://www.linkedin.com/company/grg-groupe-sarl/",
			target: "_blank"
		},
		{ 
			id: 2, 
			title: m.contact_item5_title(),
			subtitle: m.contact_item5_subtitle(),
			hoverText: m.contact_item5_hoverText(),
			icon: m.contact_item5_icon(),
			cardClass: 'card-2', 
			row: 'top',
			link: "mailto:contact@grggroupe.com",
			target: "_self"
		},
		{ 
			id: 3, 
			title: "EUROPAGES",
			subtitle: m.contact_item3_subtitle(),
			hoverText: m.contact_item3_hoverText(),
			icon: m.contact_item3_icon(),
			cardClass: 'card-3', 
			row: 'top',
			link: "https://www.europages.fr/fr/request/create?companySlug=grg-groupe-food-beverage-label-prive-22269045&source=WEB_COMPANY_PROFILE",
			target: "_blank"
		},
		{ 
			id: 4, 
			title: m.contact_item4_title(),
			subtitle: m.contact_item4_subtitle(),
			hoverText: m.contact_item4_hoverText(),
			icon: m.contact_item4_icon(),
			cardClass: 'card-4', 
			row: 'bottom',
			link: "mailto:contact@grggroupe.com",
			target: "_self"
		}
	];

	let hoveredCard: number | null = null;

	function handleCardHover(id: number) {
		hoveredCard = id;
	}

	function handleCardLeave() {
		hoveredCard = null;
	}

	// SUPPRIMER handleCardClick car le lien n'est plus sur la carte

	function handleButtonClick(item: any, event: MouseEvent) {
		event.stopPropagation(); // Empêcher la propagation à la carte parent
		if (item.link) {
			if (item.target === "_blank") {
				window.open(item.link, '_blank', 'noopener,noreferrer');
			} else {
				window.location.href = item.link;
			}
		}
	}

	function getButtonText(itemId: number): string {
		switch(itemId) {
			case 1:
				return "Voir sur LinkedIn";
			case 2:
				return "Nous contacter";
			case 3:
				return "Voir sur Europages";
			case 4:
				return "Nous contacter";
			default:
				return "Découvrir";
		}
	}
</script>

<div class="page-wrapper">
	<div class="bento-row top">
		{#each bentoItems.filter(i => i.row === 'top') as item, i (item.id)}
			<div
				class="bento-card {item.cardClass}"
				class:hovered={hoveredCard === item.id}
				onmouseenter={() => handleCardHover(item.id)}
				onmouseleave={handleCardLeave}
				role="article" <!-- Changé de 'button' à 'article' -->
				tabindex="0"
				in:scale={{ delay: i * 100, duration: 600 }}
			>
				<div class="card-content" class:hide-content={hoveredCard === item.id}>
					<div class="card-icon">{item.icon}</div>
					
					<h3 class="card-title">{item.title}</h3>
					<p class="card-subtitle">{item.subtitle}</p>
				</div>

				<div class="card-hover-content" class:show={hoveredCard === item.id}>
					<p class="hover-text">{@html item.hoverText}</p>
					<button 
						class="action-btn" 
						aria-label="{getButtonText(item.id)}"
						onclick={(e) => handleButtonClick(item, e)}
					>
						{getButtonText(item.id)}
					</button>
				</div>

				<div class="card-overlay" class:show={hoveredCard === item.id}></div>
			</div>
		{/each}
	</div>

	<div class="bento-row bottom">
		{#each bentoItems.filter(i => i.row === 'bottom') as item, i (item.id)}
			<div
				class="bento-card {item.cardClass} bottom-card"
				class:hovered={hoveredCard === item.id}
				onmouseenter={() => handleCardHover(item.id)}
				onmouseleave={handleCardLeave}
				role="article" <!-- Changé de 'button' à 'article' -->
				tabindex="0"
				in:scale={{ delay: i * 100, duration: 600 }}
			>
				<div class="card-content" class:hide-content={hoveredCard === item.id}>
					<div class="card-icon">{item.icon}</div>
					
					<h3 class="card-title">{item.title}</h3>
					<p class="card-subtitle">{item.subtitle}</p>
				</div>

				<div class="card-hover-content" class:show={hoveredCard === item.id}>
					<p class="hover-text">{@html item.hoverText}</p>
					<button 
						class="action-btn" 
						aria-label="{getButtonText(item.id)}"
						onclick={(e) => handleButtonClick(item, e)}
					>
						{getButtonText(item.id)}
					</button>
				</div>

				<div class="card-overlay" class:show={hoveredCard === item.id}></div>
			</div>
		{/each}
	</div>

	<div class="grg-brand">
		<h2 class="grg-title">GRG GROUPE</h2>
		<p class="grg-subtitle">{m.home_item1_subtitle()}</p>
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
	background: var(--gray-50, #fafafa);
	position: relative;
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

.bento-row.bottom {
	margin-bottom: 0;
	opacity: 1;
	height: 50%;
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
	cursor: default; /* Changé de 'pointer' à 'default' */
}

.bento-card.bottom-card {
	flex: 0 0 33.333%;
}

.bento-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.bento-card.hovered {
	flex: 2 1 0;
}

.bento-card.bottom-card.hovered {
	flex: 0 0 40%;
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
	filter: brightness(0) invert(1) !important;
	transition: all 0.3s ease;
}

.bento-card:hover .card-icon {
	transform: scale(1.05);
}

.card-title {
	font-size: 2rem;
	font-weight: 800;
	margin: 0 0 0.5rem;
	line-height: 1.2;
	color: var(--gray-100, #f5f5f5) !important;
	text-transform: uppercase;
}

.card-subtitle {
	font-size: 1.25rem;
	font-weight: 600;
	margin: 0;
	opacity: 0.85;
	line-height: 1.5;
	color: var(--gray-100, #f5f5f5) !important;
	text-transform: uppercase;
}

.card-1 {
	background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('/IN.png') center/cover no-repeat;
	position: relative;
}

.card-2 {
	background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('/mail.png') center/cover no-repeat;
	position: relative;
}

.card-3 {
	background: #002e1f !important;
	position: relative;
}

.card-4 {
	background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('/avis-clients.jpg') center/cover no-repeat;
	position: relative;
}

.card-1::before,
.card-2::before,
.card-3::before,
.card-4::before {
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
.card-4:hover::before {
	background: rgba(0, 0, 0, 0.4);
}

.card-3::before {
	background: rgba(0, 46, 31, 0.1) !important;
}

.card-3:hover::before {
	background: rgba(0, 46, 31, 0.3) !important;
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
	pointer-events: auto;
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
	margin-bottom: 1.5rem;
}

.action-btn {
	background: rgba(255, 255, 255, 0.15);
	color: white;
	border: 2px solid rgba(255, 255, 255, 0.4);
	border-radius: 50px;
	padding: 0.75rem 1.5rem;
	font-size: 0.95rem;
	font-weight: 600;
	text-transform: uppercase;
	cursor: pointer;
	transition: all 0.3s ease;
	backdrop-filter: blur(4px);
	pointer-events: auto;
}

.action-btn:hover {
	background: rgba(255, 255, 255, 0.25);
	border-color: white;
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.card-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(4px);
	opacity: 0;
	transition: opacity 0.2s ease;
	z-index: 1;
}

.card-overlay.show { 
	opacity: 1; 
}

.grg-brand {
	position: absolute;
	bottom: 2rem;
	right: 2rem;
	text-align: right;
	z-index: 10;
	pointer-events: none;
}

.grg-title {
	font-family: 'raleway', sans-serif;
	font-size: 3.5rem;
	font-weight: 900;
	color: #002e1f;
	line-height: 1;
	margin: 0 0 0.3rem 0;
	letter-spacing: 0.05em;
	text-transform: uppercase;
}

.grg-subtitle {
	font-family: 'open-sans', sans-serif;
	font-size: 1rem;
	font-weight: 600;
	color: #7faf0d;
	margin: 0;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	opacity: 0.9;
}

:global(.dark) .grg-title {
	color: #ffffff;
}

:global(.dark) .grg-subtitle {
	color: #a8d64e;
}

/* === CORRECTIONS RESPONSIVE OPTIMISÉES === */
@media (max-width: 1024px) {
	.page-wrapper {
		height: auto;
		min-height: 100vh;
		padding: 1.5rem;
		justify-content: flex-start;
		padding-bottom: 4rem; /* Espace pour le branding */
	}

	.bento-row {
		flex-direction: column;
		gap: 1rem;
		height: auto;
		margin-bottom: 1rem;
	}

	.bento-row.bottom {
		display: flex;
		margin-bottom: 0;
	}

	.bento-card {
		flex: 1 1 auto !important; /* Force comportement uniforme */
		width: 100% !important;
		height: 300px !important; /* Hauteur augmentée */
		opacity: 1 !important;
		min-height: 300px;
	}

	.bento-card.bottom-card {
		flex: 1 1 auto !important;
		width: 100% !important;
		height: 300px !important;
		min-height: 300px;
	}

	.bento-card.hovered {
		flex: 1 1 auto !important;
		height: 350px !important;
		min-height: 350px;
	}

	.bento-card.bottom-card.hovered {
		height: 350px !important;
		min-height: 350px;
	}

	/* Désactiver les effets flex sur mobile */
	.bento-card.hovered,
	.bento-card.bottom-card {
		flex: 1 1 auto !important;
		width: 100% !important;
	}

	.card-icon { 
		font-size: 2.5rem; 
		margin-bottom: 1rem; 
	}
	
	.card-title { 
		font-size: 1.6rem; 
		margin-bottom: 0.5rem; 
		line-height: 1.15;
	}
	
	.card-subtitle { 
		font-size: 1.05rem; 
		line-height: 1.25;
	}
	
	.hover-text { 
		font-size: 0.95rem; 
		line-height: 1.5;
		margin-bottom: 1rem;
	}
	
	.action-btn {
		font-size: 0.9rem;
		padding: 0.6rem 1.2rem;
	}
	
	.grg-brand {
		position: relative;
		bottom: auto;
		right: auto;
		text-align: center;
		margin-top: 2rem;
		margin-bottom: 1rem;
		width: 100%;
	}
	
	.grg-title {
		font-size: 2.5rem;
	}
	
	.grg-subtitle {
		font-size: 0.9rem;
	}
}

@media (max-width: 768px) {
	.page-wrapper { 
		padding: 1rem; 
		padding-bottom: 3.5rem;
	}
	
	.bento-row { 
		gap: 0.875rem; 
	}
	
	.bento-card { 
		padding: 1.75rem; 
		height: 280px !important;
		min-height: 280px;
	}
	
	.bento-card.hovered { 
		height: 330px !important;
		min-height: 330px;
	}
	
	.bento-card.bottom-card.hovered {
		height: 330px !important;
		min-height: 330px;
	}
	
	.card-icon { 
		font-size: 2.25rem; 
		margin-bottom: 0.875rem; 
	}
	
	.card-title { 
		font-size: 1.5rem; 
		margin-bottom: 0.4rem;
	}
	
	.card-subtitle { 
		font-size: 1rem; 
		line-height: 1.2;
	}
	
	.hover-text { 
		font-size: 0.9rem; 
		line-height: 1.4;
	}
	
	.action-btn {
		font-size: 0.85rem;
		padding: 0.5rem 1rem;
	}
	
	.grg-title {
		font-size: 2rem;
	}
	
	.grg-subtitle {
		font-size: 0.8rem;
	}
}

@media (max-width: 480px) {
	.page-wrapper { 
		padding: 0.875rem; 
		padding-bottom: 3rem;
	}
	
	.bento-row { 
		gap: 0.75rem; 
	}
	
	.bento-card { 
		padding: 1.5rem; 
		height: 260px !important;
		min-height: 260px;
	}
	
	.bento-card.hovered { 
		height: 310px !important;
		min-height: 310px;
	}
	
	.bento-card.bottom-card.hovered {
		height: 310px !important;
		min-height: 310px;
	}
	
	.card-icon { 
		font-size: 2rem; 
		margin-bottom: 0.5rem;
	}
	
	.card-title { 
		font-size: 1.35rem; 
		margin-bottom: 0.3rem;
		line-height: 1.1;
	}
	
	.card-subtitle { 
		font-size: 0.95rem; 
		line-height: 1.15;
	}
	
	.hover-text { 
		font-size: 0.85rem; 
		line-height: 1.4;
	}
	
	.action-btn {
		font-size: 0.8rem;
		padding: 0.4rem 0.8rem;
	}
	
	.grg-title {
		font-size: 1.8rem;
	}
	
	.grg-subtitle {
		font-size: 0.75rem;
	}
}

@media (max-width: 360px) {
	.page-wrapper {
		padding-bottom: 2.5rem;
	}
	
	.bento-card {
		padding: 1.25rem;
		height: 240px !important;
		min-height: 240px;
	}

	.bento-card.hovered {
		height: 290px !important;
		min-height: 290px;
	}

	.bento-card.bottom-card.hovered {
		height: 290px !important;
		min-height: 290px;
	}

	.card-icon {
		font-size: 1.75rem;
		margin-bottom: 0.25rem;
	}

	.card-title {
		font-size: 1.2rem;
		margin-bottom: 0.25rem;
	}

	.card-subtitle {
		font-size: 0.875rem;
		line-height: 1.1;
	}

	.hover-text {
		font-size: 0.8rem;
		line-height: 1.35;
	}
	
	.action-btn {
		font-size: 0.75rem;
		padding: 0.35rem 0.7rem;
	}
	
	.grg-title {
		font-size: 1.6rem;
	}
	
	.grg-subtitle {
		font-size: 0.7rem;
	}
}
</style>