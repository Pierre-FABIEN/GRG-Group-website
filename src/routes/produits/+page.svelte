<script lang="ts">
    import '@fontsource-variable/open-sans';
    import '@fontsource-variable/raleway';
    import { scale } from 'svelte/transition';
    import { m } from '$lib/paraglide/messages.js';

    const bentoItems = [
        { 
            id: 1, 
            title: '',
            subtitle: m.products_item1_subtitle(),
            image: '/image/aluminium.png',
            hoverText: m.products_item5_hoverText(),
            icon: '',
            cardClass: 'card-1', 
            row: 'top' 
        },

        { 
            id: 2, 
            title: m.products_item2_title(),
            subtitle: m.products_item2_subtitle(),
            hoverText: m.products_item2_hoverText(),
            icon: m.products_item2_icon(),
            cardClass: 'card-2', 
            row: 'top' 
        },
        { 
            id: 3, 
            title: m.products_item3_title(),
            subtitle: m.products_item3_subtitle(),
            hoverText: m.products_item3_hoverText(),
            icon: m.products_item3_icon(),
            cardClass: 'card-3', 
            row: 'bottom' 
        },
        { 
            id: 4, 
            title: m.products_item4_title(),
            subtitle: m.products_item4_subtitle(),
            hoverText: m.products_item4_hoverText(),
            icon: m.products_item4_icon(),
            cardClass: 'card-4', 
            row: 'bottom' 
        },
        { 
            id: 5, 
            title: m.products_item5_title(),
            subtitle: m.products_item5_subtitle(),
            hoverText: m.products_item5_hoverText(),
            icon: m.products_item5_icon(),
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

    function handleLinkClick(event: MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
        window.open('https://bit.ly/GRG-Group-FnB', '_blank');
    }
</script>

<h1 style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap;">
  GRG Groupe : Food and Beverages
</h1>

<h2 style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap;">
  Marque blanche de boissons et compléments alimentaires
</h2>

<h2 style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap;">
  Création, production et personnalisation de boissons fonctionnelles
</h2>

<div class="page-wrapper">

    <!-- LIGNE DU HAUT -->
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
                style="flex: {hoveredCard === item.id ? (item.double ? '3 1 0' : '2 1 0') : (item.double ? '2 1 0' : '1 1 0')}"
            >
                <div class="card-content" class:hide-content={hoveredCard === item.id}>

                    {#if item.id === 1}
                        <!-- CARD 1 — LOGO + SUBTITLE AVEC HIGHLIGHT PNG -->
                        <img class="card-title-image" src={item.image} alt="logo" />
                        
                        <p class="card-subtitle bpani-subtitle">
                            Fournisseur de canettes 
                            <span class="bpani-word">BPANI</span>
                        </p>

                    {:else if item.image}
                        <!-- CARTE AVEC IMAGE ET SOUS-TITRE SIMPLE -->
                        <img class="card-title-image" src={item.image} alt={item.title} />
                        <p class="card-subtitle">
                            {@html item.subtitle.replace('BPANI', '<span class="highlight">BPANI</span>')}
                        </p>

                    {:else}
                        <!-- CARTE NORMALE (2–5) -->
                        <div class="card-icon">{item.icon}</div>
                        <h3 class="card-title">{item.title}</h3>
                        <p class="card-subtitle">{item.subtitle}</p>
                    {/if}

                </div>

                <div class="card-hover-content" class:show={hoveredCard === item.id}>
                    {#if item.id === 1 || item.id === 2 || item.id === 3}
                        <p class="hover-text">
                            {@html item.hoverText}
                            <br><br>
                            <a href="https://bit.ly/GRG-Group-FnB"
                               class="hover-link"
                               onclick={handleLinkClick}
                               target="_blank"
                               rel="noopener noreferrer">
                                📱 Découvrir nos produits
                            </a>
                        </p>
                    {:else}
                        <p class="hover-text">{item.hoverText}</p>
                    {/if}
                </div>

                <div class="card-overlay" class:show={hoveredCard === item.id}></div>
            </div>
        {/each}
    </div>

    <!-- LIGNE DU BAS -->
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
                style="flex: {hoveredCard === item.id ? '2 1 0' : '1 1 0'}"
            >
                <div class="card-content" class:hide-content={hoveredCard === item.id}>
                    <div class="card-icon">{item.icon}</div>
                    <h3 class="card-title">{item.title}</h3>
                    <p class="card-subtitle">{item.subtitle}</p>
                </div>

                <div class="card-hover-content" class:show={hoveredCard === item.id}>
                    {#if item.id === 1 || item.id === 2 || item.id === 3}
                        <p class="hover-text">
                            {@html item.hoverText}
                            <br><br>
                            <a href="https://bit.ly/GRG-Group-FnB"
                               class="hover-link"
                               onclick={handleLinkClick}
                               target="_blank"
                               rel="noopener noreferrer">
                                📱 Découvrir nos produits
                            </a>
                        </p>
                    {:else}
                        <p class="hover-text">{item.hoverText}</p>
                    {/if}
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

.bento-card.double { flex: 2 1 0; }
.bento-card.double.hovered { flex: 3 1 0; }

.bento-card.hovered { flex: 2 1 0; }
.bento-card.same-row { flex: 1 1 0; opacity: 0.8; }

/* === TEXTE ET CONTENU CARTE === */
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

/* ICÔNES - CONTRASTE OPTIMISÉ */
.card-icon { 
	font-size: 3.5rem; 
	margin-bottom: 1.25rem;
	transition: all 0.3s ease;
}

/* Cartes 1, 2, 3 - TOUJOURS icônes blanches */
.card-1 .card-icon,
.card-2 .card-icon,
.card-3 .card-icon {
    filter: brightness(0) invert(1) !important;
}

:global(.dark) .card-1 .card-icon,
:global(.dark) .card-2 .card-icon,
:global(.dark) .card-3 .card-icon {
    filter: brightness(0) invert(1) !important;
}

/* Cartes 4, 5 - Icônes qui s'adaptent au contraste */
.card-4 .card-icon,
.card-5 .card-icon {
	filter: brightness(0); /* Icône noire en mode clair */
}

:global(.dark) .card-4 .card-icon,
:global(.dark) .card-5 .card-icon {
	filter: brightness(0) invert(1); /* Icône blanche en mode sombre */
}

/* Hover effect */
.bento-card:hover .card-icon {
	transform: scale(1.05);
}

/* TITRES ET SOUS-TITRES - CONTRASTE OPTIMISÉ */
.card-title {
	font-size: 2rem;
	font-weight: 800;
	margin: 0 0 0.5rem;
	line-height: 1.2;
}

.card-1 .card-title { 
	font-size: 2.5rem; 
	font-weight: 800; 
}

.card-subtitle {
	font-size: 1.25rem;
	font-weight: 500;
	margin: 0;
	opacity: 0.85;
	line-height: 1.5;
}

/* Cartes 1, 2, 3 - TOUJOURS texte blanc */
.card-1 .card-title,
.card-1 .card-subtitle,
.card-2 .card-title,
.card-2 .card-subtitle,
.card-3 .card-title,
.card-3 .card-subtitle {
    color: var(--gray-100, #f5f5f5) !important;
}

/* Cartes 4, 5 - Texte qui s'adapte au contraste */
.card-4 .card-title,
.card-4 .card-subtitle,
.card-5 .card-title,
.card-5 .card-subtitle {
	color: var(--gray-900, #171717); /* Texte noir en mode clair */
}

:global(.dark) .card-4 .card-title,
:global(.dark) .card-4 .card-subtitle,
:global(.dark) .card-5 .card-title,
:global(.dark) .card-5 .card-subtitle {
	color: var(--gray-100, #f5f5f5); /* Texte blanc en mode sombre */
}

.card-1 .card-subtitle { 
	font-size: 1.15rem; 
}

/* BACKGROUNDS MONOCHROMES - PLUS TRANSPARENTS */
.card-1 {
	background: 
		linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),
		url('/ligne_production.png') center/cover no-repeat;
	position: relative;
}

.card-2 {
	background: 
		linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),
		url('/mixed-fruits.jpg') center/cover no-repeat;
	position: relative;
}

.card-3 {
	background: 
		linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),
		url('/pils.jpg') center/cover no-repeat;
	position: relative;
}

/* Cartes 4, 5 - Fonds qui s'adaptent au contraste */
.card-4 { 
	background: linear-gradient(135deg, #e5e5e5 0%, #d4d4d4 100%);
}

.card-5 { 
	background: linear-gradient(135deg, #d4d4d4 0%, #a3a3a3 100%);
}

:global(.dark) .card-4 { 
	background: linear-gradient(135deg, #404040 0%, #525252 100%);
}

:global(.dark) .card-5 { 
	background: linear-gradient(135deg, #525252 0%, #737373 100%);
}

/* Overlay amélioré - PLUS TRANSPARENT */
.card-1::before,
.card-2::before,
.card-3::before {
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
.card-3:hover::before {
	background: rgba(0, 0, 0, 0.4);
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
}

.card-1 .hover-text { 
	font-size: 1.25rem; 
	color: var(--gray-50, #fafafa);
	text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

.card-4 .hover-text { 
	font-size: 1.15rem; 
	color: var(--gray-50, #fafafa);
	text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

/* STYLES POUR LES LIENS DANS LE HOVER TEXT */
.hover-link {
	color: var(--gray-300, #d4d4d4);
	font-weight: 600;
	text-decoration: underline;
	transition: all 0.2s ease;
	cursor: pointer;
	display: inline-block;
	margin-top: 0.5rem;
	padding: 0.25rem 0.5rem;
	border-radius: 0.375rem;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(4px);
}

.hover-link:hover {
	color: var(--gray-100, #f5f5f5);
	text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
	background: rgba(255, 255, 255, 0.2);
	transform: scale(1.05);
}

/* OVERLAY */
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

/* === LOGO CARD 1 === */
.card-1 .card-title-image {
    width: 120px;
    max-width: 40%;
    height: auto;
    margin-bottom: 1rem;
    display: block;
}

/* === HIGHLIGHT PNG SOUS "BPANI" - SOLUTION SIMPLE === */
.bpani-subtitle {
    font-size: 1.25rem;
    color: var(--gray-100, #f5f5f5) !important;
    margin-top: 1rem;
    text-align: center;
}

.bpani-word {
    position: relative;
    display: inline-block;
    font-weight: 700;
    padding: 0 5px;
}

/* PNG comme background-image sous le mot BPANI */
.bpani-word::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 70%;
    background: url('/image/highlight.png') center/contain no-repeat;
    z-index: -1;
    opacity: 0.9;
}

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

	.bento-row:last-child {
		margin-bottom: 0;
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

	.card-icon { 
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.card-title { 
		font-size: 1.6rem;
		margin-bottom: 0.5rem;
	}

	.card-1 .card-title {
		font-size: 1.8rem;
	}

	.card-subtitle { 
		font-size: 1.05rem;
	}

	.card-1 .card-subtitle {
		font-size: 1.15rem;
	}

    /* Responsive pour le highlight */
    .bpani-subtitle {
        font-size: 1.1rem;
    }
    
    .bpani-word::after {
        bottom: -2px;
        height: 60%;
    }

	.hover-text { 
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.card-1 .hover-text {
		font-size: 1.05rem;
	}

	.hover-link {
		font-size: 0.9rem;
		padding: 0.2rem 0.4rem;
	}

	.card-hover-content {
		width: 90%;
	}
}

@media (max-width: 768px) {
	.page-wrapper { 
		padding: 1rem;
	}

	.bento-row {
		gap: 0.875rem;
	}

	.bento-card { 
		padding: 1.75rem;
		height: 180px !important;
		border-radius: 1.5rem;
	}

	.bento-card.hovered {
		height: 260px !important;
	}

	.card-icon { 
		font-size: 2.25rem;
		margin-bottom: 0.875rem;
	}

	.card-title { 
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.card-1 .card-title {
		font-size: 1.65rem;
	}

	.card-subtitle { 
		font-size: 1rem;
	}

	.card-1 .card-subtitle {
		font-size: 1.1rem;
	}

    /* Responsive pour le highlight */
    .bpani-subtitle {
        font-size: 1rem;
    }
    
    .bpani-word::after {
        bottom: -1px;
        height: 55%;
    }

	.hover-text { 
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.card-1 .hover-text {
		font-size: 1rem;
	}

	.card-4 .hover-text {
		font-size: 0.95rem;
	}

	.hover-link {
		font-size: 0.85rem;
		padding: 0.15rem 0.3rem;
	}
}

@media (max-width: 480px) {
	.page-wrapper {
		padding: 0.875rem;
	}

	.bento-row {
		gap: 0.75rem;
	}

	.bento-card {
		padding: 1.5rem;
		height: 160px !important;
		border-radius: 1.25rem;
	}

	.bento-card.hovered {
		height: 240px !important;
	}

	.card-icon {
		font-size: 2rem;
		margin-bottom: 0.75rem;
	}

	.card-title {
		font-size: 1.35rem;
		margin-bottom: 0.4rem;
	}

	.card-1 .card-title {
		font-size: 1.5rem;
	}

	.card-subtitle {
		font-size: 0.95rem;
	}

	.card-1 .card-subtitle {
		font-size: 1.05rem;
	}

    /* Responsive pour le highlight */
    .bpani-subtitle {
        font-size: 0.9rem;
    }
    
    .bpani-word::after {
        bottom: 0;
        height: 50%;
    }

	.hover-text {
		font-size: 0.85rem;
		line-height: 1.45;
	}

	.card-1 .hover-text {
		font-size: 0.95rem;
	}

	.card-4 .hover-text {
		font-size: 0.9rem;
	}

	.hover-link {
		font-size: 0.8rem;
		padding: 0.1rem 0.25rem;
		margin-top: 0.25rem;
	}

	.card-hover-content {
		width: 92%;
	}
}

/* Adaptation pour les très petits écrans */
@media (max-width: 360px) {
	.bento-card {
		padding: 1.25rem;
		height: 140px !important;
	}

	.bento-card.hovered {
		height: 220px !important;
	}

	.card-icon {
		font-size: 1.75rem;
	}

	.card-title {
		font-size: 1.2rem;
	}

	.card-subtitle {
		font-size: 0.875rem;
	}

	.hover-text {
		font-size: 0.8rem;
	}

	.hover-link {
		font-size: 0.75rem;
	}
}

.card-title {
  font-size: 2rem;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0 0 0.75rem;
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
  background: url('/image/highlight.png') center/contain no-repeat;
  z-index: -1;
  pointer-events: none;
  opacity: 0.9;
}
</style>