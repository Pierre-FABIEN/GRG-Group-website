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

	// Thèmes de couleurs
	const themes = [
		{ 
			name: 'Océan', 
			color: '#0891b2',
			gradients: {
				card1: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)',
				card2: 'linear-gradient(135deg, #67e8f9 0%, #22d3ee 100%)',
				card3: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
				card4: 'linear-gradient(135deg, #0e7490 0%, #155e75 100%)',
				card5: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)'
			},
			textColors: ['#164e63', '#ffffff', '#ffffff', '#ffffff', '#0c4a6e']
		},
		{ 
			name: 'Forêt', 
			color: '#16a34a',
			gradients: {
				card1: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
				card2: 'linear-gradient(135deg, #86efac 0%, #4ade80 100%)',
				card3: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
				card4: 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
				card5: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
			},
			textColors: ['#14532d', '#ffffff', '#ffffff', '#ffffff', '#052e16']
		},
		{ 
			name: 'Café', 
			color: '#92400e',
			gradients: {
				card1: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
				card2: 'linear-gradient(135deg, #fdba74 0%, #fb923c 100%)',
				card3: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
				card4: 'linear-gradient(135deg, #c2410c 0%, #9a3412 100%)',
				card5: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)'
			},
			textColors: ['#78350f', '#ffffff', '#ffffff', '#ffffff', '#451a03']
		},
		{ 
			name: 'Lavande', 
			color: '#7c3aed',
			gradients: {
				card1: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
				card2: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)',
				card3: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
				card4: 'linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)',
				card5: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)'
			},
			textColors: ['#4c1d95', '#ffffff', '#ffffff', '#ffffff', '#2e1065']
		},
		{ 
			name: 'Sunset', 
			color: '#dc2626',
			gradients: {
				card1: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
				card2: 'linear-gradient(135deg, #fca5a5 0%, #f87171 100%)',
				card3: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
				card4: 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)',
				card5: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)'
			},
			textColors: ['#7f1d1d', '#ffffff', '#ffffff', '#ffffff', '#450a0a']
		}
	];

	let currentTheme = $state(themes[3]); // Lavande par défaut

	function changeTheme(theme: any) {
		currentTheme = theme;
		// Appliquer les variables CSS pour le thème
		document.documentElement.style.setProperty('--theme-color', theme.color);
		
		// Appliquer les gradients pour chaque carte
		Object.entries(theme.gradients).forEach(([key, value]) => {
			document.documentElement.style.setProperty(`--gradient-${key}`, value as string);
		});
		
		// Appliquer les couleurs de texte
		theme.textColors.forEach((color: string, index: number) => {
			document.documentElement.style.setProperty(`--text-color-${index + 1}`, color);
		});
	}

	$effect(() => {
		changeTheme(currentTheme);
	});
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

		<!-- SIDEBAR BENTO STYLE -->
		<aside class="sidebar">
			<div class="sidebar-header">
				<div class="logo"> <img src="/image/path1.svg" alt=""> </div>
			
			</div>
			
			<nav class="sidebar-nav">
				<a href="/" class="nav-link" class:active={currentPath === '/'}>
					<span class="nav-icon">🏠</span>
					<span class="nav-text">Accueil</span>
				</a>
				<a href="/propos" class="nav-link" class:active={currentPath === '/propos'}>
					<span class="nav-icon">ℹ️</span>
					<span class="nav-text">À propos</span>
				</a>
				<a href="/services-" class="nav-link" class:active={currentPath === '/services'}>
					<span class="nav-icon">⚙️</span>
					<span class="nav-text">Services</span>
				</a>
				<a href="/produits" class="nav-link" class:active={currentPath === '/produits'}>
					<span class="nav-icon">📦</span>
					<span class="nav-text">Produits</span>
				</a>
				<a href="/contact" class="nav-link" class:active={currentPath === '/contact'}>
					<span class="nav-icon">✉️</span>
					<span class="nav-text">Contact</span>
				</a>
			</nav>

			<div class="sidebar-footer">
				<button class="theme-toggle" on:click={handleToggleMode} type="button">
					<span class="theme-icon-light">☀️</span>
					<span class="theme-icon-dark">🌙</span>
				</button>

				<!-- Sélecteur de thèmes -->
				<div class="theme-selector">
					{#each themes as theme}
						<button
							class="theme-dot"
							class:active={currentTheme.name === theme.name}
							style="background-color: {theme.color}"
							on:click={() => changeTheme(theme)}
							title={theme.name}
							type="button"
						></button>
					{/each}
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
	:global(:root) {
		--theme-color: #7c3aed;
		--gradient-card1: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
		--gradient-card2: linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%);
		--gradient-card3: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
		--gradient-card4: linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%);
		--gradient-card5: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
		--text-color-1: #4c1d95;
		--text-color-2: #ffffff;
		--text-color-3: #ffffff;
		--text-color-4: #ffffff;
		--text-color-5: #2e1065;
	}

	:global(html),
	:global(body) {
		overflow: hidden;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		/* Support pour les appareils mobiles avec barre d'adresse */
		height: 100vh;
		height: 100dvh; /* Dynamic viewport height */
	}

	.layout-wrapper {
		display: flex;
		width: 100%;
		height: 100vh;
		height: 100dvh; /* Utilise la hauteur dynamique du viewport */
		overflow: hidden;
		background: #f8fafc;
		font-family: 'inter', sans-serif;
		transition: background 0.3s ease;
		position: relative;
	}

	:global(.dark) .layout-wrapper {
		background: #0f172a;
	}

	/* === SIDEBAR === */
	.sidebar {
		width: 280px;
		min-width: 280px;
		height: 100vh;
		height: 100dvh;
		background: #ffffff;
		border-right: 1px solid rgba(0, 0, 0, 0.08);
		display: flex;
		flex-direction: column;
		padding: 2rem 1rem;
		z-index: 100;
		position: fixed;
		left: 0;
		top: 0;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		overflow: hidden;
	}

	:global(.dark) .sidebar {
		background: #1e293b;
		border-right: 1px solid rgba(255, 255, 255, 0.1);
	}

	.sidebar-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0 1rem 1.5rem;
		border-bottom: 2px solid rgba(0, 0, 0, 0.05);
		margin-bottom: 1.5rem;
		flex-shrink: 0;
	}

	:global(.dark) .sidebar-header {
		border-bottom: 2px solid rgba(255, 255, 255, 0.1);
	}

	.logo {
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
		max-width: 150px;
		height: auto;
		margin-left: 15%;
	}

	.logo-text {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--theme-color);
	}

	.sidebar-nav {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex: 1;
		overflow: hidden;
		justify-content: center;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 1rem;
		text-decoration: none;
		color: #64748b;
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
		color: #cbd5e1;
	}

	.nav-link::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 4px;
		height: 100%;
		background: var(--theme-color);
		transform: scaleY(0);
		transition: transform 0.3s ease;
		border-radius: 0 4px 4px 0;
	}

	.nav-link:hover {
		background: color-mix(in srgb, var(--theme-color) 10%, transparent);
		color: var(--theme-color);
		transform: translateX(4px);
	}

	:global(.dark) .nav-link:hover {
		background: color-mix(in srgb, var(--theme-color) 20%, transparent);
	}

	.nav-link:hover::before {
		transform: scaleY(1);
	}

	.nav-link.active {
		background: var(--theme-color);
		color: white;
		box-shadow: 0 8px 24px color-mix(in srgb, var(--theme-color) 30%, transparent);
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
		border-top: 2px solid rgba(0, 0, 0, 0.05);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.875rem;
		flex-shrink: 0;
	}

	:global(.dark) .sidebar-footer {
		border-top: 2px solid rgba(255, 255, 255, 0.1);
	}

	.theme-toggle {
		background: color-mix(in srgb, var(--theme-color) 10%, transparent);
		border: none;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		font-size: 1.35rem;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.dark) .theme-toggle {
		background: color-mix(in srgb, var(--theme-color) 20%, transparent);
	}

	.theme-toggle:hover {
		background: var(--theme-color);
		transform: rotate(180deg) scale(1.1);
		box-shadow: 0 4px 12px color-mix(in srgb, var(--theme-color) 30%, transparent);
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

	/* Sélecteur de thèmes */
	.theme-selector {
		display: flex;
		gap: 0.625rem;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	}

	.theme-dot {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 2.5px solid transparent;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
	}

	.theme-dot:hover {
		transform: scale(1.2);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.theme-dot.active {
		border-color: #ffffff;
		box-shadow: 0 0 0 2px currentColor;
		transform: scale(1.15);
	}

	:global(.dark) .theme-dot.active {
		border-color: #1e293b;
	}

	/* === CONTAINER === */
	.container {
		flex: 1;
		height: 100vh;
		height: 100dvh;
		overflow: hidden;
		position: relative;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
	}

	/* === RESPONSIVE === */
	@media (max-width: 1024px) {
		.sidebar {
			width: 80px;
			min-width: 80px;
			padding: 1rem 0.5rem;
		}

		.sidebar:hover {
			width: 280px;
			padding: 2rem 1rem;
			z-index: 200;
		}

		.sidebar-header {
			padding: 0 0.5rem 1rem;
			margin-bottom: 1rem;
		}

		.sidebar:hover .sidebar-header {
			padding: 0 1rem 1.5rem;
			margin-bottom: 1.5rem;
		}

		.logo {
			margin-left: 0;
			max-width: 50px;
			transition: max-width 0.3s ease;
		}

		.sidebar:hover .logo {
			max-width: 150px;
			margin-left: 15%;
		}

		.logo-text,
		.nav-text {
			opacity: 0;
			width: 0;
			overflow: hidden;
			transition: opacity 0.3s ease, width 0.3s ease;
		}

		.sidebar:hover .logo-text,
		.sidebar:hover .nav-text {
			opacity: 1;
			width: auto;
		}

		.nav-link {
			justify-content: center;
			padding: 0.75rem 0.5rem;
		}

		.sidebar:hover .nav-link {
			justify-content: flex-start;
			padding: 0.875rem 1.25rem;
		}

		.sidebar-nav {
			gap: 0.375rem;
		}

		.sidebar:hover .sidebar-nav {
			gap: 0.5rem;
		}
	}

	@media (max-width: 768px) {
		.sidebar {
			width: 70px;
			min-width: 70px;
			padding: 0.875rem 0.375rem;
		}

		.sidebar:hover {
			width: 70px;
			padding: 0.875rem 0.375rem;
		}

		.sidebar-header {
			padding: 0 0 0.875rem;
			margin-bottom: 0.875rem;
			justify-content: center;
		}

		.logo {
			max-width: 38px;
			margin-left: 0;
		}

		.logo-text,
		.nav-text {
			display: none;
		}

		.nav-link {
			justify-content: center;
			padding: 0.75rem 0.375rem;
			gap: 0;
			font-size: 0.875rem;
		}

		.nav-icon {
			font-size: 1.35rem;
		}

		.sidebar-nav {
			gap: 0.3rem;
		}

		.sidebar-footer {
			padding-top: 0.75rem;
			gap: 0.625rem;
		}

		.theme-toggle {
			width: 38px;
			height: 38px;
			font-size: 1.2rem;
		}

		.content {
			padding: 0;
		}

		.theme-selector {
			gap: 0.5rem;
		}

		.theme-dot {
			width: 14px;
			height: 14px;
			border-width: 2px;
		}
	}

	@media (max-width: 480px) {
		.sidebar {
			width: 60px;
			min-width: 60px;
			padding: 0.75rem 0.25rem;
		}

		.sidebar-header {
			padding: 0 0 0.625rem;
			margin-bottom: 0.625rem;
		}

		.logo {
			max-width: 32px;
		}

		.nav-link {
			padding: 0.625rem 0.25rem;
			border-radius: 0.75rem;
		}

		.nav-icon {
			font-size: 1.2rem;
		}

		.sidebar-nav {
			gap: 0.25rem;
		}

		.sidebar-footer {
			padding-top: 0.625rem;
			gap: 0.5rem;
		}

		.theme-toggle {
			width: 34px;
			height: 34px;
			font-size: 1.1rem;
		}

		.theme-dot {
			width: 12px;
			height: 12px;
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
	}
</style>