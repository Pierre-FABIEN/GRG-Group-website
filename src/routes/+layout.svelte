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
	
	// Fermer le menu quand on clique sur un lien
	function handleNavClick() {
		isMobileOpen = false;
	}
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<link rel="manifest" href="/pwa/manifest.webmanifest" />
	<meta name="theme-color" content="#6366f1" />
</svelte:head>

{#if !$firstLoadComplete}
	<!-- Loader -->
{/if}

{#if $isClient}
	<div class="layout-wrapper">
		<ModeWatcher />

		<!-- Bouton menu mobile avec animation -->
		<button 
			class="mobile-menu-button" 
			class:open={isMobileOpen}
			on:click={() => isMobileOpen = !isMobileOpen} 
			type="button"
			aria-label="Toggle menu">
			<span class="burger-line"></span>
			<span class="burger-line"></span>
			<span class="burger-line"></span>
		</button>

		<!-- Overlay pour fermer le menu -->
		<div 
			class="sidebar-overlay" 
			class:mobile-open={isMobileOpen} 
			on:click={() => isMobileOpen = false}
			on:keydown={(e) => e.key === 'Escape' && (isMobileOpen = false)}
			role="button"
			tabindex="-1">
		</div>

		<!-- SIDEBAR BENTO STYLE -->
		<aside class="sidebar" class:mobile-open={isMobileOpen}>
			<div class="sidebar-header">
				<div class="logo">
					<a href="https://bit.ly/GRG-Group-FnB" target="blank">
						<img src="/image/path1.svg" alt="Logo">
					</a>
				</div>
			</div>
			
			<nav class="sidebar-nav">
				<a href="/" class="nav-link" class:active={currentPath === '/'} on:click={handleNavClick}>
					<span class="nav-icon">🏠</span>
					<span class="nav-text">{translations[currentLanguage].home}</span>
				</a>
				<a href="/propos" class="nav-link" class:active={currentPath === '/propos'} on:click={handleNavClick}>
					<span class="nav-icon">ℹ️</span>
					<span class="nav-text">{translations[currentLanguage].about}</span>
				</a>
				<a href="/services-" class="nav-link" class:active={currentPath === '/services-'} on:click={handleNavClick}>
					<span class="nav-icon">⚙️</span>
					<span class="nav-text">{translations[currentLanguage].services}</span>
				</a>
				<a href="/produits" class="nav-link" class:active={currentPath === '/produits'} on:click={handleNavClick}>
					<span class="nav-icon">📦</span>
					<span class="nav-text">{translations[currentLanguage].products}</span>
				</a>
				<a href="/contact" class="nav-link" class:active={currentPath === '/contact'} on:click={handleNavClick}>
					<span class="nav-icon">✉️</span>
					<span class="nav-text">{translations[currentLanguage].contact}</span>
				</a>
			</nav>

			<div class="sidebar-footer">
				<button class="theme-toggle" on:click={handleToggleMode} type="button">
					<span class="theme-icon-light">☀️</span>
					<span class="theme-icon-dark">🌙</span>
				</button>

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

/* Menu burger animé */
.mobile-menu-button {
	display: none;
	position: fixed;
	top: 1rem;
	left: 1rem;
	z-index: 1002;
	background: var(--gray-800, #262626);
	border: none;
	border-radius: 0.75rem;
	padding: 0.625rem;
	cursor: pointer;
	width: 48px;
	height: 48px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.375rem;
	transition: all 0.3s ease;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:global(.dark) .mobile-menu-button {
	background: var(--gray-700, #404040);
}

.mobile-menu-button:hover {
	transform: scale(1.05);
	box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.burger-line {
	width: 24px;
	height: 2.5px;
	background: white;
	border-radius: 2px;
	transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	transform-origin: center;
}

.mobile-menu-button.open .burger-line:nth-child(1) {
	transform: translateY(8px) rotate(45deg);
}

.mobile-menu-button.open .burger-line:nth-child(2) {
	opacity: 0;
	transform: scaleX(0);
}

.mobile-menu-button.open .burger-line:nth-child(3) {
	transform: translateY(-8px) rotate(-45deg);
}

/* Overlay */
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
	opacity: 0;
	transition: opacity 0.3s ease;
}

.sidebar-overlay.mobile-open {
	display: block;
	opacity: 1;
}

/* SIDEBAR */
.sidebar {
	width: 280px;
	min-width: 280px;
	height: 100vh;
	height: 100dvh;
	background: #ffffff;
	border-right: 1px solid var(--gray-200, #e5e5e5);
	display: flex;
	flex-direction: column;
	padding: 2rem 1rem 1rem 2rem;
	z-index: 1000;
	position: fixed;
	left: 0;
	top: 0;
	overflow-y: auto;
	transform: translateZ(0);
	backface-visibility: hidden;
	transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:global(.dark) .sidebar {
	background: var(--gray-800, #262626);
	border-right: 1px solid var(--gray-700, #404040);
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

.logo img {
	width: 100%;
	height: auto;
}

.sidebar-nav {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	flex: 1;
	overflow-y: auto;
	min-height: 0;
	padding-right: 0.5rem;
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
	background: var(--gray-800, #262626);
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
	background: var(--gray-800, #262626);
	color: white;
	box-shadow: 0 8px 24px rgba(38, 38, 38, 0.2);
}

:global(.dark) .nav-link.active {
	background: var(--gray-700, #404040);
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
}

.sidebar-footer {
	padding-top: 1rem;
	border-top: 2px solid var(--gray-100, #f5f5f5);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.75rem;
	flex-shrink: 0;
	margin-top: auto;
}

:global(.dark) .sidebar-footer {
	border-top: 2px solid var(--gray-700, #404040);
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
	background: var(--gray-800, #262626);
	transform: rotate(180deg) scale(1.1);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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

.language-selector {
	display: flex;
	gap: 0.75rem;
	align-items: center;
	justify-content: center;
	margin-top: 0.5rem;
	flex-wrap: nowrap;
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
	width: 28px;
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

/* CONTAINER */
.container {
	position: absolute;
	right: 0;
	top: 0;
	width: calc(100vw - 280px);
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

/* RESPONSIVE */
@media (max-width: 1024px) {
	.container {
		width: calc(100vw - 280px);
	}
}

@media (max-width: 768px) {
	.mobile-menu-button {
		display: flex;
	}
	
	.sidebar {
		transform: translateX(-100%);
		box-shadow: none;
	}
	
	.sidebar.mobile-open {
		transform: translateX(0);
		box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
	}
	
	.container {
		left: 0 !important;
		right: 0;
		width: 100vw !important;
	}
	
	/* Optimisation des cartes sur mobile */
	:global(.page-wrapper) {
		padding: 5rem 1rem 1rem !important;
		height: auto !important;
		min-height: 100vh;
		overflow-y: auto !important;
		justify-content: flex-start !important;
	}
	
	:global(.bento-row) {
		flex-direction: column !important;
		height: auto !important;
		margin-bottom: 1rem !important;
		gap: 1rem !important;
	}
	
	:global(.bento-card) {
		flex: 1 1 auto !important;
		min-height: 180px !important;
		max-height: 280px !important;
		height: auto !important;
		opacity: 1 !important;
		transform: none !important;
	}
	
	:global(.bento-card.hovered) {
		flex: 1 1 auto !important;
		min-height: 220px !important;
		max-height: 320px !important;
	}
	
	/* Fix pour le highlight image */
	:global(.card-title::before),
	:global(.card-subtitle::before),
	:global(.card-1-subtitle::before),
	:global(.card-4-subtitle::before),
	:global(.card-5-subtitle::before) {
		background-size: 100% 100% !important;
		background-position: center !important;
		height: 75% !important;
	}
	
	:global(.card-icon) {
		font-size: 2.5rem !important;
		margin-bottom: 0.75rem !important;
	}
	
	:global(.card-title) {
		font-size: 1.5rem !important;
		margin-bottom: 0.5rem !important;
	}
	
	:global(.card-subtitle) {
		font-size: 1rem !important;
	}
	
	:global(.hover-text) {
		font-size: 0.9rem !important;
		line-height: 1.4 !important;
		padding: 0 0.5rem !important;
	}
	
	:global(.discover-link),
	:global(.action-btn) {
		font-size: 0.85rem !important;
		padding: 0.5rem 1rem !important;
	}
}

@media (max-width: 480px) {
	.mobile-menu-button {
		top: 0.75rem;
		left: 0.75rem;
		width: 44px;
		height: 44px;
	}
	
	.sidebar {
		width: 280px;
		padding: 1.5rem 1rem 1rem 1.5rem;
	}
	
	.logo {
		max-width: 130px;
	}
	
	.nav-link {
		padding: 0.75rem 1rem;
		font-size: 0.9rem;
	}
	
	.theme-toggle {
		width: 40px;
		height: 40px;
		font-size: 1.2rem;
	}
	
	.language-button {
		width: 26px;
		height: 26px;
	}
	
	.language-selector {
		gap: 0.5rem;
	}
	
	:global(.page-wrapper) {
		padding: 4.5rem 0.75rem 0.75rem !important;
	}
	
	:global(.bento-row) {
		gap: 0.75rem !important;
	}
	
	:global(.bento-card) {
		padding: 1.25rem !important;
		min-height: 160px !important;
		max-height: 260px !important;
		border-radius: 1.25rem !important;
	}
	
	:global(.bento-card.hovered) {
		min-height: 200px !important;
		max-height: 300px !important;
	}
	
	:global(.card-icon) {
		font-size: 2rem !important;
		margin-bottom: 0.5rem !important;
	}
	
	:global(.card-title) {
		font-size: 1.3rem !important;
	}
	
	:global(.card-subtitle) {
		font-size: 0.9rem !important;
	}
	
	:global(.hover-text) {
		font-size: 0.85rem !important;
	}
	
	:global(.discover-link),
	:global(.action-btn) {
		font-size: 0.8rem !important;
		padding: 0.4rem 0.8rem !important;
	}
}

@media (max-width: 360px) {
	.language-selector {
		gap: 0.4rem;
		flex-wrap: wrap;
		justify-content: center;
	}
	
	.language-button {
		width: 24px;
		height: 24px;
	}
	
	:global(.bento-card) {
		padding: 1rem !important;
		min-height: 150px !important;
		max-height: 240px !important;
	}
	
	:global(.card-title) {
		font-size: 1.2rem !important;
	}
	
	:global(.card-subtitle) {
		font-size: 0.85rem !important;
	}
}

/* Support pour les appareils avec encoche */
@supports (padding: max(0px)) {
	.sidebar {
		padding-left: max(1rem, env(safe-area-inset-left));
		padding-right: max(1rem, env(safe-area-inset-right));
	}
	
	.mobile-menu-button {
		left: max(0.75rem, env(safe-area-inset-left));
		top: max(0.75rem, env(safe-area-inset-top));
	}
	
	:global(.page-wrapper) {
		padding-top: max(5rem, calc(5rem + env(safe-area-inset-top))) !important;
	}
}
</style>