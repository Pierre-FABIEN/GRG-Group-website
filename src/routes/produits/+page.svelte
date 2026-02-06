<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import { scale } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages.js';

	const bentoItems = [
		{ 
			id: 1, 
			title: m.products_item1_title(),
			subtitle: m.products_item1_subtitle(),
			hoverText: m.products_item1_hoverText(),
			icon: '',
			cardClass: 'card-1', 
			row: 'top',
			extraTall: true,
			link: "https://www.europages.fr/GRG-GROUPE-BOISSONS-ENERGISANTES-PERSONNALISEES-LABEL-PRIVE/00000005551463-001.html",
			buttonText: "Découvrir nos produits"
		},
		{ 
			id: 2, 
			title: m.products_item2_title(),
			subtitle: m.products_item2_subtitle(),
			hoverText: m.products_item2_hoverText(),
			icon: '',
			cardClass: 'card-2', 
			row: 'top',
			link: "https://www.europages.fr/GRG-GROUPE-BOISSONS-ENERGISANTES-PERSONNALISEES-LABEL-PRIVE/00000005551463-001.html",
			buttonText: "Découvrir nos produits"
		},
		{ 
			id: 3, 
			title: m.products_item3_title(),
			subtitle: m.products_item3_subtitle(),
			hoverText: m.products_item3_hoverText(),
			icon: '',
			cardClass: 'card-3', 
			row: 'bottom',
			link: "https://www.europages.fr/GRG-GROUPE-BOISSONS-ENERGISANTES-PERSONNALISEES-LABEL-PRIVE/00000005551463-001.html",
			buttonText: "Découvrir nos produits"
		},
		{ 
			id: 4, 
			title: m.products_item4_title(),
			subtitle: m.products_item4_subtitle(),
			hoverText: m.products_item4_hoverText(),
			icon: '',
			cardClass: 'card-4', 
			row: 'bottom',
			link: "https://www.europages.fr/GRG-GROUPE-BOISSONS-ENERGISANTES-PERSONNALISEES-LABEL-PRIVE/00000005551463-001.html",
			buttonText: "Découvrir nos produits"
		},
		{ 
			id: 5, 
			title: m.products_item5_title(),
			subtitle: m.products_item5_subtitle(),
			hoverText: m.products_item5_hoverText(),
			icon: '',
			cardClass: 'card-5', 
			row: 'bottom',
			needsMargin: true,
			link: "https://www.europages.fr/GRG-GROUPE-BOISSONS-ENERGISANTES-PERSONNALISEES-LABEL-PRIVE/00000005551463-001.html",
			buttonText: "Découvrir nos produits"
		}
	];

	let hoveredCard: number | null = null;
	let hoveredRow: string | null = null;
	let isMobile = false;

	$: if (typeof window !== 'undefined') {
		isMobile = window.innerWidth <= 1024;
	}

	function handleCardHover(id: number) {
		if (isMobile) return;
		hoveredCard = id;
		const card = bentoItems.find(item => item.id === id);
		hoveredRow = card?.row || null;
	}

	function handleCardLeave() {
		if (isMobile) return;
		hoveredCard = null;
		hoveredRow = null;
	}

	function handleCardClick(item: any) {
		if (!isMobile) return;
		if (hoveredCard === item.id) {
			hoveredCard = null;
			hoveredRow = null;
		} else {
			hoveredCard = item.id;
			hoveredRow = item.row;
		}
	}

	function isInSameRow(item: any): boolean {
		return hoveredRow !== null && item.row === hoveredRow && hoveredCard !== item.id;
	}

	function handleLinkClick(event: MouseEvent, item: any) {
		event.stopPropagation();
		event.preventDefault();
		
		if (item.link) {
			window.location.href = item.link;
		}
	}

	function getSubtitleParts(item: any): any {
		if (item.id === 1) {
			const words = item.subtitle.split(' ');
			if (words.length <= 1) return item.subtitle;
			const lastWord = words.pop();
			const rest = words.join(' ');
			return [rest + (rest ? ' ' : ''), { type: 'highlight', text: lastWord }];
		}
		return item.subtitle;
	}
</script>

<h1 style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap">
	GRG Groupe : Solutions Produits
</h1>

<h2 style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap">
	Produits alimentaires et nutraceutiques
</h2>

<div class="page-wrapper">
	<div class="bento-container">
		<div class="bento-row top">
			{#each bentoItems.filter(i => i.row === 'top') as item, i (item.id)}
				<div
					class="bento-card {item.cardClass}"
					class:extra-tall={item.extraTall}
					class:hovered={hoveredCard === item.id}
					class:same-row={isInSameRow(item)}
					class:expanded-mobile={hoveredCard === item.id}
					onmouseenter={() => handleCardHover(item.id)}
					onmouseleave={handleCardLeave}
					onclick={() => handleCardClick(item)}
					role="button"
					tabindex="0"
					in:scale={{ delay: i * 100, duration: 600 }}
				>
					<div class="card-content" class:hide-content={hoveredCard === item.id}>
						{#if item.icon}
							<div class="card-icon">{item.icon}</div>
						{/if}
						
						<h3 class="card-title">
							<span class="highlight-full">{item.title}</span>
						</h3>
						<p class="card-subtitle">
							{#if item.id === 1}
								{#each getSubtitleParts(item) as part}
									{#if typeof part === 'object' && part.type === 'highlight'}
										<span class="highlight-word">{part.text}</span>
									{:else}
										{part}
									{/if}
								{/each}
							{:else}
								{item.subtitle}
							{/if}
						</p>
					</div>
					<div class="card-hover-content" class:show={hoveredCard === item.id}>
						<div class="hover-content-wrapper">
							<p class="hover-text">{@html item.hoverText}</p>
							
							{#if item.link && item.buttonText}
								<div class="link-wrapper">
									<a 
										href={item.link}
										class="discover-link"
										onclick={(e) => handleLinkClick(e, item)}
										aria-label="{item.buttonText}"
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
			{#each bentoItems.filter(i => i.row === 'bottom') as item, i (item.id)}
				<div
					class="bento-card {item.cardClass}"
					class:needs-margin={item.needsMargin}
					class:hovered={hoveredCard === item.id}
					class:same-row={isInSameRow(item)}
					class:expanded-mobile={hoveredCard === item.id}
					onmouseenter={() => handleCardHover(item.id)}
					onmouseleave={handleCardLeave}
					onclick={() => handleCardClick(item)}
					role="button"
					tabindex="0"
					in:scale={{ delay: i * 100, duration: 600 }}
				>
					<div class="card-content" class:hide-content={hoveredCard === item.id}>
						{#if item.icon}
							<div class="card-icon">{item.icon}</div>
						{/if}
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
										onclick={(e) => handleLinkClick(e, item)}
										aria-label="{item.buttonText}"
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
	</div>
</div>

<style lang="scss">
:root {
    --contrast-light-1: #e5e5e5;
    --contrast-light-2: #d4d4d4;
    --contrast-light-3: #a3a3a3;
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

.bento-row:last-child {
    margin-bottom: 0;
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
    transition: all var(--transition-speed) var(--transition-easing);
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: var(--card-margin);
}

.bento-card.extra-tall {
    flex: 1.2 1 0;
}

.bento-card.hovered {
    flex: 2 1 0;
    z-index: 10;
}

.bento-card.same-row {
    flex: 1 1 0;
    opacity: 0.8;
}

.bento-card.needs-margin {
    margin-bottom: 2rem;
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

.card-title {
    font-size: clamp(1.8rem, 4.5vw, 2.5rem);
    font-weight: 800;
    text-transform: uppercase;
    margin: 0 0 0.75rem;
    line-height: 1.2;
    transition: font-size 0.3s ease, opacity 0.3s ease;
    position: relative;
    display: inline-block;
    width: 100%;
}

.highlight-full {
    position: relative;
    display: inline-block;
    z-index: 2;
}

.highlight-full::before {
    content: "";
    position: absolute;
    left: -2%;
    bottom: 5%;
    width: 104%;
    height: 50%;
    background: linear-gradient(90deg, 
        rgba(255, 85, 85, 0.4) 0%, 
        rgba(255, 85, 85, 0.5) 50%, 
        rgba(255, 85, 85, 0.4) 100%
    );
    z-index: -1;
    pointer-events: none;
    transform: skewY(-0.5deg);
    transition: all 0.3s ease;
}

.card-subtitle {
    font-size: clamp(1.1rem, 3.2vw, 1.5rem);
    font-weight: 600;
    text-transform: uppercase;
    margin: 0;
    opacity: 0.85;
    line-height: 1.4;
    transition: font-size 0.3s ease, opacity 0.3s ease;
}

.card-1 .card-title,
.card-2 .card-title,
.card-3 .card-title,
.card-4 .card-title,
.card-5 .card-title {
    color: var(--gray-900, #171717);
}

.card-1 .card-subtitle,
.card-2 .card-subtitle,
.card-3 .card-subtitle,
.card-4 .card-subtitle,
.card-5 .card-subtitle {
    color: var(--gray-900, #171717);
}

:global(.dark) .card-1 .card-title,
:global(.dark) .card-2 .card-title,
:global(.dark) .card-3 .card-title,
:global(.dark) .card-4 .card-title,
:global(.dark) .card-5 .card-title,
:global(.dark) .card-1 .card-subtitle,
:global(.dark) .card-2 .card-subtitle,
:global(.dark) .card-3 .card-subtitle,
:global(.dark) .card-4 .card-subtitle,
:global(.dark) .card-5 .card-subtitle {
    color: var(--gray-100, #f5f5f5);
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

.card-1 .card-title,
.card-1 .card-subtitle {
    color: var(--gray-100, #f5f5f5) !important;
}

:global(.dark) .card-1 .card-title,
:global(.dark) .card-1 .card-subtitle {
    color: var(--gray-100, #f5f5f5) !important;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7) !important;
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
    transition: all 0.3s ease;
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
    display: flex;
    align-items: center;
    justify-content: center;
}

.card-hover-content.show {
    opacity: 1;
    transition-delay: 0.1s;
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
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    text-align: center;
}

.card-hover-content.show .hover-text {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.2s;
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
    background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25)), url('/aluminium.png') center/cover no-repeat;
}

.card-2 {
    background: linear-gradient(135deg, var(--contrast-light-2, #d4d4d4) 0%, var(--contrast-light-3, #a3a3a3) 100%);
}

.card-3 { 
    background: linear-gradient(135deg, var(--contrast-light-2, #d4d4d4) 0%, var(--contrast-light-3, #a3a3a3) 100%); 
}

.card-4 {
    background: linear-gradient(135deg, var(--contrast-light-1, #e5e5e5) 0%, var(--contrast-light-2, #d4d4d4) 100%);
}

.card-5 {
    background: linear-gradient(135deg, var(--contrast-light-2, #d4d4d4) 0%, var(--contrast-light-3, #a3a3a3) 100%);
}

:global(.dark) .card-1 { 
    background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25)), url('/aluminium.png') center/cover no-repeat;
}

:global(.dark) .card-2 {
    background: linear-gradient(135deg, var(--contrast-dark-2, #525252) 0%, var(--contrast-dark-3, #737373) 100%);
}

:global(.dark) .card-3 { 
    background: linear-gradient(135deg, var(--contrast-dark-2, #525252) 0%, var(--contrast-dark-3, #737373) 100%); 
}

:global(.dark) .card-4 { 
    background: linear-gradient(135deg, var(--contrast-dark-1, #404040) 0%, var(--contrast-dark-2, #525252) 100%); 
}

:global(.dark) .card-5 { 
    background: linear-gradient(135deg, var(--contrast-dark-2, #525252) 0%, var(--contrast-dark-3, #737373) 100%); 
}

.card-1::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 1.75rem;
    z-index: 1;
    transition: background 0.3s ease;
}

.card-1:hover::before {
    background: rgba(0, 0, 0, 0.4);
}

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
    }

    .bento-card {
        width: calc(100% - (var(--container-padding) * 2));
        margin-left: auto;
        margin-right: auto;
        height: 30vh;
        flex: none !important;
        opacity: 1 !important;
        margin-bottom: var(--card-margin);
        padding: 2rem;
        border-radius: 1.5rem;
    }

    .bento-card.extra-tall {
        height: 30vh;
    }

    .bento-card.needs-margin {
        margin-bottom: var(--card-margin);
    }

    .bento-card:not(:last-child) {
        margin-bottom: var(--card-margin);
    }

    .bento-card.expanded-mobile {
        height: 50vh;
        z-index: 100;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
        transform: scale(1.02);
    }

    .bento-card.expanded-mobile ~ .bento-card:not(.expanded-mobile),
    .bento-card:has(~ .bento-card.expanded-mobile):not(.expanded-mobile) {
        height: 30vh;
        opacity: 0.85;
        filter: brightness(0.9);
    }

    .card-content {
        text-align: center;
        align-items: center;
        padding: 1.5rem;
    }

    .highlight-full::before {
        height: 40%;
        bottom: 10%;
    }

    .card-hover-content {
        width: 92%;
        max-width: 450px;
    }
    
    .hover-content-wrapper {
        gap: 1.5rem;
    }
    
    .hover-text {
        font-size: 1rem;
        line-height: 1.5;
        margin-bottom: 0;
    }
    
    .discover-link {
        font-size: 0.9rem;
    }
    
    .link-text {
        font-size: 0.9rem;
    }
    
    .link-arrow {
        width: 14px;
        height: 14px;
    }
}

@media (max-width: 768px) {
    .card-hover-content {
        width: 94%;
        max-width: 400px;
    }
    
    .hover-content-wrapper {
        gap: 1.25rem;
    }
    
    .hover-text {
        font-size: 0.95rem;
        line-height: 1.55;
        padding: 0 0.5rem;
    }
    
    .discover-link {
        font-size: 0.85rem;
        gap: 0.5rem;
    }
    
    .link-text {
        font-size: 0.85rem;
    }
    
    .link-arrow {
        width: 12px;
        height: 12px;
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
        max-width: 350px;
    }
    
    .hover-content-wrapper {
        gap: 1rem;
    }
    
    .hover-text {
        font-size: 0.85rem;
        line-height: 1.6;
        padding: 0;
    }
    
    .discover-link {
        font-size: 0.8rem;
        gap: 0.4rem;
    }
    
    .link-text {
        font-size: 0.8rem;
    }
    
    .link-arrow {
        width: 10px;
        height: 10px;
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
        width: 98%;
        max-width: 300px;
    }
    
    .hover-content-wrapper {
        gap: 0.8rem;
    }
    
    .hover-text {
        font-size: 0.75rem;
        line-height: 1.65;
    }
    
    .discover-link {
        font-size: 0.75rem;
        gap: 0.3rem;
    }
    
    .link-text {
        font-size: 0.75rem;
    }
    
    .link-arrow {
        width: 8px;
        height: 8px;
    }

    .card-title {
        font-size: clamp(1.2rem, 3.2vw, 1.6rem);
    }

    .card-subtitle {
        font-size: clamp(0.9rem, 2.4vw, 1.2rem);
    }
}
</style>