<script lang="ts">
    import '@fontsource-variable/open-sans';
    import '@fontsource-variable/raleway';
    import { scale } from 'svelte/transition';
    import { m } from '$lib/paraglide/messages.js';
    const highlightImg = '/highlight.png';

    const bentoItems = [
        { 
            id: 1, 
            title: m.products_item1_title(),
            subtitle: m.products_item1_subtitle(),
            hoverText: m.products_item1_hoverText(),
            icon: m.products_item1_icon(),
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

    function handleLinkClick(event: MouseEvent, itemId: number) {
        event.stopPropagation();
        event.preventDefault();
        
        // URL unique pour chaque produit
        const productLinks = {
            1: 'https://www.europages.fr/GRG-GROUPE-BOISSONS-ENERGISANTES-PERSONNALISEES-LABEL-PRIVE/00000005551463-001.html#solutions-groupement',
            2: 'https://www.europages.fr/GRG-GROUPE-BOISSONS-ENERGISANTES-PERSONNALISEES-LABEL-PRIVE/00000005551463-001.html#boissons',
            3: 'https://www.europages.fr/GRG-GROUPE-BOISSONS-ENERGISANTES-PERSONNALISEES-LABEL-PRIVE/00000005551463-001.html#nutraceutique',
            4: 'https://www.europages.fr/GRG-GROUPE-BOISSONS-ENERGISANTES-PERSONNALISEES-LABEL-PRIVE/00000005551463-001.html#gummies',
            5: 'https://www.europages.fr/GRG-GROUPE-BOISSONS-ENERGISANTES-PERSONNALISEES-LABEL-PRIVE/00000005551463-001.html#tablettes-effervescentes'
        };
        
        const url = productLinks[itemId as keyof typeof productLinks] || 'https://www.europages.fr/GRG-GROUPE-BOISSONS-ENERGISANTES-PERSONNALISEES-LABEL-PRIVE/00000005551463-001.html';
        window.open(url, '_blank');
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
                    <!-- Inversion pour la carte 1 -->
                    {#if item.id === 1}
                        <p class="card-subtitle card-1-subtitle">{item.subtitle}</p>
                        <h3 class="card-title card-1-title">{item.title}</h3>
                    {:else}
                        <h3 class="card-title">{item.title}</h3>
                        <p class="card-subtitle">{item.subtitle}</p>
                    {/if}
                </div>
                <div class="card-hover-content" class:show={hoveredCard === item.id}>
                    <p class="hover-text">{item.hoverText}</p>
                    <!-- Lien "Découvrir nos produits" -->
                    <a 
                        href="https://www.europages.fr/GRG-GROUPE-BOISSONS-ENERGISANTES-PERSONNALISEES-LABEL-PRIVE/00000005551463-001.html" 
                        class="discover-link"
                        onclick={(e) => handleLinkClick(e, item.id)}
                        aria-label="Découvrir nos produits {item.title}"
                    >
                        Découvrir nos produits
                    </a>
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
                    <!-- Inversion pour la carte 4 -->
                    {#if item.id === 4}
                        <p class="card-subtitle card-4-subtitle">{item.subtitle}</p>
                        <h3 class="card-title card-4-title">{item.title}</h3>
                    {:else}
                        <h3 class="card-title">{item.title}</h3>
                        <p class="card-subtitle">{item.subtitle}</p>
                    {/if}
                </div>
                <div class="card-hover-content" class:show={hoveredCard === item.id}>
                    <p class="hover-text">{item.hoverText}</p>
                    <!-- Lien "Découvrir nos produits" -->
                    <a 
                        href="https://www.europages.fr/GRG-GROUPE-BOISSONS-ENERGISANTES-PERSONNALISEES-LABEL-PRIVE/00000005551463-001.html" 
                        class="discover-link"
                        onclick={(e) => handleLinkClick(e, item.id)}
                        aria-label="Découvrir nos produits {item.title}"
                    >
                        Découvrir nos produits
                    </a>
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
        flex: 1 1 0;
        min-width: 0;
        max-width: 100%;
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

    /* Cartes avec image de fond (1, 2) */
    .card-1 .card-icon,
    .card-2 .card-icon {
        filter: brightness(0) invert(1);
    }

    /* Cartes sans image (3, 4, 5) */
    .card-3 .card-icon,
    .card-4 .card-icon,
    .card-5 .card-icon {
        filter: brightness(0);
    }

    :global(.dark) .card-3 .card-icon,
    :global(.dark) .card-4 .card-icon,
    :global(.dark) .card-5 .card-icon {
        filter: brightness(0) invert(1);
    }

    /* Style normal pour les cartes */
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

    /* Styles spécifiques pour la carte 1 - INVERSE */
    .card-1-title {
        /* Style du TITRE de la carte 1 avec le style normal d'un sous-titre */
        font-size: 1.25rem !important;
        font-weight: 600 !important;
        text-transform: uppercase !important;
        margin: 0.75rem 0 0 !important;
        opacity: 0.85 !important;
        line-height: 1.4 !important;
        position: static !important;
        display: block !important;
    }

    .card-1-title::before {
        display: none !important;
    }

    .card-1-subtitle {
        /* Style du SOUS-TITRE de la carte 1 avec le style normal d'un titre */
        font-size: 2rem !important;
        font-weight: 800 !important;
        text-transform: uppercase !important;
        margin: 0 0 0.75rem !important;
        line-height: 1.2 !important;
        position: relative !important;
        display: inline-block !important;
        opacity: 1 !important;
    }

    .card-1-subtitle::before {
        content: "" !important;
        position: absolute !important;
        left: 0 !important;
        bottom: -4px !important;
        width: 100% !important;
        height: 80% !important;
        background: url({highlightImg}) center/contain no-repeat !important;
        z-index: -1 !important;
        pointer-events: none !important;
        opacity: 0.9 !important;
    }

    /* Styles spécifiques pour la carte 4 - INVERSE */
    .card-4-title {
        /* Style du TITRE de la carte 4 avec le style normal d'un sous-titre */
        font-size: 1.25rem !important;
        font-weight: 600 !important;
        text-transform: uppercase !important;
        margin: 0.75rem 0 0 !important;
        opacity: 0.85 !important;
        line-height: 1.4 !important;
        position: static !important;
        display: block !important;
    }

    .card-4-title::before {
        display: none !important;
    }

    .card-4-subtitle {
        /* Style du SOUS-TITRE de la carte 4 avec le style normal d'un titre */
        font-size: 2rem !important;
        font-weight: 800 !important;
        text-transform: uppercase !important;
        margin: 0 0 0.75rem !important;
        line-height: 1.2 !important;
        position: relative !important;
        display: inline-block !important;
        opacity: 1 !important;
    }

    .card-4-subtitle::before {
        content: "" !important;
        position: absolute !important;
        left: 0 !important;
        bottom: -4px !important;
        width: 100% !important;
        height: 80% !important;
        background: url({highlightImg}) center/contain no-repeat !important;
        z-index: -1 !important;
        pointer-events: none !important;
        opacity: 0.9 !important;
    }

    /* Couleurs pour les cartes avec image (1, 2) */
    .card-1 .card-title,
    .card-1 .card-subtitle,
    .card-2 .card-title,
    .card-2 .card-subtitle {
        color: var(--gray-100, #f5f5f5);
    }

    /* Couleurs pour les cartes sans image (3, 4, 5) */
    .card-3 .card-title,
    .card-3 .card-subtitle,
    .card-4 .card-title,
    .card-4 .card-subtitle,
    .card-5 .card-title,
    .card-5 .card-subtitle {
        color: var(--gray-900, #171717);
    }

    :global(.dark) .card-3 .card-title,
    :global(.dark) .card-3 .card-subtitle,
    :global(.dark) .card-4 .card-title,
    :global(.dark) .card-4 .card-subtitle,
    :global(.dark) .card-5 .card-title,
    :global(.dark) .card-5 .card-subtitle {
        color: var(--gray-100, #f5f5f5);
    }

    /* Arrière-plans */
    .card-1 {
        background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('/ligne_production.png') center/cover no-repeat;
    }

    .card-2 {
        background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('/mixed-fruits.jpg') center/cover no-repeat;
    }

    /* Nouvel arrière-plan pour la carte 3 (sans image) */
    .card-3 { 
        background: linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%);
    }

    .card-4 { 
        background: linear-gradient(135deg, #e5e5e5 0%, #d4d4d4 100%);
    }

    .card-5 { 
        background: linear-gradient(135deg, #d4d4d4 0%, #a3a3a3 100%);
    }

    /* Dark mode pour les cartes sans image */
    :global(.dark) .card-3 { 
        background: linear-gradient(135deg, #262626 0%, #404040 100%);
    }

    :global(.dark) .card-4 { 
        background: linear-gradient(135deg, #404040 0%, #525252 100%);
    }

    :global(.dark) .card-5 { 
        background: linear-gradient(135deg, #525252 0%, #737373 100%);
    }

    /* Overlay uniquement pour les cartes avec image (1, 2) */
    .card-1::before,
    .card-2::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 1.75rem;
        z-index: 1;
        transition: background 0.3s ease;
    }

    .card-1:hover::before,
    .card-2:hover::before {
        background: rgba(0, 0, 0, 0.4);
    }

    /* Pas d'overlay pour les cartes sans image (3, 4, 5) */
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

    /* Texte de survol pour toutes les cartes */
    .hover-text {
        color: var(--gray-100, #f5f5f5);
        font-size: 1.1rem;
        line-height: 1.6;
        font-weight: 500;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        margin-bottom: 1rem;
    }

    /* Lien "Découvrir nos produits" */
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
    }

    .discover-link:hover {
        background: rgba(255, 255, 255, 0.2);
        color: var(--gray-50, #fafafa);
        border-color: var(--gray-50, #fafafa);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    /* Overlay pour le contenu au survol */
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
        }

        .bento-card.hovered {
            height: 280px;
        }

        .card-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        .card-title { font-size: 1.6rem; }
        .card-subtitle { font-size: 1.05rem; }
        
        /* Styles responsive pour la carte 1 */
        .card-1-title { font-size: 1.05rem !important; }
        .card-1-subtitle { font-size: 1.6rem !important; }
        
        /* Styles responsive pour la carte 4 */
        .card-4-title { font-size: 1.05rem !important; }
        .card-4-subtitle { font-size: 1.6rem !important; }
        
        .hover-text { 
            font-size: 0.95rem; 
            line-height: 1.5;
            margin-bottom: 0.75rem;
        }
        
        .discover-link {
            font-size: 0.9rem;
            padding: 0.6rem 1.2rem;
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
        .bento-card.hovered { height: 260px; }
        .card-icon { font-size: 2.25rem; }
        .card-title { font-size: 1.5rem; }
        .card-subtitle { font-size: 1rem; }
        
        /* Styles responsive pour la carte 1 */
        .card-1-title { font-size: 1rem !important; }
        .card-1-subtitle { font-size: 1.5rem !important; }
        
        /* Styles responsive pour la carte 4 */
        .card-4-title { font-size: 1rem !important; }
        .card-4-subtitle { font-size: 1.5rem !important; }
        
        .hover-text { 
            font-size: 0.9rem; 
            line-height: 1.5;
            margin-bottom: 0.7rem;
        }
        
        .discover-link {
            font-size: 0.85rem;
            padding: 0.5rem 1rem;
        }
    }

    @media (max-width: 480px) {
        .page-wrapper { padding: 0.875rem; }
        .bento-row { gap: 0.75rem; }
        .bento-card {
            padding: 1.5rem;
            height: 160px;
            border-radius: 1.25rem;
        }
        .bento-card.hovered { height: 240px; }
        .card-icon { font-size: 2rem; }
        .card-title { font-size: 1.35rem; }
        .card-subtitle { font-size: 0.95rem; }
        
        /* Styles responsive pour la carte 1 */
        .card-1-title { font-size: 0.95rem !important; }
        .card-1-subtitle { font-size: 1.35rem !important; }
        
        /* Styles responsive pour la carte 4 */
        .card-4-title { font-size: 0.95rem !important; }
        .card-4-subtitle { font-size: 1.35rem !important; }
        
        .hover-text { 
            font-size: 0.85rem; 
            line-height: 1.45;
            margin-bottom: 0.6rem;
        }
        
        .discover-link {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
        }
    }
</style>