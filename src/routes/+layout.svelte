<script lang="ts">
	// --- IMPORTS INCHANGÉS ---
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import '@fontsource-variable/inter';
	import '../app.css';

	import { initializeLayoutState, setupNavigationEffect, isClient } from './layout.svelte';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import Toaster from '$lib/components/shadcn/ui/sonner/sonner.svelte';
	import SmoothScrollBar from '$lib/components/smoothScrollBar/SmoothScrollBar.svelte';
	import {
		firstLoadComplete,
		setFirstOpen,
		setRessourceToValide
	} from '$lib/store/initialLoaderStore';
	import { page } from '$app/stores';
	import SmoothScrollBarStore from '$lib/store/SmoothScrollBarStore';

	// paraglide
	import { setLocale } from '$lib/paraglide/runtime';
	import { goto } from '$app/navigation';
	import Fr from '$lib/components/flag/Fr.svelte';
	import En from '$lib/components/flag/En.svelte';
	import Es from '$lib/components/flag/Es.svelte';
	import It from '$lib/components/flag/It.svelte';
	import De from '$lib/components/flag/De.svelte';
	
	// --- PROPS & STATE INCHANGÉS ---
	let { children, data } = $props();
	
	$effect(() => {
		const unsubscribe = page.subscribe((currentPage) => {
			initializeLayoutState(currentPage);
		});
		setupNavigationEffect();
		setFirstOpen(true);
		setRessourceToValide(true);
		return unsubscribe;
	});

	let contentRef: HTMLElement | null = $state(null);
	let contentHeight = $state(0);

	$effect(() => {
		if (!contentRef) return;
		const observer = new ResizeObserver(() => {
			if (contentRef) {
				contentHeight = contentRef.clientHeight;
			}
			updateSmoothScroll();
		});
		observer.observe(contentRef);
		return () => observer.disconnect();
	});

	function updateSmoothScroll() {
		let scrollbarInstance;
		SmoothScrollBarStore.update((state) => {
			scrollbarInstance = state.smoothScroll;
			return state;
		});
		if (scrollbarInstance) {
			scrollbarInstance.update();
		}
	}

	// État pour la navigation active
	let currentPath = $state('/');
	$effect(() => {
		currentPath = $page.url.pathname;
	});

	// Gestion du mode sombre
	function handleToggleMode(event: MouseEvent) {
		event.preventDefault();
		toggleMode();
	}

	// État pour la langue active avec persistance
	let currentLanguage = $state<'fr' | 'en' | 'es' | 'it' | 'de'>('fr');

	// Initialiser la langue depuis le localStorage
	$effect(() => {
		if (typeof window !== 'undefined') {
			const savedLanguage = localStorage.getItem('selectedLanguage');
			if (savedLanguage && ['fr', 'en', 'es', 'it', 'de'].includes(savedLanguage)) {
				currentLanguage = savedLanguage as 'fr' | 'en' | 'es' | 'it' | 'de';
				setLocale(savedLanguage);
			}
		}
	});

	// Traductions des éléments de menu
	const translations: Record<string, {home:string, about:string, services:string, products:string, contact:string}> = {
		fr: {
			home: 'Accueil',
			about: 'À propos',
			services: 'Services',
			products: 'Produits',
			contact: 'Contact'
		},
		en: {
			home: 'Home',
			about: 'About',
			services: 'Services',
			products: 'Products',
			contact: 'Contact'
		},
		es: {
			home: 'Inicio',
			about: 'Acerca de',
			services: 'Servicios',
			products: 'Productos',
			contact: 'Contacto'
		},
		it: {
			home: 'Inizio',
			about: 'Chi siamo',
			services: 'Servizi',
			products: 'Prodotti',
			contact: 'Contatto'
		},
		de: {
			home: 'Startseite',
			about: 'Über uns',
			services: 'Dienstleistungen',
			products: 'Produkte',
			contact: 'Kontakt'
		}
	};

	function changeLanguage(lang: 'fr' | 'en' | 'es' | 'it' | 'de') {
		currentLanguage = lang;
		setLocale(lang);
		if (typeof window !== 'undefined') {
			localStorage.setItem('selectedLanguage', lang);
		}
	}

	// État du menu latéral - POUR MOBILE UNIQUEMENT
	let isSidebarOpen = $state(false);

	// État pour le volet de sélection des drapeaux - POUR MOBILE UNIQUEMENT
	let isFlagSelectorOpen = $state(false);
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" />
	<meta name="viewport" content="width=device-width" />
	<link rel="manifest" href="/pwa/manifest.webmanifest" />
	<meta name="theme-color" content="#6366f1" />
</svelte:head>

{#if !$firstLoadComplete}
	<!-- Loader -->
{/if}

{#if $isClient}
	<div class="layout-wrapper">
		<ModeWatcher />

		<!-- Overlay pour fermer le menu - MOBILE SEULEMENT -->
		<div 
			class="sidebar-overlay" 
			class:active={isSidebarOpen || isFlagSelectorOpen}
			on:click={() => { isSidebarOpen = false; isFlagSelectorOpen = false; }}
			role="button"
			tabindex="-1">
		</div>

		<!-- SIDEBAR LATÉRALE -->
		<aside class="sidebar" class:mobile-expanded={isSidebarOpen}>
			<!-- Header avec logo - Desktop: toujours visible, Mobile: visible quand déplié -->
			<div class="sidebar-header">
				<a href="https://bit.ly/GRG-Group-FnB" target="_blank" class="logo-link">
					<img src="/image/path1.svg" alt="Logo" class="logo-image">
				</a>
			</div>
			
			<!-- Navigation - TOUTE LA BARRE EST CLIQUABLE SUR MOBILE -->
			<nav 
				class="sidebar-nav"
				on:click={() => isSidebarOpen = !isSidebarOpen}
				role="button"
				tabindex="0"
				on:keydown={(e) => e.key === 'Enter' && (isSidebarOpen = !isSidebarOpen)}>
				<a 
					href="/" 
					class="nav-link" 
					class:active={currentPath === '/'}
					on:click|stopPropagation={() => isSidebarOpen = false}
					title={translations[currentLanguage].home}
				>
					<span class="nav-icon">🏠</span>
					<span class="nav-text">{translations[currentLanguage].home}</span>
				</a>
				<a 
					href="/propos" 
					class="nav-link" 
					class:active={currentPath === '/propos'}
					on:click|stopPropagation={() => isSidebarOpen = false}
					title={translations[currentLanguage].about}
				>
					<span class="nav-icon">ℹ️</span>
					<span class="nav-text">{translations[currentLanguage].about}</span>
				</a>
				<a 
					href="/services-" 
					class="nav-link" 
					class:active={currentPath === '/services-'}
					on:click|stopPropagation={() => isSidebarOpen = false}
					title={translations[currentLanguage].services}
				>
					<span class="nav-icon">⚙️</span>
					<span class="nav-text">{translations[currentLanguage].services}</span>
				</a>
				<a 
					href="/produits" 
					class="nav-link" 
					class:active={currentPath === '/produits'}
					on:click|stopPropagation={() => isSidebarOpen = false}
					title={translations[currentLanguage].products}
				>
					<span class="nav-icon">📦</span>
					<span class="nav-text">{translations[currentLanguage].products}</span>
				</a>
				<a 
					href="/contact" 
					class="nav-link" 
					class:active={currentPath === '/contact'}
					on:click|stopPropagation={() => isSidebarOpen = false}
					title={translations[currentLanguage].contact}
				>
					<span class="nav-icon">✉️</span>
					<span class="nav-text">{translations[currentLanguage].contact}</span>
				</a>
			</nav>

			<!-- Footer avec thème et langues -->
			<div class="sidebar-footer">
				<button 
					class="theme-toggle" 
					on:click={handleToggleMode} 
					type="button"
					title="Toggle theme">
					<span class="theme-icon-light">☀️</span>
					<span class="theme-icon-dark">🌙</span>
				</button>

				<!-- Sélecteur de langue -->
				<div class="language-selector">
					<!-- Desktop: drapeaux toujours visibles -->
					<div class="desktop-flags">
						<button 
							class="language-button"
							class:active={currentLanguage === 'fr'}
							on:click={() => changeLanguage('fr')}
							type="button"
							title="Français">
							<Fr/>
						</button>

						<button 
							class="language-button"
							class:active={currentLanguage === 'en'}
							on:click={() => changeLanguage('en')}
							type="button"
							title="English">
							<En/>
						</button>

						<button 
							class="language-button"
							class:active={currentLanguage === 'es'}
							on:click={() => changeLanguage('es')}
							type="button"
							title="Español">
							<Es/>
						</button>

						<button 
							class="language-button"
							class:active={currentLanguage === 'it'}
							on:click={() => changeLanguage('it')}
							type="button"
							title="Italiano">
							<It/>
						</button>

						<button 
							class="language-button"
							class:active={currentLanguage === 'de'}
							on:click={() => changeLanguage('de')}
							type="button"
							title="Deutsch">
							<De/>
						</button>
					</div>

					<!-- Mobile: bouton engrenage -->
					<button 
						class="gear-toggle" 
						on:click|stopPropagation={() => { 
							isFlagSelectorOpen = !isFlagSelectorOpen; 
							if (isSidebarOpen) {
								isSidebarOpen = false;
							}
						}}
						type="button"
						title="Select language">
						<span class="gear-icon">⚙️</span>
					</button>
				</div>
			</div>
		</aside>

		<!-- Volet de sélection des drapeaux - MOBILE SEULEMENT -->
		{#if isFlagSelectorOpen}
			<div class="flag-selector-wrapper" on:click|stopPropagation>
				<div class="flag-selector-panel">
					<button 
						class="flag-button"
						class:active={currentLanguage === 'fr'}
						on:click|stopPropagation={() => { changeLanguage('fr'); isFlagSelectorOpen = false; }}
						type="button"
						title="Français">
						<Fr/>
					</button>

					<button 
						class="flag-button"
						class:active={currentLanguage === 'en'}
						on:click|stopPropagation={() => { changeLanguage('en'); isFlagSelectorOpen = false; }}
						type="button"
						title="English">
						<En/>
					</button>

					<button 
						class="flag-button"
						class:active={currentLanguage === 'es'}
						on:click|stopPropagation={() => { changeLanguage('es'); isFlagSelectorOpen = false; }}
						type="button"
						title="Español">
						<Es/>
					</button>

					<button 
						class="flag-button"
						class:active={currentLanguage === 'it'}
						on:click|stopPropagation={() => { changeLanguage('it'); isFlagSelectorOpen = false; }}
						type="button"
						title="Italiano">
						<It/>
					</button>

					<button 
						class="flag-button"
						class:active={currentLanguage === 'de'}
						on:click|stopPropagation={() => { changeLanguage('de'); isFlagSelectorOpen = false; }}
						type="button"
						title="Deutsch">
						<De/>
					</button>
				</div>
			</div>
		{/if}

		<!-- CONTENU PRINCIPAL -->
		<div class="container">
			<div class="wrapperScroll">
				<SmoothScrollBar>
					<main class="mainLayout">
						<div class="content" bind:this={contentRef}>
							{@render children()}
						</div>
					</main>
				</SmoothScrollBar>
			</div>
		</div>

		<Toaster />
	</div>
{/if}

<style lang="scss">
:root {
  --gray-50: #fafafa;
  --gray-100: #f5f5f5;
  --gray-200: #e5e5e5;
  --gray-300: #d4d4d4;
  --gray-400: #a3a3a3;
  --gray-500: #737373;
  --gray-600: #525252;
  --gray-700: #404040;
  --gray-800: #262626;
  --gray-900: #171717;
  
  --sidebar-width: 280px; /* Largeur fixe pour desktop */
  --sidebar-width-collapsed: 70px; /* Largeur repliée mobile */
  --sidebar-width-expanded: 280px; /* Augmenté pour accommoder le logo */
}

/* === STYLES DE BASE === */
.layout-wrapper {
	display: flex;
	width: 100vw;
	height: 100vh;
	height: 100dvh;
	overflow: hidden;
	background: var(--gray-50, #fafafa);
	font-family: 'inter', sans-serif;
	position: fixed;
	top: 0;
	left: 0;
}

:global(.dark) .layout-wrapper {
	background: var(--gray-900, #171717);
}

/* === OVERLAY - MOBILE SEULEMENT === */
.sidebar-overlay {
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 998;
	backdrop-filter: blur(2px);
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.3s ease;
}

.sidebar-overlay.active {
	display: block;
	opacity: 1;
	pointer-events: auto;
}

/* === SIDEBAR - VERSION DESKTOP PAR DÉFAUT === */
.sidebar {
	width: var(--sidebar-width);
	min-width: var(--sidebar-width);
	height: 100vh;
	height: 100dvh;
	background: #ffffff;
	border-right: 1px solid var(--gray-200, #e5e5e5);
	display: flex;
	flex-direction: column;
	padding: 2rem 0;
	z-index: 999;
	position: fixed;
	left: 0;
	top: 0;
	overflow: hidden;
}

:global(.dark) .sidebar {
	background: var(--gray-800, #262626);
	border-right: 1px solid var(--gray-700, #404040);
}

/* Header avec logo - DESKTOP (LOGO CENTRÉ HORIZONTALEMENT) */
.sidebar-header {
	padding: 0 1.5rem 2rem;
	display: flex;
	align-items: center;
	justify-content: center; /* CENTRÉ HORIZONTALEMENT */
	flex-shrink: 0;
}

.logo-link {
	display: block;
	width: 100%;
	text-align: center; /* CENTRÉ HORIZONTALEMENT */
}

.logo-image {
	width: auto; /* Largeur automatique */
	height: auto;
	max-width: 180px;
	max-height: 200px; /* Limite la hauteur */
	margin: 0 auto; /* CENTRÉ HORIZONTALEMENT */
	filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
	object-fit: contain; /* Préserve les proportions sans crop */
}

:global(.dark) .logo-image {
	filter: brightness(1.2) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

/* Navigation - DESKTOP (LIENS CENTRÉS VERTICALEMENT DANS L'ESPACE DISPONIBLE) */
.sidebar-nav {
	display: flex;
	flex-direction: column;
	align-items: center; /* Centre horizontalement */
	justify-content: center; /* CENTRÉ VERTICALEMENT DANS L'ESPACE DISPONIBLE */
	gap: 1rem; /* Plus d'espace entre les liens */
	flex: 1; /* Prend tout l'espace disponible entre header et footer */
	padding: 0 1.5rem;
	overflow-y: auto;
	overflow-x: hidden;
}

.nav-link {
	display: flex;
	align-items: center;
	justify-content: center; /* Centre horizontalement */
	text-decoration: none;
	color: var(--gray-600, #525252);
	font-weight: 600;
	font-size: 1.1rem; /* Texte légèrement plus grand */
	padding: 1rem 1.5rem; /* Plus de padding */
	border-radius: 12px;
	transition: all 0.3s ease;
	white-space: nowrap;
	min-height: 50px; /* Un peu plus haut */
	width: 100%; /* Prend toute la largeur disponible */
	max-width: 200px; /* Mais ne dépasse pas cette largeur */
	text-align: center; /* Texte centré */
}

:global(.dark) .nav-link {
	color: var(--gray-400, #a3a3a3);
}

.nav-link:hover {
	background: var(--gray-100, #f5f5f5);
	color: var(--gray-800, #262626);
}

:global(.dark) .nav-link:hover {
	background: var(--gray-700, #404040);
	color: var(--gray-100, #f5f5f5);
}

.nav-link.active {
	background: var(--gray-800, #262626);
	color: white;
}

:global(.dark) .nav-link.active {
	background: var(--gray-600, #525252);
	color: white;
}

/* Icônes - CACHÉES SUR DESKTOP */
.nav-icon {
	display: none;
}

.nav-text {
	width: auto;
}

/* Footer - DESKTOP */
.sidebar-footer {
	padding: 1.5rem 1.5rem 1rem;
	border-top: 1px solid var(--gray-200, #e5e5e5);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	flex-shrink: 0; /* Ne se réduit pas */
	margin-top: auto; /* Pousse vers le bas */
}

:global(.dark) .sidebar-footer {
	border-top: 1px solid var(--gray-700, #404040);
}

.theme-toggle {
	background: var(--gray-100, #f5f5f5);
	border: none;
	width: 44px;
	height: 44px;
	border-radius: 50%;
	font-size: 1.3rem;
	cursor: pointer;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
}

:global(.dark) .theme-toggle {
	background: var(--gray-700, #404040);
}

.theme-toggle:hover {
	background: var(--gray-300, #d4d4d4);
	transform: rotate(180deg) scale(1.1);
}

:global(.dark) .theme-toggle:hover {
	background: var(--gray-600, #525252);
}

.theme-icon-light {
	display: block;
}

.theme-icon-dark {
	display: none;
}

:global(.dark) .theme-icon-light {
	display: none;
}

:global(.dark) .theme-icon-dark {
	display: block;
}

/* Sélecteur de langue - DESKTOP (drapeaux inline) */
.language-selector {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.75rem;
	width: 100%;
}

.desktop-flags {
	display: flex;
	gap: 0.5rem;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
}

.language-button {
	padding: 0;
	border: none;
	background: transparent;
	cursor: pointer;
	transition: all 0.25s ease;
	border-radius: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 34px;
	height: 34px;
	opacity: 0.7;
}

.language-button:hover {
	opacity: 1;
	transform: scale(1.1);
}

.language-button.active {
	opacity: 1;
	background: var(--gray-200, #e5e5e5);
}

:global(.dark) .language-button.active {
	background: var(--gray-700, #404040);
}

/* Bouton engrenage - CACHÉ SUR DESKTOP */
.gear-toggle {
	display: none;
}

/* === CONTAINER PRINCIPAL - DESKTOP === */
.container {
	position: fixed;
	left: var(--sidebar-width);
	top: 0;
	width: calc(100vw - var(--sidebar-width));
	height: 100vh;
	height: 100dvh;
	overflow: hidden;
}

.wrapperScroll {
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: absolute;
	top: 0;
	left: 0;
}

.mainLayout {
	width: 100%;
	max-width: 100%;
	height: 100%;
	overflow: hidden;
}

.content {
	width: 100%;
	min-height: 100vh;
	min-height: 100dvh;
	overflow: hidden;
	background: var(--gray-50, #fafafa);
}

:global(.dark) .content {
	background: var(--gray-900, #171717);
}

/* ============================================ */
/* VERSION MOBILE (max-width: 768px) */
/* ============================================ */
@media (max-width: 768px) {
	/* SIDEBAR MOBILE - REPLIABLE */
	.sidebar {
		width: var(--sidebar-width-collapsed);
		min-width: var(--sidebar-width-collapsed);
		padding: 1rem 0;
		transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		flex-direction: column;
	}
	
	.sidebar.mobile-expanded {
		width: var(--sidebar-width-expanded);
		box-shadow: 4px 0 20px rgba(0, 0, 0, 0.2);
		z-index: 1000;
	}
	
	/* Header mobile - visible seulement quand déplié, logo centré et ajusté */
	.sidebar-header {
		padding: 1rem 0.75rem;
		margin: 0 0.5rem 1rem;
		border-bottom: 1px solid var(--gray-200, #e5e5e5);
		min-height: 80px; /* Augmenté pour accommoder le logo */
		display: flex;
		align-items: center;
		justify-content: center; /* CENTRÉ HORIZONTALEMENT */
		flex-shrink: 0;
	}
	
	:global(.dark) .sidebar-header {
		border-bottom: 1px solid var(--gray-700, #404040);
	}
	
	.logo-link {
		opacity: 0;
		max-height: 0;
		overflow: hidden;
		transition: opacity 0.3s ease, max-height 0.3s ease;
		text-align: center; /* CENTRÉ HORIZONTALEMENT */
		width: 100%;
	}
	
	.sidebar.mobile-expanded .logo-link {
		opacity: 1;
		max-height: 120px; /* Augmenté pour accommoder le logo */
	}
	
	.logo-image {
		max-width: 200px; /* Augmenté pour mobile */
		max-height: 100px; /* Augmenté pour mobile */
		margin: 0 auto; /* CENTRÉ HORIZONTALEMENT */
		width: 100%;
		height: auto;
		object-fit: contain; /* Préserve les proportions sans crop */
	}
	
	/* Navigation mobile - CENTRÉE VERTICALEMENT DANS L'ESPACE RESTANT */
	.sidebar-nav {
		padding: 0 0.75rem;
		gap: 0.5rem;
		cursor: pointer; /* Curseur pointer pour indiquer que c'est cliquable */
		flex: 1; /* Prend tout l'espace restant */
		display: flex;
		flex-direction: column;
		align-items: center; /* Centre horizontalement */
		justify-content: center; /* CENTRÉ VERTICALEMENT DANS L'ESPACE RESTANT */
		/* Compensation pour équilibrer avec le header et footer */
		margin: 0;
		height: calc(100% - 180px); /* Réserve de l'espace pour header (80px) + footer (100px) */
		overflow-y: auto;
	}
	
	.nav-link {
		padding: 0.75rem 0.5rem;
		min-height: 44px;
		gap: 0.75rem;
		justify-content: flex-start; /* Aligné à gauche */
		align-items: center; /* Centre verticalement dans le lien */
		cursor: pointer;
		width: 100%; /* Prend toute la largeur */
		max-width: none; /* Pas de limite de largeur sur mobile */
		position: relative;
	}
	
	/* Icônes mobile - visibles seulement quand menu fermé */
	.nav-icon {
		display: flex;
		font-size: 1.4rem;
		min-width: 1.5rem;
		width: 1.5rem;
		height: 1.5rem;
		align-items: center;
		justify-content: center;
		opacity: 1;
		transition: opacity 0.2s ease, width 0.2s ease;
		flex-shrink: 0;
	}
	
	/* Cacher les icônes quand le menu est déplié */
	.sidebar.mobile-expanded .nav-icon {
		opacity: 0;
		width: 0;
		min-width: 0;
		display: none; /* Complètement cachés quand menu déplié */
	}
	
	/* Texte mobile - visible seulement quand déplié, plus petit */
	.nav-text {
		opacity: 0;
		width: 0;
		font-size: 0.9rem; /* Texte plus petit sur mobile */
		font-weight: 500;
		transition: opacity 0.3s ease, width 0.3s ease;
		white-space: nowrap;
		overflow: hidden;
		text-align: left;
		flex-grow: 1;
	}
	
	.sidebar.mobile-expanded .nav-text {
		opacity: 1;
		width: 100%; /* Prend toute la largeur disponible */
		padding-left: 0.5rem;
	}
	
	/* Footer mobile - hauteur fixe */
	.sidebar-footer {
		padding: 1rem 0.75rem 0.5rem;
		gap: 0.75rem;
		flex-shrink: 0;
		margin-top: auto;
		border-top: 1px solid var(--gray-200, #e5e5e5);
		min-height: 100px; /* Hauteur fixe pour le footer */
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	
	:global(.dark) .sidebar-footer {
		border-top: 1px solid var(--gray-700, #404040);
	}
	
	.theme-toggle {
		width: 40px;
		height: 40px;
		font-size: 1.2rem;
	}
	
	/* Sélecteur de langue mobile */
	.language-selector {
		gap: 0.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.desktop-flags {
		display: none; /* Cacher les drapeaux inline sur mobile */
	}
	
	.gear-toggle {
		display: flex; /* Afficher le bouton engrenage sur mobile */
		background: var(--gray-100, #f5f5f5);
		border: none;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		font-size: 1.2rem;
		cursor: pointer;
		transition: all 0.3s ease;
		align-items: center;
		justify-content: center;
	}
	
	:global(.dark) .gear-toggle {
		background: var(--gray-700, #404040);
	}
	
	.gear-toggle:hover {
		background: var(--gray-300, #d4d4d4);
		transform: rotate(90deg) scale(1.1);
	}
	
	:global(.dark) .gear-toggle:hover {
		background: var(--gray-600, #525252);
	}
	
	/* CONTAINER MOBILE */
	.container {
		left: var(--sidebar-width-collapsed);
		width: calc(100vw - var(--sidebar-width-collapsed));
		transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.sidebar.mobile-expanded ~ .container {
		left: var(--sidebar-width-expanded);
		width: calc(100vw - var(--sidebar-width-expanded));
	}
	
	/* Volet de sélection des drapeaux - MOBILE */
	.flag-selector-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		height: 100dvh;
		z-index: 1001;
		display: flex;
		align-items: flex-end;
		justify-content: flex-start;
		padding-bottom: 1rem;
		padding-left: var(--sidebar-width-collapsed);
		pointer-events: none;
	}
	
	.sidebar.mobile-expanded ~ .flag-selector-wrapper {
		padding-left: var(--sidebar-width-expanded);
	}
	
	.flag-selector-panel {
		background: #ffffff;
		border: 1px solid var(--gray-200, #e5e5e5);
		border-radius: 10px;
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		min-width: 140px;
		margin-left: 0.5rem;
		pointer-events: auto;
		animation: slideIn 0.2s ease-out;
	}
	
	:global(.dark) .flag-selector-panel {
		background: var(--gray-800, #262626);
		border: 1px solid var(--gray-700, #404040);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	}
	
	.flag-button {
		padding: 0;
		border: none;
		background: transparent;
		cursor: pointer;
		transition: all 0.25s ease;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		opacity: 0.6;
		margin: 0 auto;
	}
	
	.flag-button:hover {
		opacity: 1;
		transform: scale(1.1);
	}
	
	.flag-button.active {
		opacity: 1;
		background: var(--gray-200, #e5e5e5);
	}
	
	:global(.dark) .flag-button.active {
		background: var(--gray-700, #404040);
	}
	
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
}

/* Support pour les appareils avec encoche */
@supports (padding: max(0px)) {
	.sidebar {
		padding-top: max(1rem, env(safe-area-inset-top));
		padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
	}
}</style>