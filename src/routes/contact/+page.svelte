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
/* VARIABLES */
:root {
    --contrast-light-1: #e5e5e5;
    --contrast-light-2: #d4d4d4;
    --contrast-dark-1: #404040;
    --contrast-dark-2: #525252;
    --contrast-dark-3: #737373;
    
    /* Variables pour les marges */
    --mobile-margin: 1rem;
    --mobile-gap: 0.75rem;
    --card-margin: 0.75rem;
    --container-padding: 1rem;
    
    /* Variables de transition */
    --transition-speed: 0.30s;
    --transition-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* ============================================ */
/* STYLES DE BASE */
/* ============================================ */

.page-wrapper {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-sizing: border-box;
    font-family: 'open-sans', sans-serif;
    background: transparent;
}

.bento-container {
    width: 100%;
    max-width: 1400px;
    padding: var(--container-padding);
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--mobile-gap);
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
    transition: all var(--transition-speed) var(--transition-easing);
    height: 100%;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}

/* Carte 4 - 50% initial */
.bento-card.card-4 {
    flex: 0 0 calc(50% - 0.625rem);
}

/* Carte logo - 50% initial */
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

/* Carte 4 grossit à 66% au hover */
.bento-card.card-4.hovered {
    flex: 0 0 66%;
}

/* Carte logo rétrécit à 34% quand carte 4 hover */
.bento-row.bottom .bento-card.card-4.hovered ~ .bento-card.card-logo {
    flex: 0 0 34%;
}

.bento-card.same-row {
    flex: 1 1 0;
    opacity: 0.8;
}

/* Carte logo réagit au hover */
.bento-card.card-logo.same-row {
    flex: 0 0 calc(50% - 0.625rem);
    opacity: 0.8;
}

/* ============================================ */
/* CONTENU DES CARTES */
/* ============================================ */

.card-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    transition: all 0.4s var(--transition-easing);
    opacity: 1;
    transform: translateY(0);
}

.card-content.hide-content {
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.25s ease, transform 0.3s ease;
}

/* Contenu logo */
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

/* Typographie */
.card-title {
    font-size: clamp(1.8rem, 4.5vw, 2.5rem);
    font-weight: 800;
    margin: 0 0 0.75rem;
    line-height: 1.2;
    text-transform: uppercase;
    transition: font-size 0.3s ease, opacity 0.3s ease;
}

.card-subtitle {
    font-size: clamp(1.1rem, 3.2vw, 1.5rem);
    font-weight: 600;
    margin: 0;
    opacity: 0.85;
    line-height: 1.5;
    text-transform: uppercase;
    transition: font-size 0.3s ease, opacity 0.3s ease;
}

/* ============================================ */
/* COULEURS DES TEXTES - COMPORTEMENT ADAPTATIF */
/* ============================================ */

/* Mode clair */

/* Carte 1: texte blanc */
.card-1 .card-title,
.card-1 .card-subtitle {
    color: var(--gray-100, #f5f5f5);
}

/* Carte 2: texte blanc (fond vert fixe) */
.card-2 .card-title,
.card-2 .card-subtitle {
    color: var(--gray-100, #f5f5f5);
}

/* Carte 3: texte noir */
.card-3 .card-title,
.card-3 .card-subtitle {
    color: var(--gray-900, #171717);
}

/* Carte 4: texte noir */
.card-4 .card-title,
.card-4 .card-subtitle {
    color: var(--gray-900, #171717);
}

/* Mode sombre */

/* Carte 1: texte blanc */
:global(.dark) .card-1 .card-title,
:global(.dark) .card-1 .card-subtitle {
    color: var(--gray-100, #f5f5f5);
}

/* Carte 2: texte blanc (inchangé) */
:global(.dark) .card-2 .card-title,
:global(.dark) .card-2 .card-subtitle {
    color: var(--gray-100, #f5f5f5);
}

/* Carte 3: texte blanc */
:global(.dark) .card-3 .card-title,
:global(.dark) .card-3 .card-subtitle {
    color: var(--gray-100, #f5f5f5);
}

/* Carte 4: texte blanc */
:global(.dark) .card-4 .card-title,
:global(.dark) .card-4 .card-subtitle {
    color: var(--gray-100, #f5f5f5);
}

/* Highlight */
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
    transition: all 0.3s ease;
}

/* ============================================ */
/* HOVER CONTENT - VERSION AMÉLIORÉE */
/* ============================================ */

.card-hover-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.95);
    z-index: 3;
    width: 90%;
    max-width: 500px;
    text-align: center;
    opacity: 0;
    transition: all 0.4s var(--transition-easing);
    pointer-events: none;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    min-height: 0;
}

.card-hover-content.show {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    transition-delay: 0.1s;
    pointer-events: auto;
}

.hover-text {
    color: var(--gray-100, #f5f5f5);
    font-size: 1.25rem;
    line-height: 1.5;
    font-weight: 500;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
    margin: 0 0 1.5rem 0;
    opacity: 0;
    transform: translateY(15px);
    transition: all 0.4s var(--transition-easing);
    width: 100%;
    max-width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
}

.card-hover-content.show .hover-text {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.2s;
}

/* Carte 4 - hoverText et bouton en blanc contrasté */
.card-4 .hover-text,
.card-4 .discover-link {
    color: var(--gray-100, #f5f5f5) !important;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5) !important;
}

/* BOUTONS DE LIEN */
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
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.4s var(--transition-easing);
}

.card-hover-content.show .discover-link {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.3s;
}

.card-4 .discover-link {
    border: 2px solid var(--gray-100, #f5f5f5) !important;
    background: rgba(255, 255, 255, 0.1) !important;
}

.discover-link:hover {
    background: rgba(255, 255, 255, 0.2);
    color: var(--gray-50, #fafafa);
    border-color: var(--gray-50, #fafafa);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.card-4 .discover-link:hover {
    color: var(--gray-50, #fafafa) !important;
    border-color: var(--gray-50, #fafafa) !important;
    background: rgba(255, 255, 255, 0.2) !important;
}

/* ============================================ */
/* BACKGROUNDS - COMPORTEMENT ADAPTATIF */
/* ============================================ */

/* Mode clair */

/* Carte 1: fond sombre */
.card-1 {
    background: linear-gradient(135deg, var(--contrast-dark-1, #404040) 0%, var(--contrast-dark-2, #525252) 100%);
}

/* Carte 2: fond vert fixe (ne change pas) */
.card-2 {
    background: #002e1f;
}

/* Carte 3: fond clair */
.card-3 {
    background: linear-gradient(135deg, var(--contrast-light-1, #e5e5e5) 0%, var(--contrast-light-2, #d4d4d4) 100%);
}

/* Carte 4: fond clair */
.card-4 {
    background: linear-gradient(135deg, var(--contrast-light-1, #e5e5e5) 0%, var(--contrast-light-2, #d4d4d4) 100%);
}

/* Mode sombre */

/* Carte 1: fond sombre (inchangé) */
:global(.dark) .card-1 {
    background: linear-gradient(135deg, var(--contrast-dark-1, #404040) 0%, var(--contrast-dark-2, #525252) 100%);
}

/* Carte 2: fond vert fixe (inchangé) */
:global(.dark) .card-2 {
    background: #002e1f; /* Toujours vert foncé */
}

/* Carte 3: fond sombre */
:global(.dark) .card-3 {
    background: linear-gradient(135deg, var(--contrast-dark-2, #525252) 0%, var(--contrast-dark-3, #737373) 100%);
}

/* Carte 4: fond sombre */
:global(.dark) .card-4 {
    background: linear-gradient(135deg, var(--contrast-dark-1, #404040) 0%, var(--contrast-dark-2, #525252) 100%);
}

/* ============================================ */
/* OVERLAY */
/* ============================================ */

.card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0px);
    opacity: 0;
    transition: all 0.4s var(--transition-easing);
    z-index: 1;
}

.card-overlay.show {
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    opacity: 1;
}

/* ============================================ */
/* RESPONSIVE MOBILE - MÊME CONFIGURATION */
/* ============================================ */

@media (max-width: 1024px) {
    :root {
        --mobile-margin: 0.5rem;
        --mobile-gap: 0.5rem;
        --card-margin: 0.5rem;
        --container-padding: 0.5rem;
    }

    .page-wrapper {
        padding: var(--mobile-margin) 0;
    }

    .bento-container {
        padding: var(--container-padding);
        gap: var(--mobile-gap);
    }

    .bento-row {
        display: contents;
        margin-bottom: 0;
        height: auto;
    }

    .bento-row.bottom {
        display: contents;
    }

    .bento-card {
        width: calc(100% - (var(--container-padding) * 2));
        margin-left: auto;
        margin-right: auto;
        height: 30vh;
        flex: none !important;
        opacity: 1 !important;
        margin-bottom: var(--card-margin);
        transition: all var(--transition-speed) var(--transition-easing);
        padding: 2rem;
        border-radius: 1.5rem;
    }

    /* Reset des styles spécifiques sur mobile */
    .bento-card.card-4,
    .bento-card.card-logo {
        flex: none !important;
        width: calc(100% - (var(--container-padding) * 2)) !important;
        height: 30vh !important;
    }

    /* Carte logo - hauteur réduite sur mobile */
    .bento-card.card-logo {
        height: 120px !important;
        min-height: 120px !important;
        max-height: 120px !important;
        padding: 1rem !important;
        justify-content: center;
        align-items: center;
        order: 999; /* Toujours en dernier */
    }

    .logo-content {
        padding: 0;
        justify-content: center;
        align-items: center;
    }

    /* Désactivation des effets spécifiques sur mobile */
    .bento-row.bottom .bento-card.card-4.hovered ~ .bento-card.card-logo,
    .bento-card.card-4.hovered,
    .bento-card.card-4.same-row,
    .bento-card.card-logo.same-row {
        flex: none !important;
        width: calc(100% - (var(--container-padding) * 2)) !important;
    }

    .bento-card.expanded-mobile {
        height: 50vh;
        z-index: 100;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
        transform: scale(1.02);
        margin-bottom: var(--card-margin);
    }

    .bento-card.expanded-mobile ~ .bento-card:not(.expanded-mobile),
    .bento-card:has(~ .bento-card.expanded-mobile):not(.expanded-mobile) {
        height: 30vh;
        opacity: 0.85;
        filter: brightness(0.9);
        margin-bottom: var(--card-margin);
    }

    .bento-card:has(~ .bento-card.expanded-mobile):not(.expanded-mobile) {
        transform: translateY(8px) scale(0.98);
        margin-bottom: calc(var(--card-margin) - 0.2rem);
    }

    .bento-card.expanded-mobile ~ .bento-card:not(.expanded-mobile) {
        transform: translateY(-8px) scale(0.98);
        margin-bottom: calc(var(--card-margin) + 0.2rem);
    }

    .bento-card:first-child:not(.expanded-mobile):has(~ .bento-card.expanded-mobile) {
        transform: translateY(12px) scale(0.98);
        margin-bottom: var(--card-margin);
    }

    .bento-card:first-child.expanded-mobile {
        margin-bottom: var(--card-margin);
    }

    .bento-card:last-child:not(.expanded-mobile) {
        transform: translateY(-12px) scale(0.98);
        margin-bottom: 0;
    }

    .bento-card:last-child.expanded-mobile {
        margin-bottom: 0;
    }

    .card-content {
        text-align: center;
        align-items: center;
        padding: 1.5rem;
    }

    /* Textes responsive avec clamp */
    .card-title {
        font-size: clamp(1.8rem, 4.8vw, 2.3rem);
        text-align: center;
        width: 100%;
        margin-bottom: 0.5rem;
    }

    .card-subtitle {
        font-size: clamp(1.2rem, 3.2vw, 1.5rem);
        text-align: center;
        width: 100%;
    }

    /* Logo image responsive */
    .logo-image {
        height: clamp(60px, 8vh, 70px);
    }

    /* RESPONSIVE HOVERTEXT */
    .card-hover-content {
        width: 92%;
        padding: 1.75rem;
        max-width: 450px;
    }
    
    .hover-text {
        font-size: 1rem;
        line-height: 1.5;
        letter-spacing: 0.01em;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        margin-bottom: 1rem;
    }
    
    .discover-link {
        font-size: 0.9rem;
        padding: 0.6rem 1.2rem;
    }
}

@media (max-width: 768px) {
    .card-hover-content {
        width: 94%;
        padding: 1.5rem;
        max-width: 400px;
    }
    
    .hover-text {
        font-size: 0.95rem;
        line-height: 1.55;
        font-weight: 500;
        padding: 0 0.5rem;
        margin-bottom: 0.9rem;
    }
    
    .discover-link {
        font-size: 0.85rem;
        padding: 0.55rem 1rem;
    }
    
    .bento-card.expanded-mobile .card-hover-content {
        padding: 1.25rem;
        width: 95%;
    }
    
    .bento-card.expanded-mobile .hover-text {
        font-size: 0.9rem;
        line-height: 1.6;
    }

    /* Ajustements cartes */
    .bento-card.card-logo {
        height: 100px !important;
        min-height: 100px !important;
        max-height: 100px !important;
        padding: 0.75rem !important;
    }

    .logo-image {
        height: clamp(50px, 7vh, 60px);
    }

    .card-title {
        font-size: clamp(1.6rem, 4.2vw, 2rem);
    }

    .card-subtitle {
        font-size: clamp(1.1rem, 2.8vw, 1.4rem);
    }
}

@media (max-width: 480px) {
    .card-hover-content {
        width: 96%;
        padding: 1.25rem;
        max-width: 350px;
    }
    
    .hover-text {
        font-size: 0.85rem;
        line-height: 1.6;
        font-weight: 500;
        padding: 0;
        text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9);
        margin-bottom: 0.8rem;
    }
    
    .discover-link {
        font-size: 0.8rem;
        padding: 0.5rem 0.9rem;
    }
    
    .bento-card.expanded-mobile .card-hover-content {
        padding: 1rem;
        width: 97%;
    }
    
    .bento-card.expanded-mobile .hover-text {
        font-size: 0.8rem;
        line-height: 1.65;
        max-height: 70%;
        overflow-y: auto;
    }

    /* Ajustements cartes */
    .bento-card.card-logo {
        height: 80px !important;
        min-height: 80px !important;
        max-height: 80px !important;
        padding: 0.5rem !important;
    }

    .logo-image {
        height: clamp(40px, 6vh, 50px);
    }

    .card-title {
        font-size: clamp(1.4rem, 3.8vw, 1.8rem);
    }

    .card-subtitle {
        font-size: clamp(1rem, 2.6vw, 1.3rem);
        line-height: 1.25;
    }
}

@media (max-width: 360px) {
    .card-hover-content {
        padding: 1rem;
        width: 98%;
        max-width: 300px;
    }
    
    .hover-text {
        font-size: 0.75rem;
        line-height: 1.65;
        font-weight: 500;
        margin-bottom: 0.7rem;
    }
    
    .discover-link {
        font-size: 0.75rem;
        padding: 0.45rem 0.8rem;
    }
    
    .bento-card.expanded-mobile .hover-text {
        font-size: 0.72rem;
        line-height: 1.7;
    }

    /* Ajustements cartes */
    .bento-card.card-logo {
        height: 60px !important;
        min-height: 60px !important;
        max-height: 60px !important;
        padding: 0.25rem !important;
    }

    .logo-image {
        height: clamp(35px, 5vh, 45px);
    }

    .card-title {
        font-size: clamp(1.2rem, 3.2vw, 1.6rem);
    }

    .card-subtitle {
        font-size: clamp(0.9rem, 2.4vw, 1.2rem);
    }
}

/* Désactiver hover sur mobile */
@media (hover: none) and (pointer: coarse) {
    .bento-card.hovered,
    .bento-card.same-row {
        flex: none !important;
        opacity: 1 !important;
    }

    .card-overlay.show {
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
    }

    /* Désactiver les effets spécifiques sur mobile */
    .bento-card.card-4.hovered,
    .bento-row.bottom .bento-card.card-4.hovered ~ .bento-card.card-logo {
        flex: none !important;
        width: calc(100% - (var(--container-padding) * 2)) !important;
    }
}

.bento-card:not(.expanded-mobile) {
    animation: returnToNormal 0.4s var(--transition-easing) forwards;
}

@keyframes returnToNormal {
    from {
        opacity: 0.8;
        transform: scale(0.97);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>