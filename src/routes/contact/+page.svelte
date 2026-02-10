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
			cardClass: 'card-1', 
			row: 'top',
			link: "https://www.linkedin.com/company/grg-groupe-sarl/",
			target: "_blank",
			buttonText: "Notre réseau"
		},
		{ 
			id: 2, 
			title: m.contact_item2_title(),
			subtitle: m.contact_item2_subtitle(),
			hoverText: m.contact_item2_hoverText(),
			cardClass: 'card-2', 
			row: 'top',
			link: "https://www.europages.fr/fr/request/create?companySlug=grg-groupe-food-beverage-label-prive-22269045&source=WEB_COMPANY_PROFILE",
			target: "_blank",
			buttonText: "Voir sur Europages"
		},
		{ 
			id: 3, 
			title: m.contact_item3_title(),
			subtitle: m.contact_item3_subtitle(),
			hoverText: m.contact_item3_hoverText(),
			cardClass: 'card-3', 
			row: 'top'
		},
		{ 
			id: 4, 
			title: m.contact_item4_title(),
			subtitle: m.contact_item4_subtitle(),
			hoverText: m.contact_item4_hoverText(),
			cardClass: 'card-4', 
			row: 'bottom',
			link: "mailto:hub@grg-groupe.com",
			target: "_self",
			buttonText: "Nous contacter"
		}
	];

	const logoCard = {
		id: 5,
		cardClass: 'card-logo',
		row: 'bottom',
		isLogo: true
	};

	const allCards = [...bentoItems, logoCard];

	let hoveredCard: number | null = null;
	let hoveredRow: string | null = null;
	let isMobile = false;

	$: if (typeof window !== 'undefined') {
		isMobile = window.innerWidth <= 1024;
	}

	function handleCardHover(id: number) {
		if (isMobile) return;
		hoveredCard = id;
		const card = allCards.find(item => item.id === id);
		hoveredRow = card?.row || null;
	}

	function handleCardLeave() {
		if (isMobile) return;
		hoveredCard = null;
		hoveredRow = null;
	}

	function handleCardClick(event: MouseEvent, item: any) {
		if (isMobile) {
			const target = event.target as HTMLElement;
			if (target.closest('.discover-link')) {
				return;
			}
			
			if (hoveredCard === item.id) {
				hoveredCard = null;
				hoveredRow = null;
			} else {
				hoveredCard = item.id;
				hoveredRow = item.row;
			}
		}
	}

	function isInSameRow(item: any): boolean {
		return hoveredRow !== null && item.row === hoveredRow && hoveredCard !== item.id;
	}
</script>

<h1 style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap">
	GRG Groupe : Contact
</h1>

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
					onclick={(e) => handleCardClick(e, item)}
					role="article"
					tabindex="0"
					in:scale={{ delay: i * 100, duration: 600 }}
				>
					<div class="card-content" class:hide-content={hoveredCard === item.id}>
						<h3 class="card-title">
							<span class="highlight-full">{item.title}</span>
						</h3>
						<p class="card-subtitle">{item.subtitle}</p>
					</div>
					<div class="card-hover-content" class:show={hoveredCard === item.id}>
						<div class="hover-content-wrapper">
							<p class="hover-text">{@html item.hoverText}</p>
							{#if item.link && item.buttonText}
								<div class="link-wrapper">
									<a 
										href={item.link}
										class="discover-link"
										aria-label="{item.buttonText}"
										target={item.target || "_self"}
										rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
									>
										<span class="link-text">{item.buttonText}</span>
										<svg class="link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
									</a>
								</div>
							{/if}
						</div>
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
					onclick={item.isLogo ? undefined : (e) => handleCardClick(e, item)}
					role={item.isLogo ? "presentation" : "article"}
					tabindex={item.isLogo ? "-1" : "0"}
					in:scale={{ delay: i * 100, duration: 600 }}
				>
					{#if item.isLogo}
						<div class="logo-content">
							<img src="/GRG®_2026_large_2c.png" alt="GRG Groupe" class="logo-image" />
						</div>
					{:else}
						<div class="card-content" class:hide-content={hoveredCard === item.id}>
							<h3 class="card-title">
								<span class="highlight-full">{item.title}</span>
							</h3>
							<p class="card-subtitle">{item.subtitle}</p>
						</div>
						<div class="card-hover-content" class:show={hoveredCard === item.id}>
							<div class="hover-content-wrapper">
								<p class="hover-text">{@html item.hoverText}</p>
								{#if item.link && item.buttonText}
									<div class="link-wrapper">
										<a 
											href={item.link}
											class="discover-link"
											aria-label="{item.buttonText}"
											target={item.target || "_self"}
											rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
										>
											<span class="link-text">{item.buttonText}</span>
											<svg class="link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
											</svg>
										</a>
									</div>
								{/if}
							</div>
						</div>
						<div class="card-overlay" class:show={hoveredCard === item.id}></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
:root {
    --contrast-light-1: #e5e5e5;
    --contrast-light-2: #d4d4d4;
    --contrast-dark-1: #404040;
    --contrast-dark-2: #525252;
    --contrast-dark-3: #737373;
    --mobile-margin: 1rem;
    --mobile-gap: 0.75rem;
    --card-margin: 0.75rem;
    --container-padding: 1rem;
    --transition-speed: 0.30s;
    --transition-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

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

.bento-card.card-4 {
    flex: 0 0 calc(50% - 0.625rem);
}

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

.bento-card.card-4.hovered {
    flex: 0 0 66%;
}

.bento-row.bottom .bento-card.card-4.hovered ~ .bento-card.card-logo {
    flex: 0 0 34%;
}

.bento-card.same-row {
    flex: 1 1 0;
    opacity: 0.8;
}

.bento-card.card-logo.same-row {
    flex: 0 0 calc(50% - 0.625rem);
    opacity: 0.8;
}

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
    font-size: clamp(1.6rem, 4vw, 2.2rem);
    font-weight: 800;
    text-transform: uppercase;
    margin: 0 0 0.75rem;
    line-height: 1.4;
    transition: font-size 0.3s ease, opacity 0.3s ease;
    position: relative;
    display: block;
    width: 100%;
}

.highlight-full {
    position: relative;
    display: inline;
    background-image: 
        linear-gradient(transparent 0%, transparent 60%, rgba(255, 85, 85, 0.45) 60%, rgba(255, 85, 85, 0.5) 70%, rgba(255, 85, 85, 0.45) 80%, transparent 80%),
        linear-gradient(transparent 0%, transparent 55%, rgba(255, 85, 85, 0.4) 55%, rgba(255, 85, 85, 0.5) 65%, rgba(255, 85, 85, 0.4) 75%, transparent 75%);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    padding: 0.1em 0.2em;
    line-height: 1.4;
}

.card-subtitle {
    font-size: clamp(1.3rem, 3.5vw, 1.7rem);
    font-weight: 600;
    margin: 0;
    opacity: 0.85;
    line-height: 1.5;
    text-transform: uppercase;
    transition: font-size 0.3s ease, opacity 0.3s ease;
}

.card-1 .card-title,
.card-1 .card-subtitle {
    color: var(--gray-100, #f5f5f5);
}

.card-2 .card-title,
.card-2 .card-subtitle {
    color: var(--gray-100, #f5f5f5);
}

.card-3 .card-title,
.card-3 .card-subtitle {
    color: var(--gray-900, #171717);
}

.card-4 .card-title,
.card-4 .card-subtitle {
    color: var(--gray-900, #171717);
}

:global(.dark) .card-1 .card-title,
:global(.dark) .card-1 .card-subtitle {
    color: var(--gray-100, #f5f5f5);
}

:global(.dark) .card-2 .card-title,
:global(.dark) .card-2 .card-subtitle {
    color: var(--gray-100, #f5f5f5);
}

:global(.dark) .card-3 .card-title,
:global(.dark) .card-3 .card-subtitle {
    color: var(--gray-100, #f5f5f5);
}

:global(.dark) .card-4 .card-title,
:global(.dark) .card-4 .card-subtitle {
    color: var(--gray-100, #f5f5f5);
}

.card-hover-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    width: 90%;
    max-width: 500px;
    opacity: 0;
    transition: all 0.4s var(--transition-easing);
    pointer-events: none;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card-hover-content.show {
    opacity: 1;
    transition-delay: 0.1s;
    pointer-events: auto;
}

.hover-content-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.hover-text {
    color: var(--gray-100, #f5f5f5);
    font-size: 1.25rem;
    line-height: 1.5;
    font-weight: 500;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
    margin: 0;
    opacity: 0;
    transform: translateY(15px);
    transition: all 0.4s var(--transition-easing);
    
    
    hyphens: none;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    
   
    word-break: break-word; 
    overflow-wrap: break-word; 
    word-wrap: break-word;
    
 
    white-space: normal;
}

.card-hover-content.show .hover-text {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.2s;
}

.card-4 .hover-text,
.card-4 .discover-link {
    color: var(--gray-100, #f5f5f5) !important;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5) !important;
}

.link-wrapper {
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.4s var(--transition-easing);
}

.card-hover-content.show .link-wrapper {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.3s;
}

.discover-link {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--gray-100, #f5f5f5);
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 0.5rem 0;
    position: relative;
    transition: all 0.3s ease;
    pointer-events: auto;
    cursor: pointer;
    background: transparent;
    border: none;
}

.discover-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: currentColor;
    transition: width 0.3s ease;
}

.discover-link:hover {
    color: var(--gray-50, #fafafa);
}

.discover-link:hover::after {
    width: 100%;
}

.discover-link:hover .link-arrow {
    transform: translateX(4px);
}

.link-text {
    font-size: 1rem;
    font-weight: 600;
}

.link-arrow {
    transition: transform 0.3s ease;
    stroke: currentColor;
}

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

.card-1 {
    background: linear-gradient(135deg, var(--contrast-dark-1, #949494) 0%, var(--contrast-dark-2, #525252) 100%);
}

.card-2 {
    background: #236952;
}

.card-3 {
    background: linear-gradient(135deg, var(--contrast-light-1, #e5e5e5) 0%, var(--contrast-light-2, #d4d4d4) 100%);
}

.card-4 {
    background: linear-gradient(135deg, var(--contrast-light-1, #e5e5e5) 0%, var(--contrast-light-2, #d4d4d4) 100%);
}

:global(.dark) .card-1 {
    background: linear-gradient(135deg, var(--contrast-dark-1, #404040) 0%, var(--contrast-dark-2, #525252) 100%);
}

:global(.dark) .card-2 {
    background: #002e1f;
}

:global(.dark) .card-3 {
    background: linear-gradient(135deg, var(--contrast-dark-2, #525252) 0%, var(--contrast-dark-3, #737373) 100%);
}

:global(.dark) .card-4 {
    background: linear-gradient(135deg, var(--contrast-dark-1, #404040) 0%, var(--contrast-dark-2, #525252) 100%);
}

@media (max-width: 1024px) {
    :root {
        --mobile-margin: 0.25rem;
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
        height: 28vh;
        flex: none !important;
        opacity: 1 !important;
        margin-bottom: var(--card-margin);
        padding: 1.5rem;
        border-radius: 1.5rem;
    }

    .bento-card.card-4,
    .bento-card.card-logo {
        flex: none !important;
        width: calc(100% - (var(--container-padding) * 2)) !important;
        height: 28vh !important;
    }

    .bento-card.card-logo {
        height: 100px !important;
        min-height: 100px !important;
        max-height: 100px !important;
        padding: 1rem !important;
        justify-content: center;
        align-items: center;
        order: 999;
        margin-top: 0.5rem;
    }

    .logo-content {
        padding: 0;
        justify-content: center;
        align-items: center;
    }

    .card-title {
        font-size: clamp(1.8rem, 4.5vw, 2.5rem);
        margin-bottom: 0.5rem;
    }

    .card-subtitle {
        font-size: clamp(1.2rem, 3.2vw, 1.6rem);
    }

    .highlight-full::before {
        height: 40%;
        bottom: 10%;
    }

    .logo-image {
        height: clamp(55px, 7.5vh, 65px);
    }

    .bento-card.expanded-mobile {
        height: 50vh !important;
        z-index: 100;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
        transform: scale(1.02);
    }

    .bento-card.card-logo.expanded-mobile {
        height: 100px !important;
        transform: none;
        box-shadow: none;
    }

    .bento-card.card-4.expanded-mobile {
        height: 50vh !important;
    }

    .card-content {
        text-align: center;
        align-items: center;
        padding: 1rem;
    }

    .card-hover-content {
        width: 95%;
        max-width: 500px;
        padding: 1.5rem;
    }

    .hover-content-wrapper {
        gap: 1.25rem;
    }

    .hover-text {
        font-size: 1.3rem;
        line-height: 1.6;
        margin-bottom: 0;
    }

    .discover-link {
        font-size: 1rem;
    }

    .link-text {
        font-size: 1rem;
    }

    .link-arrow {
        width: 15px;
        height: 15px;
    }
}

@media (max-width: 768px) {
    .card-title {
        font-size: clamp(1.7rem, 4.3vw, 2.3rem);
    }

    .card-subtitle {
        font-size: clamp(1.15rem, 3.1vw, 1.55rem);
    }

     .bento-card.card-logo {
        height: 100px !important;
        min-height: 100px !important;
        max-height: 100px !important;
        padding: 1rem !important;
        justify-content: center;
        align-items: center;
        order: 999;
        margin-top: 0.5rem;
        margin-bottom: 4rem;
    }

    .logo-image {
        height: clamp(48px, 6.8vh, 58px);
    }

    .hover-text {
        font-size: 1.2rem;
        line-height: 1.6;
    }

    .discover-link {
        font-size: 0.95rem;
        gap: 0.55rem;
    }

    .link-text {
        font-size: 0.95rem;
    }

    .link-arrow {
        width: 13px;
        height: 13px;
    }
}

@media (max-width: 480px) {
    .card-title {
        font-size: clamp(1.5rem, 4vw, 2rem);
    }

    .card-subtitle {
        font-size: clamp(1.05rem, 2.8vw, 1.45rem);
    }

    .bento-card.card-logo {
        height: 70px !important;
        min-height: 70px !important;
        max-height: 70px !important;
        padding: 0.5rem !important;
    }

    .logo-image {
        height: clamp(38px, 5.8vh, 48px);
    }

    .hover-text {
        font-size: 1.1rem;
        line-height: 1.5;
    }

    .discover-link {
        font-size: 0.9rem;
        gap: 0.45rem;
    }

    .link-text {
        font-size: 0.9rem;
    }

    .link-arrow {
        width: 11px;
        height: 11px;
    }
}

@media (max-width: 360px) {
    .card-title {
        font-size: clamp(1.3rem, 3.8vw, 1.8rem);
    }

    .card-subtitle {
        font-size: clamp(0.95rem, 2.6vw, 1.3rem);
    }

    .bento-card.card-logo {
        height: 55px !important;
        min-height: 55px !important;
        max-height: 55px !important;
        padding: 0.25rem !important;
    }

    .logo-image {
        height: clamp(32px, 5vh, 42px);
    }

    .hover-text {
        font-size: 1rem;
        line-height: 1.5;
    }

    .discover-link {
        font-size: 0.85rem;
        gap: 0.35rem;
    }

    .link-text {
        font-size: 0.85rem;
    }

    .link-arrow {
        width: 9px;
        height: 9px;
    }
}
</style>