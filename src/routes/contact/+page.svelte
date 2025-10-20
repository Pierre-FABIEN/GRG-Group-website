<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import { scale } from 'svelte/transition';

const bentoItems = [
		{
			id: 1,
			title: "LinkedIn",
			subtitle: "Rejoignez notre réseau",
			icon: "💼",
hoverText: `Visitez notre page <a href="https://www.linkedin.com/company/grg-groupe-sarl/" 
	target="_blank" 
	rel="noopener noreferrer" 
	class="hover-link">LinkedIn</a> pour suivre nos actualités.`,
			cardClass: "card-1",
			row: "top"
		},
		{
			id: 2,
			title: "Facebook GRG GROUPE",
			subtitle: "Notre communauté",
			icon: "📘",
			hoverText: `Rejoignez-nous sur <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" class="hover-link">Facebook</a> pour découvrir nos nouveautés.`,
			cardClass: "card-2",
			row: "top"
		},
		{
			id: 3,
			title: "Facebook XPLICITDRINKS",
			subtitle: "Découvrez notre marque",
			icon: "⚡",
			hoverText: `Suivez <a href="https://www.facebook.com/xplicitdrink" target="_blank" rel="noopener noreferrer" class="hover-link">XPLICITDRINKS</a> pour explorer nos boissons et innovations.`,
			cardClass: "card-3",
			row: "bottom"
		},
		{
			id: 4,
			title: "Contact Email",
			subtitle: "Écrivez-nous directement",
			icon: "✉️",
			hoverText: `Envoyez un message à <a href="mailto:contact@grggroupe.com" class="hover-link">contact@grggroupe.com</a>`,
			cardClass: "card-4",
			row: "bottom"
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
	<!-- Ligne du haut : 2 cartes -->
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
					<h3 class="card-title">{item.title}</h3>
					<p class="card-subtitle">{item.subtitle}</p>
				</div>

				<div class="card-hover-content" class:show={hoveredCard === item.id}>
<p class="hover-text">{@html item.hoverText}</p>
				</div>

				<div class="card-overlay" class:show={hoveredCard === item.id}></div>
			</div>
		{/each}
	</div>

	<!-- Ligne du bas : 2 cartes -->
	<div class="bento-row bottom">
		{#each bentoItems.filter(i => i.row === 'bottom') as item, i (item.id)}
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
					<h3 class="card-title">{item.title}</h3>
					<p class="card-subtitle">{item.subtitle}</p>
				</div>

				<div class="card-hover-content" class:show={hoveredCard === item.id}>
<p class="hover-text">{@html item.hoverText}</p>
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

.card-title {
	font-size: 1.75rem;
	font-weight: 700;
	margin: 0 0 0.5rem;
	line-height: 1.2;
	color: var(--text-color-1);
	text-transform: uppercase;
}

.card-subtitle {
	font-size: 1rem;
	font-weight: 500;
	margin: 0;
	opacity: 0.85;
	line-height: 1.5;
	color: var(--text-color-2);
	text-transform: uppercase;
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
	pointer-events: auto; /* 👈 maintenant les liens peuvent être cliqués */
	color: white;
}


.hover-text {
	color: #058090;
	font-weight: 600;
	text-decoration: underline;
	transition: opacity 0.2s ease, text-shadow 0.2s ease;
}

.hover-text:hover {
	opacity: 0.85;
	text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
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

/* CARTES ET GRADIENTS */
.card-1 { background: var(--gradient-card1); }
.card-2 { background: var(--gradient-card2); }
.card-3 { background: var(--gradient-card3); }
.card-4 { background: var(--gradient-card4); }

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

	.card-icon { font-size: 2.5rem; margin-bottom: 1rem; }
	.card-title { font-size: 1.6rem; margin-bottom: 0.5rem; }
	.card-subtitle { font-size: 1.05rem; }
	.hover-text { font-size: 0.95rem; line-height: 1.5; }
	.card-hover-content { width: 90%; }
}

@media (max-width: 768px) {
	.page-wrapper { padding: 1rem; }
	.bento-row { gap: 0.875rem; }
	.bento-card { padding: 1.75rem; height: 180px !important; border-radius: 1.5rem; }
	.bento-card.hovered { height: 260px !important; }
	.card-icon { font-size: 2.25rem; margin-bottom: 0.875rem; }
	.card-title { font-size: 1.5rem; margin-bottom: 0.5rem; }
	.card-subtitle { font-size: 1rem; }
	.hover-text { font-size: 0.9rem; line-height: 1.5; }
}

@media (max-width: 480px) {
	.page-wrapper { padding: 0.875rem; }
	.bento-row { gap: 0.75rem; }
	.bento-card { padding: 1.5rem; height: 160px !important; border-radius: 1.25rem; }
	.bento-card.hovered { height: 240px !important; }
	.card-icon { font-size: 2rem; margin-bottom: 0.75rem; }
	.card-title { font-size: 1.35rem; margin-bottom: 0.4rem; }
	.card-subtitle { font-size: 0.95rem; }
	.hover-text { font-size: 0.85rem; line-height: 1.45; }
	.card-hover-content { width: 92%; }
}

/* Scroll et animation */
@media (max-width: 1024px) {
	.page-wrapper { -webkit-overflow-scrolling: touch; }
	.card-hover-content.show {
		animation: fadeInUp 0.3s ease;
	}
	@keyframes fadeInUp {
		from { opacity: 0; transform: translate(-50%, -45%); }
		to { opacity: 1; transform: translate(-50%, -50%); }
	}
}
</style>
