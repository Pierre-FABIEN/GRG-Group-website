<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import { scale } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages.js';

	const bentoItems = [
		{ 
			id: 1, 
			title: m.services_item1_title(),
			subtitle: m.services_item1_subtitle(),
			hoverText: m.services_item1_hoverText(),
			icon: '',
			cardClass: 'card-1', 
			row: 'top',
			extraTall: true
		},
		{ 
			id: 2, 
			title: m.services_item2_title(),
			subtitle: m.services_item2_subtitle(),
			hoverText: m.services_item2_hoverText(),
			icon: '',
			cardClass: 'card-2', 
			row: 'top'
		},
		{ 
			id: 3, 
			title: m.services_item3_title(),
			subtitle: m.services_item3_subtitle(),
			hoverText: m.services_item3_hoverText(),
			icon: '',
			cardClass: 'card-3', 
			row: 'bottom'
		},
		{ 
			id: 4, 
			title: m.services_item4_title(),
			subtitle: m.services_item4_subtitle(),
			hoverText: m.services_item4_hoverText(),
			icon: '',
			cardClass: 'card-4', 
			row: 'bottom'
		},
		{ 
			id: 5, 
			title: m.services_item5_title(),
			subtitle: m.services_item5_subtitle(),
			hoverText: m.services_item5_hoverText(),
			icon: '',
			cardClass: 'card-5', 
			row: 'bottom',
			needsMargin: true
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
		return getHighlightedText(item.title);
	}

	function getSubtitleParts(item: any): any {
		if (item.id === 4) {
			// Item 4: highlight dans le sous-titre (multi-lignes)
			const lines = item.subtitle.split('\n');
			if (lines.length > 1) {
				const lastLine = lines[lines.length - 1];
				const firstLines = lines.slice(0, -1).join('\n');
				
				const words = lastLine.split(' ');
				if (words.length <= 1) return item.subtitle;
				
				const lastWord = words.pop();
				const restOfLastLine = words.join(' ');
				
				return [
					firstLines + (firstLines ? '\n' : ''),
					restOfLastLine + (restOfLastLine ? ' ' : ''),
					{ type: 'highlight', text: lastWord }
				];
			}
		}
		return item.subtitle;
	}
</script>

<h1 style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap">
	GRG Groupe : Services
</h1>

<h2 style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap">
	Services industriels et solutions
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
							{#each getTitleParts(item) as part}
								{#if typeof part === 'object' && part.type === 'highlight'}
									<span class="highlight-word">{part.text}</span>
								{:else}
									{part}
								{/if}
							{/each}
						</h3>
						<p class="card-subtitle">
							{#if item.id === 4}
								{#each getSubtitleParts(item) as part}
									{#if typeof part === 'object' && part.type === 'highlight'}
										<span class="highlight-word">{part.text}</span>
									{:else if part === '\n'}
										<br />
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
						<div class="hover-text">
							{@html item.hoverText}
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
						<div class="hover-text">
							{@html item.hoverText}
						</div>
					</div>

					<div class="card-overlay" class:show={hoveredCard === item.id}></div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
/* VARIABLES - MISES À JOUR */
:root {
    --contrast-light-1: #e5e5e5;
    --contrast-light-2: #d4d4d4;
    --contrast-light-3: #a3a3a3;
    --contrast-dark-1: #555555;
    --contrast-dark-2: #666666;
    --contrast-dark-3: #7A7A7A;
    
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

/* ============================================ */
/* CONTENU DES CARTES - TEXTE ADAPTATIF */
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

.card-title {
    font-size: clamp(1.8rem, 4.5vw, 2.5rem);
    font-weight: 800;
    text-transform: uppercase;
    margin: 0 0 0.75rem;
    line-height: 1.2;
    transition: font-size 0.3s ease, opacity 0.3s ease;
}

.card-subtitle {
    font-size: clamp(1.1rem, 3.2vw, 1.5rem);
    font-weight: 600;
    text-transform: uppercase;
    margin: 0;
    opacity: 0.85;
    line-height: 1.4;
    transition: font-size 0.3s ease, opacity 0.3s ease;
    white-space: pre-line;
}

/* ============================================ */
/* COULEURS DES TEXTES - COMPORTEMENT ADAPTATIF */
/* ============================================ */

/* Mode clair : TOUTES les cartes = texte noir */
.card-1 .card-title,
.card-1 .card-subtitle,
.card-2 .card-title,
.card-2 .card-subtitle,
.card-3 .card-title,
.card-3 .card-subtitle,
.card-4 .card-title,
.card-4 .card-subtitle,
.card-5 .card-title,
.card-5 .card-subtitle {
    color: var(--gray-900, #171717);
}

/* Mode sombre : TOUTES les cartes = texte blanc */
:global(.dark) .card-1 .card-title,
:global(.dark) .card-1 .card-subtitle,
:global(.dark) .card-2 .card-title,
:global(.dark) .card-2 .card-subtitle,
:global(.dark) .card-3 .card-title,
:global(.dark) .card-3 .card-subtitle,
:global(.dark) .card-4 .card-title,
:global(.dark) .card-4 .card-subtitle,
:global(.dark) .card-5 .card-title,
:global(.dark) .card-5 .card-subtitle {
    color: var(--gray-100, #f5f5f5);
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
    align-items: center;
    justify-content: center;
    height: auto;
    min-height: 0;
}

.card-hover-content.show {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    transition-delay: 0.1s;
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

/* ============================================ */
/* BACKGROUNDS - COMPORTEMENT ADAPTATIF */
/* ============================================ */

/* Mode clair - TOUTES les cartes sont claires */
.card-1 {
    background: linear-gradient(135deg, var(--contrast-light-1, #e5e5e5) 0%, var(--contrast-light-2, #d4d4d4) 100%);
}

/* Carte 2 : fond clair en mode clair (comme les autres) */
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

/* ============================================ */
/* MODE SOMBRE - TOUTES les cartes sont sombres */
/* ============================================ */

:global(.dark) .card-1 { 
    background: linear-gradient(135deg, var(--contrast-dark-1, #555555) 0%, var(--contrast-dark-2, #666666) 100%); 
}

/* Carte 2 : fond sombre en mode sombre (comme les autres) */
:global(.dark) .card-2 {
    background: linear-gradient(135deg, var(--contrast-dark-2, #666666) 0%, var(--contrast-dark-3, #7A7A7A) 100%);
}

:global(.dark) .card-3 { 
    background: linear-gradient(135deg, var(--contrast-dark-2, #666666) 0%, var(--contrast-dark-3, #7A7A7A) 100%); 
}

:global(.dark) .card-4 { 
    background: linear-gradient(135deg, var(--contrast-dark-1, #555555) 0%, var(--contrast-dark-2, #666666) 100%); 
}

:global(.dark) .card-5 { 
    background: linear-gradient(135deg, var(--contrast-dark-2, #666666) 0%, var(--contrast-dark-3, #7A7A7A) 100%); 
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
/* RESPONSIVE MOBILE */
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
        white-space: normal;
        line-height: 1.3;
    }

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
    }
    
    .bento-card.expanded-mobile .card-hover-content {
        padding: 1.25rem;
        width: 95%;
    }
    
    .bento-card.expanded-mobile .hover-text {
        font-size: 0.9rem;
        line-height: 1.6;
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
    }
    
    .bento-card.expanded-mobile .card-hover-content {
        padding: 1rem;
        width: 97%;
    }
    
    .bento-card.expanded-mobile .hover-text {
        font-size: 0.8rem;
        line-height: 1.65;
        max-height: 80%;
        overflow-y: auto;
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
    }
    
    .bento-card.expanded-mobile .hover-text {
        font-size: 0.72rem;
        line-height: 1.7;
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