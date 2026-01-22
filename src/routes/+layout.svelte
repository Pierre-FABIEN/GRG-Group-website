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

	// État du menu latéral mobile
	let isSidebarOpen = $state(false);

	// État pour le volet de sélection des drapeaux
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

		<!-- Overlay pour fermer le menu -->
		<div 
			class="sidebar-overlay" 
			class:active={isSidebarOpen} 
			on:click={() => { isSidebarOpen = false; isFlagSelectorOpen = false; }}
			on:keydown={(e) => e.key === 'Escape' && (isSidebarOpen = false)}
			role="button"
			tabindex="-1">
		</div>

		<!-- SIDEBAR LATÉRALE ÉTROITE -->
		<aside 
			class="sidebar" 
			class:expanded={isSidebarOpen}
			on:click={() => isSidebarOpen = !isSidebarOpen}
			role="button"
			tabindex="0"
			on:keydown={(e) => e.key === 'Enter' && (isSidebarOpen = !isSidebarOpen)}>
			
			<!-- Navigation centrée -->
			<nav class="sidebar-nav">
				<a 
					href="/" 
					class="nav-link" 
					class:active={currentPath === '/'}
					on:click|stopPropagation={() => { isSidebarOpen = false; }}
					title={translations[currentLanguage].home}
				>
					<span class="nav-icon">{isSidebarOpen ? '' : '🏠'}</span>
					<span class="nav-text">{translations[currentLanguage].home}</span>
				</a>
				<a 
					href="/propos" 
					class="nav-link" 
					class:active={currentPath === '/propos'}
					on:click|stopPropagation={() => { isSidebarOpen = false; }}
					title={translations[currentLanguage].about}
				>
					<span class="nav-icon">{isSidebarOpen ? '' : 'ℹ️'}</span>
					<span class="nav-text">{translations[currentLanguage].about}</span>
				</a>
				<a 
					href="/services-" 
					class="nav-link" 
					class:active={currentPath === '/services-'}
					on:click|stopPropagation={() => { isSidebarOpen = false; }}
					title={translations[currentLanguage].services}
				>
					<span class="nav-icon">{isSidebarOpen ? '' : '⚙️'}</span>
					<span class="nav-text">{translations[currentLanguage].services}</span>
				</a>
				<a 
					href="/produits" 
					class="nav-link" 
					class:active={currentPath === '/produits'}
					on:click|stopPropagation={() => { isSidebarOpen = false; }}
					title={translations[currentLanguage].products}
				>
					<span class="nav-icon">{isSidebarOpen ? '' : '📦'}</span>
					<span class="nav-text">{translations[currentLanguage].products}</span>
				</a>
				<a 
					href="/contact" 
					class="nav-link" 
					class:active={currentPath === '/contact'}
					on:click|stopPropagation={() => { isSidebarOpen = false; }}
					title={translations[currentLanguage].contact}
				>
					<span class="nav-icon">{isSidebarOpen ? '' : '✉️'}</span>
					<span class="nav-text">{translations[currentLanguage].contact}</span>
				</a>
			</nav>

			<!-- Footer avec thème et langues -->
			<div class="sidebar-footer">
				<button 
					class="theme-toggle" 
					on:click|stopPropagation={handleToggleMode} 
					type="button"
					title="Toggle theme">
					<span class="theme-icon-light">☀️</span>
					<span class="theme-icon-dark">🌙</span>
				</button>

				<!-- Bouton d'engrenage pour ouvrir le sélecteur de drapeaux -->
				<button 
					class="gear-toggle" 
					on:click|stopPropagation={() => isFlagSelectorOpen = !isFlagSelectorOpen}
					type="button"
					title="Select language">
					<span class="gear-icon">⚙️</span>
				</button>

				<!-- Volet de sélection des drapeaux -->
				{#if isFlagSelectorOpen}
					<div class="flag-selector-panel" on:click|stopPropagation>
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
				{/if}
			</div>
		</aside>

		<!-- CONTENU PRINCIPAL -->
		<div class="container" class:sidebar-expanded={isSidebarOpen}>
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
  
  --sidebar-width-collapsed: 60px;
  --sidebar-width-expanded: 240px;
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

/* === OVERLAY === */
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

/* === SIDEBAR LATÉRALE === */
.sidebar {
	width: var(--sidebar-width-collapsed);
	min-width: var(--sidebar-width-collapsed);
	height: 100vh;
	height: 100dvh;
	background: #ffffff;
	border-right: 1px solid var(--gray-200, #e5e5e5);
	display: flex;
	flex-direction: column;
	padding: 1rem 0;
	z-index: 999;
	position: fixed;
	left: 0;
	top: 0;
	overflow: hidden;
	transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	cursor: pointer;
}

:global(.dark) .sidebar {
	background: var(--gray-800, #262626);
	border-right: 1px solid var(--gray-700, #404040);
}

.sidebar.expanded {
	width: var(--sidebar-width-expanded);
	min-width: var(--sidebar-width-expanded);
	box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
}

/* Navigation centrée */
.sidebar-nav {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	flex: 1;
	padding: 0 0.5rem;
	overflow-y: auto;
	overflow-x: hidden;
}

.nav-link {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 1rem;
	text-decoration: none;
	color: var(--gray-600, #525252);
	font-weight: 600;
	font-size: 0.9rem;
	padding: 0.75rem;
	border-radius: 10px;
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	position: relative;
	white-space: nowrap;
	min-height: 44px;
	width: 100%;
	cursor: pointer;
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

.nav-icon {
	font-size: 1.5rem;
	min-width: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.nav-text {
	opacity: 0;
	width: 0;
	overflow: hidden;
	transition: opacity 0.3s ease, width 0.3s ease;
}

.sidebar.expanded .nav-text {
	opacity: 1;
	width: auto;
}

/* Footer */
.sidebar-footer {
	padding: 1rem 0.5rem 0.5rem;
	border-top: 1px solid var(--gray-200, #e5e5e5);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.75rem;
	flex-shrink: 0;
	margin-top: auto;
	position: relative;
}

:global(.dark) .sidebar-footer {
	border-top: 1px solid var(--gray-700, #404040);
}

.theme-toggle {
	background: var(--gray-100, #f5f5f5);
	border: none;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	font-size: 1.2rem;
	cursor: pointer;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
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

/* Bouton engrenage */
.gear-toggle {
	background: var(--gray-100, #f5f5f5);
	border: none;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	font-size: 1.2rem;
	cursor: pointer;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
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

/* Volet de sélection des drapeaux */
.flag-selector-panel {
	position: absolute;
	bottom: 100%;
	left: 50%;
	transform: translateX(-50%);
	background: #ffffff;
	border: 1px solid var(--gray-200, #e5e5e5);
	border-radius: 10px;
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
	z-index: 1001;
	min-width: 120px;
	margin-bottom: 0.5rem;
}

:global(.dark) .flag-selector-panel {
	background: var(--gray-800, #262626);
	border: 1px solid var(--gray-700, #404040);
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
	width: 32px;
	height: 32px;
	opacity: 0.6;
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

/* === CONTAINER PRINCIPAL === */
.container {
	position: fixed;
	left: var(--sidebar-width-collapsed);
	top: 0;
	width: calc(100vw - var(--sidebar-width-collapsed));
	height: 100vh;
	height: 100dvh;
	overflow: hidden;
	transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.container.sidebar-expanded {
	left: var(--sidebar-width-expanded);
	width: calc(100vw - var(--sidebar-width-expanded));
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

/* === RESPONSIVE MOBILE === */
@media (max-width: 768px) {
	.sidebar {
		width: var(--sidebar-width-collapsed);
		box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
	}
	
	.sidebar.expanded {
		width: var(--sidebar-width-expanded);
		box-shadow: 4px 0 20px rgba(0, 0, 0, 0.2);
		z-index: 1000;
	}
	
	.container {
		left: var(--sidebar-width-collapsed);
		width: calc(100vw - var(--sidebar-width-collapsed));
	}
	
	.container.sidebar-expanded {
		left: var(--sidebar-width-expanded);
		width: calc(100vw - var(--sidebar-width-expanded));
	}
	
	/* Navigation centrée pour mobile */
	.sidebar-nav {
		gap: 0.75rem;
	}
	
	.nav-link {
		min-height: 40px;
		padding: 0.65rem;
	}
}

@media (max-width: 480px) {
	:root {
		--sidebar-width-collapsed: 50px;
		--sidebar-width-expanded: 200px;
	}
	
	.sidebar-nav {
		gap: 0.5rem;
		padding: 0 0.25rem;
	}
	
	.nav-icon {
		font-size: 1.3rem;
	}
	
	.nav-link {
		padding: 0.6rem;
		font-size: 0.85rem;
		min-height: 38px;
	}
	
	.theme-toggle,
	.gear-toggle {
		width: 36px;
		height: 36px;
		font-size: 1.1rem;
	}
	
	.flag-button {
		width: 28px;
		height: 28px;
	}
}

/* Support pour les appareils avec encoche (notch) */
@supports (padding: max(0px)) {
	.sidebar {
		padding-top: max(1rem, env(safe-area-inset-top));
		padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
	}
}
</style>