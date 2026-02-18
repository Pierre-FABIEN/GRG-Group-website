<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import { scale } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages.js';

	const bentoItems = [
		{ 
			id: 1, 
			title: m.about_item1_title(),
			subtitle: m.about_item1_subtitle(),
			hoverText: m.about_item1_hoverText(),
			cardClass: 'card-1', 
			row: 'top',
			extraTall: true
		},
		{ 
			id: 2, 
			title: m.about_item2_title(),
			subtitle: m.about_item2_subtitle(),
			hoverText: m.about_item2_hoverText(),
			cardClass: 'card-2', 
			row: 'top'
		},
		{ 
			id: 3, 
			title: m.about_item3_title(),
			subtitle: m.about_item3_subtitle(),
			hoverText: m.about_item3_hoverText(),
			cardClass: 'card-3', 
			row: 'bottom'
		},
		{ 
			id: 4, 
			title: m.about_item4_title(),
			subtitle: m.about_item4_subtitle(),
			hoverText: m.about_item4_hoverText(),
			cardClass: 'card-4', 
			row: 'bottom'
		},
		{ 
			id: 5, 
			title: m.about_item5_title(),
			subtitle: m.about_item5_subtitle(),
			hoverText: m.about_item5_hoverText(),
			cardClass: 'card-5', 
			row: 'bottom',
			needsMargin: true
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

	function getSubtitleParts(item: any): any {
		if (item.id === 2) {
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
	GRG Groupe : À propos
</h1>

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
						{#if item.id === 2}
							<h3 class="card-title">
								<span class="highlight-full">{item.title}</span>
							</h3>
							<p class="card-subtitle">
								{#each getSubtitleParts(item) as part}
									{#if typeof part === 'object' && part.type === 'highlight'}
										<span class="highlight-word">{part.text}</span>
									{:else}
										{part}
									{/if}
								{/each}
							</p>
						{:else}
							<h3 class="card-title">
								<span class="highlight-full">{item.title}</span>
							</h3>
							<p class="card-subtitle">{item.subtitle}</p>
						{/if}
					</div>
					<div class="card-hover-content" class:show={hoveredCard === item.id}>
						<div class="hover-text {item.id === 2 ? 'multiline' : ''}">
							{#if item.id === 2}
								{#each item.hoverText.split('\n') as line, index}
									{#if line.trim()}
										<span>{line}</span>
										{#if index < item.hoverText.split('\n').length - 1}
											<br />
										{/if}
									{/if}
								{/each}
							{:else}
								{@html item.hoverText}
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
						<h3 class="card-title">
							<span class="highlight-full">{item.title}</span>
						</h3>
						<p class="card-subtitle">{item.subtitle}</p>
					</div>
					<div class="card-hover-content" class:show={hoveredCard === item.id}>
						<div class="hover-text {item.id === 4 || item.id === 5 ? 'multiline' : ''}">
							{#if item.id === 4 || item.id === 5}
								{#each item.hoverText.split('\n') as line, index}
									{#if line.trim()}
										<span>{line}</span>
										{#if index < item.hoverText.split('\n').length - 1}
											<br />
										{/if}
									{/if}
								{/each}
							{:else}
								{@html item.hoverText}
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
    text-transform: uppercase;
    margin: 0;
    opacity: 0.85;
    line-height: 1.4;
    transition: font-size 0.3s ease, opacity 0.3s ease;
}

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
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
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
    text-align: center;
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
    background: linear-gradient(135deg, var(--contrast-light-1, #e5e5e5) 0%, var(--contrast-light-2, #d4d4d4) 100%);
}

.card-2 {
    background: url('/image/bouteilles.jpg') center/cover no-repeat;
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
    background: linear-gradient(135deg, var(--contrast-dark-1, #404040) 0%, var(--contrast-dark-2, #525252) 100%); 
}

:global(.dark) .card-2 {
    background: url('/image/bouteilles.jpg') center/cover no-repeat;
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

.card-2 .card-content {
    position: relative;
    z-index: 2;
}

.card-2 .card-content::before {
    content: '';
    position: absolute;
    inset: -2.5rem -2.5rem;
    background: rgba(255, 255, 255, 0.35);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 1.75rem;
    z-index: -1;
}

:global(.dark) .card-2 .card-content::before {
    background: rgba(0, 0, 0, 0.45);
}

@media (max-width: 1024px) {
     .card-2 .card-content::before {
        inset: -1.5rem -1.5rem;
    }
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
    }

     .bento-card .card-5 {
        margin-bottom: 6rem;
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

    .bento-card.expanded-mobile {
        height: 50vh;
        z-index: 100;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
        transform: scale(1.02);
    }

    .card-content {
        text-align: center;
        align-items: center;
        padding: 1rem;
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

    .card-hover-content {
        width: 95%;
        max-width: 500px;
        padding: 1.5rem;
    }

    .hover-text {
        font-size: 1.3rem;
        line-height: 1.6;
    }

}

@media (max-width: 768px) {
    .card-title {
        font-size: clamp(1.7rem, 4.3vw, 2.3rem);
    }

    .card-subtitle {
        font-size: clamp(1.15rem, 3.1vw, 1.55rem);
    }

    .hover-text {
        font-size: 1.2rem;
        line-height: 1.6;
    }

}

@media (max-width: 480px) {
    .card-title {
        font-size: clamp(1.5rem, 4vw, 2rem);
    }

    .card-subtitle {
        font-size: clamp(1.05rem, 2.8vw, 1.45rem);
    }

    .hover-text {
        font-size: 1.1rem;
        line-height: 1.5;
    }
}

@media (max-width: 360px) {
    .card-title {
        font-size: clamp(1.3rem, 3.8vw, 1.8rem);
    }

    .card-subtitle {
        font-size: clamp(0.95rem, 2.6vw, 1.3rem);
    }

    .hover-text {
        font-size: 1rem;
        line-height: 1.5;
    }
}
</style>