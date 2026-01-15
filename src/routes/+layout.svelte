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
		// Sauvegarder la langue dans le localStorage
		if (typeof window !== 'undefined') {
			localStorage.setItem('selectedLanguage', lang);
		}
	}

	let isMobileOpen = $state(false);
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

		<!-- Bouton menu mobile - disparaît quand le menu est ouvert -->
		{#if !isMobileOpen}
			<button 
				class="mobile-menu-button" 
				on:click={() => isMobileOpen = !isMobileOpen} 
				type="button"
				aria-label="Toggle menu">
				☰
			</button>
		{/if}

		<!-- Overlay pour fermer le menu -->
		<div 
			class="sidebar-overlay" 
			class:mobile-open={isMobileOpen} 
			on:click={() => isMobileOpen = false}
			on:keydown={(e) => e.key === 'Escape' && (isMobileOpen = false)}
			role="button"
			tabindex="-1">
		</div>

		<!-- SIDEBAR BENTO STYLE - MODIFIÉ -->
		<aside class="sidebar" class:mobile-open={isMobileOpen}>
			<div class="sidebar-header">
				<div class="logo"> 
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<a href="https://bit.ly/GRG-Group-FnB" target="blank">	<img src="/image/path1.svg" alt="Logo"> </a>
				</div>
				
			</div>
			
			<nav class="sidebar-nav">
				<a href="/" class="nav-link" class:active={currentPath === '/'}>
					<span class="nav-icon"></span>
					<span class="nav-text">{translations[currentLanguage].home}</span>
				</a>
				<a href="/propos" class="nav-link" class:active={currentPath === '/propos'}>
					<span class="nav-icon"></span>
					<span class="nav-text">{translations[currentLanguage].about}</span>
				</a>
				<a href="/services-" class="nav-link" class:active={currentPath === '/services-'}>
					<span class="nav-icon"></span>
					<span class="nav-text">{translations[currentLanguage].services}</span>
				</a>
				<a href="/produits" class="nav-link" class:active={currentPath === '/produits'}>
					<span class="nav-icon"></span>
					<span class="nav-text">{translations[currentLanguage].products}</span>
				</a>
				<a href="/contact" class="nav-link" class:active={currentPath === '/contact'}>
					<span class="nav-icon"></span>
					<span class="nav-text">{translations[currentLanguage].contact}</span>
				</a>
			</nav>

			<div class="sidebar-footer">
				<button class="theme-toggle" on:click={handleToggleMode} type="button">
					<span class="theme-icon-light">☀️</span>
					<span class="theme-icon-dark">🌙</span>
				</button>

				<!-- Sélecteur de langue - drapeaux sur la même ligne -->
				<div class="language-selector">
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
			</div>
		</aside>

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
}


:global(html),
:global(body) {
	overflow: hidden;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	height: 100vh;
	height: 100dvh;
	position: fixed;
	overscroll-behavior: none;
}

.layout-wrapper {
	display: flex;
	width: 100vw;
	height: 100vh;
	height: 100dvh;
	overflow: hidden;
	background: var(--gray-50, #fafafa);
	font-family: 'inter', sans-serif;
	transition: background 0.3s ease;
	position: fixed;
	top: 0;
	left: 0;
}

:global(.dark) .layout-wrapper {
	background: var(--gray-900, #171717);
}

/* Menu burger pour mobile */
.mobile-menu-button {
	display: none;
	position: fixed;
	top: 1rem;
	left: 1rem;
	z-index: 1002;
	background: var(--theme-color, #404040);
	border: none;
	border-radius: 0.5rem;
	padding: 0.5rem;
	color: white;
	font-size: 1.5rem;
	cursor: pointer;
	width: 44px;
	height: 44px;
	align-items: center;
	justify-content: center;
	transition: opacity 0.3s ease;
}

/* Overlay pour fermer la sidebar */
.sidebar-overlay {
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 999;
	backdrop-filter: blur(2px);
}

.sidebar-overlay.mobile-open {
	display: block;
}

/* === SIDEBAR === */
.sidebar {
	width: 280px;
	min-width: 280px;
	height: 100vh;
	height: 100dvh;
	background: #ffffff;
	border-right: 1px solid var(--gray-200, #e5e5e5);
	display: flex;
	flex-direction: column;
	padding: 2rem 1rem 0.5rem 2rem;
	z-index: 1000;
	position: fixed;
	left: 0;
	top: 0;
	overflow: hidden;
	transform: translateZ(0);
	backface-visibility: hidden;
	transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:global(.dark) .sidebar {
	background: var(--gray-800, #262626);
	border-right: 1px solid var(--gray-700, #404040);
}

.sidebar.mobile-open {
	transform: translateX(0);
	box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
}

.sidebar-header {
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 0 1rem 1.5rem;
	border-bottom: 2px solid var(--gray-100, #f5f5f5);
	margin-bottom: 1.5rem;
	flex-shrink: 0;
}

:global(.dark) .sidebar-header {
	border-bottom: 2px solid var(--gray-700, #404040);
}

.logo {
	filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
	max-width: 150px;
	height: auto;
	margin-left: 15%;
	transition: max-width 0.3s ease;
}

.logo-image {
	filter: brightness(0.8);
}

:global(.dark) .logo-image {
	filter: brightness(1.2);
}

.sidebar-nav {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	flex: 1;
	overflow: hidden;
	justify-content: center; /* Centrage vertical des labels */
	min-height: 0;
}

.nav-link {
	display: flex;
	align-items: center;
	gap: 1rem;
	text-decoration: none;
	color: var(--gray-600, #525252);
	font-weight: 600;
	font-size: 0.95rem;
	padding: 0.875rem 1.25rem;
	border-radius: 1rem;
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	position: relative;
	overflow: hidden;
	flex-shrink: 0;
}

:global(.dark) .nav-link {
	color: var(--gray-400, #a3a3a3);
}

.nav-link::before {
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	width: 4px;
	height: 100%;
	background: var(--theme-color, #404040);
	transform: scaleY(0);
	transition: transform 0.3s ease;
	border-radius: 0 4px 4px 0;
}

.nav-link:hover {
	background: var(--gray-100, #f5f5f5);
	color: var(--gray-800, #262626);
	transform: translateX(4px);
}

:global(.dark) .nav-link:hover {
	background: var(--gray-700, #404040);
	color: var(--gray-100, #f5f5f5);
}

.nav-link.active {
	background: var(--theme-color, #404040);
	color: white;
	box-shadow: 0 8px 24px rgba(64, 64, 64, 0.2);
}

.nav-link.active::before {
	transform: scaleY(1);
	background: white;
}

.nav-icon {
	font-size: 1.3rem;
	min-width: 1.3rem;
}

.nav-text {
	white-space: nowrap;
	transition: opacity 0.3s ease, width 0.3s ease;
}

.sidebar-footer {
	padding-top: 0.75rem;
	border-top: 2px solid var(--gray-100, #f5f5f5);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.625rem;
	flex-shrink: 0;
	margin-top: auto;
}

:global(.dark) .sidebar-footer {
	border-top: 2px solid var(--gray-700, #404040);
}

.theme-toggle {
	background: var(--gray-100, #f5f5f5);
	border: none;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	font-size: 1.25rem;
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
	background: var(--theme-color, #404040);
	transform: rotate(180deg) scale(1.1);
	box-shadow: 0 4px 12px rgba(64, 64, 64, 0.3);
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

/* Sélecteur de langue */
.language-selector {
	display: flex;
	gap: 0.75rem; /* Espacement augmenté entre les drapeaux */
	align-items: center;
	justify-content: center;
	margin-top: 0.75rem;
	padding-bottom: 0.5rem;
	flex-wrap: nowrap; /* Empêcher le retour à la ligne */
}

.language-button {
	padding: 0;
	border: none;
	background: transparent;
	cursor: pointer;
	transition: all 0.25s ease;
	border-radius: 0.375rem;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 28px; /* Légèrement plus grand pour mobile */
	height: 28px;
	opacity: 0.5;
}

.language-button:hover {
	opacity: 1;
	transform: scale(1.1);
	filter: brightness(1.2) drop-shadow(0 0 6px rgba(255, 255, 255, 0.6));
}

.language-button.active {
	opacity: 1;
	filter: brightness(1.3) drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
}

/* === CONTAINER === */
.container {
	position: absolute;
	right: 0;
	top: 0;
	width: calc(100vw - 280px);
	height: 100vh;
	height: 100dvh;
	overflow: hidden;
	transition: none;
	will-change: auto;
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

/* === STYLES GLOBAUX POUR LES COMPOSANTS ENFANTS === */
:global(.card) {
	background: var(--gradient-card1, linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%));
	color: var(--text-color-1, #171717);
}

:global(.card-2) {
	background: var(--gradient-card2, linear-gradient(135deg, #e5e5e5 0%, #d4d4d4 100%));
	color: var(--text-color-2, #262626);
}

:global(.card-3) {
	background: var(--gradient-card3, linear-gradient(135deg, #d4d4d4 0%, #a3a3a3 100%));
	color: var(--text-color-3, #ffffff);
}

:global(.card-4) {
	background: var(--gradient-card4, linear-gradient(135deg, #737373 0%, #525252 100%));
	color: var(--text-color-4, #ffffff);
}

:global(.card-5) {
	background: var(--gradient-card5, linear-gradient(135deg, #404040 0%, #262626 100%));
	color: var(--text-color-5, #ffffff);
}

/* === RESPONSIVE SYSTEM CORRIGÉ POUR MOBILE === */
@media (max-width: 1024px) {
	/* SUR LAPTOP, ON GARDE LA SIDEBAR COMPLÈTE */
	.container {
		width: calc(100vw - 280px);
	}
}

@media (max-width: 768px) {
	.mobile-menu-button {
		display: flex;
	}
	
	/* Cache le bouton burger quand le menu est ouvert */
	.sidebar.mobile-open ~ .mobile-menu-button {
		display: none;
	}
	
	.sidebar {
		width: 280px;
		transform: translateX(-100%);
	}
	
	.sidebar.mobile-open {
		transform: translateX(0);
	}
	
	.sidebar-header {
		padding: 0 1rem 1.5rem;
		justify-content: flex-start;
	}
	
	.logo {
		max-width: 150px;
		margin-left: 15%;
	}
	
	.nav-text {
		display: block !important;
		opacity: 1 !important;
		width: auto !important;
	}
	
	.nav-link {
		justify-content: flex-start;
		padding: 0.875rem 1.25rem;
		gap: 1rem;
	}
	
	.nav-icon {
		font-size: 1.3rem;
	}
	
	.sidebar-nav {
		gap: 0.5rem;
		justify-content: center; /* Centrage vertical maintenu sur mobile */
	}
	
	.sidebar-footer {
		padding-top: 0.75rem;
		gap: 0.625rem;
	}
	
	.theme-toggle {
		width: 40px;
		height: 40px;
		font-size: 1.25rem;
	}
	
	.container {
		left: 0 !important;
		right: 0;
		width: 100vw !important;
	}
	
	.language-button {
		width: 28px;
		height: 28px;
	}
	
	.language-selector {
		gap: 0.75rem; /* Espacement maintenu sur tablette */
		margin-top: 0.75rem;
		padding-bottom: 0.5rem;
		flex-direction: row; /* Drapeaux sur la même ligne */
		flex-wrap: nowrap; /* Empêche le retour à la ligne */
	}
}

@media (max-width: 480px) {
	.mobile-menu-button {
		top: 0.75rem;
		left: 0.75rem;
		padding: 0.375rem;
		font-size: 1.25rem;
		width: 40px;
		height: 40px;
	}
	
	/* Cache le bouton burger quand le menu est ouvert sur mobile */
	.sidebar.mobile-open ~ .mobile-menu-button {
		display: none;
	}
	
	.sidebar {
		width: 280px;
		padding: 1.5rem 1rem 0.5rem 1.5rem;
	}
	
	.sidebar-header {
		padding: 0 1rem 1rem;
		margin-bottom: 1rem;
	}
	
	.logo {
		max-width: 120px;
	}
	
	.nav-link {
		padding: 0.75rem 1rem;
		font-size: 0.9rem;
	}
	
	.nav-icon {
		font-size: 1.2rem;
	}
	
	.sidebar-nav {
		gap: 0.375rem;
		justify-content: center; /* Centrage vertical maintenu */
	}
	
	.sidebar-footer {
		padding-top: 0.625rem;
		gap: 0.625rem;
	}
	
	.theme-toggle {
		width: 36px;
		height: 36px;
		font-size: 1.1rem;
	}
	
	.language-button {
		width: 26px; /* Taille légèrement réduite pour mobile */
		height: 26px;
	}
	
	.language-selector {
		gap: 0.5rem; /* Espacement réduit mais toujours sur la même ligne */
		margin-top: 1rem;
		padding-bottom: 0.25rem;
		flex-direction: row; /* Drapeaux sur la même ligne */
		justify-content: center;
		flex-wrap: nowrap; /* Important : empêche le retour à la ligne */
	}
	
	/* S'assurer que les drapeaux ne passent pas à la ligne */
	.language-selector .language-button {
		margin-bottom: 0;
		flex-shrink: 0; /* Empêche la réduction de taille */
	}
}

/* Support pour les appareils avec encoche (notch) */
@supports (padding: max(0px)) {
	.sidebar {
		padding-left: max(1rem, env(safe-area-inset-left));
		padding-right: max(1rem, env(safe-area-inset-right));
	}
	
	.container {
		padding-right: env(safe-area-inset-right);
	}
	
	.mobile-menu-button {
		left: max(1rem, env(safe-area-inset-left));
		top: max(1rem, env(safe-area-inset-top));
	}
}

/* Amélioration pour les très petits écrans */
@media (max-width: 360px) {
	.language-selector {
		gap: 0.4rem; /* Espacement encore réduit mais drapeaux restent alignés */
	}
	
	.language-button {
		width: 24px;
		height: 24px;
	}
}
</style>
