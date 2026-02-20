<script lang="ts">
	import '@fontsource-variable/open-sans'
	import '@fontsource-variable/raleway'
	import '@fontsource-variable/inter'
	import '../app.css'
	import { initializeLayoutState, setupNavigationEffect, isClient } from './layout.svelte'
	import { ModeWatcher, toggleMode } from 'mode-watcher'
	import Toaster from '$lib/components/shadcn/ui/sonner/sonner.svelte'
	import SmoothScrollBar from '$lib/components/smoothScrollBar/SmoothScrollBar.svelte'
	import { firstLoadComplete } from '$lib/store/initialLoaderStore'
	import { page } from '$app/stores'
	import SmoothScrollBarStore from '$lib/store/SmoothScrollBarStore'
	import { setLocale } from '$lib/paraglide/runtime'
	import Fr from '$lib/components/flag/Fr.svelte'
	import En from '$lib/components/flag/En.svelte'
	import Es from '$lib/components/flag/Es.svelte'
	import It from '$lib/components/flag/It.svelte'
	import De from '$lib/components/flag/De.svelte'
	import Logo from '$lib/components/Logo.svelte'

	let { children } = $props()
	
	$effect(() => {
		initializeLayoutState($page)
		setupNavigationEffect()
	})

	let contentRef = $state<HTMLElement | null>(null)
	let contentHeight = $state(0)

	$effect(() => {
		if (!contentRef) return
		const observer = new ResizeObserver(() => {
			if (contentRef) contentHeight = contentRef.clientHeight
			SmoothScrollBarStore.update(state => {
				if (state.smoothScroll) state.smoothScroll.update()
				return state
			})
		})
		observer.observe(contentRef)
		return () => observer.disconnect()
	})

	let currentPath = $state('/')
	$effect(() => {
		currentPath = $page.url.pathname
	})

	function handleToggleMode(event: MouseEvent) {
		event.preventDefault()
		toggleMode()
	}

	let currentLanguage = $state<'fr' | 'en' | 'es' | 'it' | 'de'>('fr')
	$effect(() => {
		if (typeof window !== 'undefined') {
			const savedLanguage = localStorage.getItem('selectedLanguage')
			if (savedLanguage && ['fr', 'en', 'es', 'it', 'de'].includes(savedLanguage)) {
				currentLanguage = savedLanguage as 'fr' | 'en' | 'es' | 'it' | 'de'
				setLocale(savedLanguage)
			}
		}
	})

	const translations = {
		fr: { home:'Accueil', about:'À propos', services:'Services', products:'Produits', contact:'Contact' },
		en: { home:'Home', about:'About', services:'Services', products:'Products', contact:'Contact' },
		es: { home:'Inicio', about:'Acerca de', services:'Servicios', products:'Productos', contact:'Contacto' },
		it: { home:'Inizio', about:'Chi siamo', services:'Servizi', products:'Prodotti', contact:'Contatto' },
		de: { home:'Startseite', about:'Über uns', services:'Dienstleistungen', products:'Produkte', contact:'Kontakt' }
	}

	function changeLanguage(lang: 'fr' | 'en' | 'es' | 'it' | 'de') {
		currentLanguage = lang
		setLocale(lang)
		if (typeof window !== 'undefined') localStorage.setItem('selectedLanguage', lang)
	}

	let isSidebarOpen = $state(false)
	let isFlagSelectorOpen = $state(false)

	const flagComponents = {
		fr: Fr,
		en: En,
		es: Es,
		it: It,
		de: De
	}
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" />
	<meta name="viewport" content="width=device-width" />
	<link rel="manifest" href="/pwa/manifest.webmanifest" />
	<meta name="theme-color" content="#6366f1" />
</svelte:head>

{#if !$firstLoadComplete}
{/if}

{#if $isClient}
<div class="layout-wrapper">
	<ModeWatcher />

	<div 
		class="sidebar-overlay" 
		class:active={isSidebarOpen || isFlagSelectorOpen}
		on:click={() => { isSidebarOpen = false; isFlagSelectorOpen = false; }}
		role="button"
		tabindex="-1">
	</div>

	<aside class="sidebar" class:mobile-expanded={isSidebarOpen}>
		<div class="sidebar-header">
			<a href="https://bit.ly/GRG-Group-FnB" target="_blank" class="logo-link">
				<Logo />
			</a>
		</div>
		
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
				on:click|stopPropagation={() => isSidebarOpen = false}>
				<span class="nav-icon">🏠</span>
				<span class="nav-text">{translations[currentLanguage].home}</span>
			</a>
			<a 
				href="/propos" 
				class="nav-link" 
				class:active={currentPath === '/propos'}
				on:click|stopPropagation={() => isSidebarOpen = false}>
				<span class="nav-icon">ℹ️</span>
				<span class="nav-text">{translations[currentLanguage].about}</span>
			</a>
			<a 
				href="/services-" 
				class="nav-link" 
				class:active={currentPath === '/services-'}
				on:click|stopPropagation={() => isSidebarOpen = false}>
				<span class="nav-icon">⚙️</span>
				<span class="nav-text">{translations[currentLanguage].services}</span>
			</a>
			<a 
				href="/produits" 
				class="nav-link" 
				class:active={currentPath === '/produits'}
				on:click|stopPropagation={() => isSidebarOpen = false}>
				<span class="nav-icon">📦</span>
				<span class="nav-text">{translations[currentLanguage].products}</span>
			</a>
			<a 
				href="/contact" 
				class="nav-link" 
				class:active={currentPath === '/contact'}
				on:click|stopPropagation={() => isSidebarOpen = false}>
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
				<div class="desktop-flags">
					<button 
						class="language-button"
						class:active={currentLanguage === 'fr'}
						on:click={() => changeLanguage('fr')}
						type="button">
						<Fr/>
					</button>
					<button 
						class="language-button"
						class:active={currentLanguage === 'en'}
						on:click={() => changeLanguage('en')}
						type="button">
						<En/>
					</button>
					<button 
						class="language-button"
						class:active={currentLanguage === 'es'}
						on:click={() => changeLanguage('es')}
						type="button">
						<Es/>
					</button>
					<button 
						class="language-button"
						class:active={currentLanguage === 'it'}
						on:click={() => changeLanguage('it')}
						type="button">
						<It/>
					</button>
					<button 
						class="language-button"
						class:active={currentLanguage === 'de'}
						on:click={() => changeLanguage('de')}
						type="button">
						<De/>
					</button>
				</div>

				<button 
					class="flag-toggle" 
					on:click|stopPropagation={() => { 
						isFlagSelectorOpen = !isFlagSelectorOpen
						if (isSidebarOpen) isSidebarOpen = false
					}}
					type="button">
					<span class="flag-icon">
						<svelte:component this={flagComponents[currentLanguage]} />
					</span>
				</button>
			</div>
		</div>
	</aside>

	{#if isFlagSelectorOpen}
	<div class="flag-selector-wrapper" on:click|stopPropagation>
		<div class="flag-selector-panel">
			<button 
				class="flag-button"
				class:active={currentLanguage === 'fr'}
				on:click|stopPropagation={() => { changeLanguage('fr'); isFlagSelectorOpen = false; }}
				type="button">
				<Fr/>
			</button>
			<button 
				class="flag-button"
				class:active={currentLanguage === 'en'}
				on:click|stopPropagation={() => { changeLanguage('en'); isFlagSelectorOpen = false; }}
				type="button">
				<En/>
			</button>
			<button 
				class="flag-button"
				class:active={currentLanguage === 'es'}
				on:click|stopPropagation={() => { changeLanguage('es'); isFlagSelectorOpen = false; }}
				type="button">
				<Es/>
			</button>
			<button 
				class="flag-button"
				class:active={currentLanguage === 'it'}
				on:click|stopPropagation={() => { changeLanguage('it'); isFlagSelectorOpen = false; }}
				type="button">
				<It/>
			</button>
			<button 
				class="flag-button"
				class:active={currentLanguage === 'de'}
				on:click|stopPropagation={() => { changeLanguage('de'); isFlagSelectorOpen = false; }}
				type="button">
					<De/>
			</button>
		</div>
	</div>
	{/if}

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
  --sidebar-width: 300px;
}

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

.sidebar {
	width: var(--sidebar-width);
	min-width: var(--sidebar-width);
	height: 100vh;
	height: 100dvh;
	background: #ffffff;
	border-right: 1px solid var(--gray-200, #e5e5e5);
	display: flex;
	flex-direction: column;
	padding: 1.5rem 0;
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

.sidebar-header {
	padding: 0 1rem 1.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.logo-link {
	display: block;
	width: 100%;
	text-align: center;
}

.logo-image {
	width: auto;
	height: auto;
	max-width: 250px;
	max-height: 380px;
	margin: 1.5rem auto;
	object-fit: contain;
}


.sidebar-nav {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
	flex: 1;
	padding: 0 1rem;
	overflow-y: auto;
	overflow-x: hidden;
}

.nav-link {
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	color: var(--gray-600, #525252);
	font-weight: 600;
	font-size: 1rem;
	padding: 0.75rem 1rem;
	border-radius: 10px;
	transition: all 0.3s ease;
	white-space: nowrap;
	min-height: 44px;
	width: 100%;
	max-width: 180px;
	text-align: center;
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
	display: none;
}

.nav-text {
	width: auto;
}

.sidebar-footer {
	padding: 1rem 1rem 0.75rem;
	border-top: 1px solid var(--gray-200, #e5e5e5);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.75rem;
	flex-shrink: 0;
	margin-top: auto;
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
	font-size: 1.1rem;
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

.language-selector {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	width: 100%;
}

.desktop-flags {
	display: flex;
	gap: 0.4rem;
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
	width: 30px;
	height: 30px;
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

.flag-toggle {
	display: none;
}

.flag-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}

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

@media (max-width: 1024px) {
	:root {
		--sidebar-width: 200px;
		--sidebar-width-expanded: 200px;
	}
	
	.sidebar {
		padding: 1.25rem 0;
	}
	
	.logo-image {
		max-width: 120px;
		max-height: 130px;
	}
	
	.nav-link {
		padding: 0.65rem 0.85rem;
		font-size: 0.95rem;
		max-width: 160px;
	}
}

@media (max-width: 768px) {
	:root {
		--sidebar-width-collapsed: 50px;
		--sidebar-width-expanded: 180px;
	}
	
	.sidebar {
		width: var(--sidebar-width-collapsed);
		min-width: var(--sidebar-width-collapsed);
		padding: 0.75rem 0;
		transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		flex-direction: column;
	}
	
	.sidebar.mobile-expanded {
		width: var(--sidebar-width-expanded);
		box-shadow: 4px 0 15px rgba(0, 0, 0, 0.15);
		z-index: 1000;
	}
	
	.sidebar-header {
		padding: 0.75rem 0.5rem;
		margin: 0 0.25rem 0.75rem;
		border-bottom: 1px solid var(--gray-200, #e5e5e5);
		min-height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
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
		text-align: center;
		width: 100%;
	}
	
	.sidebar.mobile-expanded .logo-link {
		opacity: 1;
		max-height: 90px;
	}
	
	.logo-image {
		max-width: 150px;
		max-height: 250px;
		margin: 0 auto;
		width: 100%;
		height: auto;
		object-fit: contain;
	}
	
	.sidebar-nav {
		padding: 0 0.5rem;
		gap: 0.25rem;
		cursor: pointer;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0;
		height: calc(100% - 140px);
		overflow-y: auto;
	}
	
	.nav-link {
		padding: 0.5rem;
		min-height: 40px;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		width: 100%;
		max-width: none;
		position: relative;
		border-radius: 8px;
		margin: 1rem;
	}
	
	.nav-icon {
		display: flex;
		font-size: 1.2rem;
		width: 24px;
		height: 24px;
		align-items: center;
		justify-content: center;
		opacity: 1;
		transition: opacity 0.2s ease;
		flex-shrink: 0;
		margin: 0 auto;
	}
	
	.sidebar.mobile-expanded .nav-icon {
		opacity: 0;
		width: 0;
		display: none;
	}
	
	.nav-text {
		opacity: 0;
		width: 0;
		font-size: 0.85rem;
		font-weight: 500;
		transition: opacity 0.3s ease;
		white-space: nowrap;
		overflow: hidden;
		text-align: center;
		flex-grow: 1;
		padding: 0;
	}
	
	.sidebar.mobile-expanded .nav-text {
		opacity: 1;
		width: 100%;
		padding: 0;
		text-align: center;
	}
	
	.sidebar-footer {
		padding: 0.75rem 0.5rem 0.5rem;
		gap: 0.5rem;
		flex-shrink: 0;
		margin-top: auto;
		border-top: 1px solid var(--gray-200, #e5e5e5);
		min-height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	
	:global(.dark) .sidebar-footer {
		border-top: 1px solid var(--gray-700, #404040);
	}
	
	.theme-toggle {
		width: 36px;
		height: 36px;
		font-size: 1rem;
	}
	
	.language-selector {
		gap: 0.4rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.desktop-flags {
		display: none;
	}
	
	.flag-toggle {
		display: flex;
		background: var(--gray-100, #f5f5f5);
		border: none;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.3s ease;
		align-items: center;
		justify-content: center;
		padding: 3px;
		overflow: hidden;
	}
	
	:global(.dark) .flag-toggle {
		background: var(--gray-700, #404040);
	}
	
	.flag-toggle:hover {
		background: var(--gray-300, #d4d4d4);
		transform: scale(1.1);
	}
	
	:global(.dark) .flag-toggle:hover {
		background: var(--gray-600, #525252);
	}
	
	.container {
		left: var(--sidebar-width-collapsed);
		width: calc(100vw - var(--sidebar-width-collapsed));
		transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.sidebar.mobile-expanded ~ .container {
		left: var(--sidebar-width-expanded);
		width: calc(100vw - var(--sidebar-width-expanded));
	}
	
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
		border-radius: 8px;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		min-width: 120px;
		margin-left: 0.25rem;
		pointer-events: auto;
		animation: slideIn 0.2s ease-out;
	}
	
	:global(.dark) .flag-selector-panel {
		background: var(--gray-800, #262626);
		border: 1px solid var(--gray-700, #404040);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
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
		from { opacity: 0; transform: translateY(8px) }
		to { opacity: 1; transform: translateY(0) }
	}
}

@media (max-width: 480px) {
	:root {
		--sidebar-width-collapsed: 48px;
		--sidebar-width-expanded: 160px;
	}
	
	.sidebar {
		padding: 0.5rem 0;
	}
	
	.nav-link {
		padding: 0.4rem;
		min-height: 36px;
	}
	
	.nav-icon {
		font-size: 1.1rem;
		width: 22px;
		height: 22px;
	}
	
	.nav-text {
		font-size: 0.8rem;
	}
	
	.sidebar-footer {
		padding: 0.5rem 0.25rem 0.25rem;
		min-height: 70px;
	}
	
	.theme-toggle, .flag-toggle {
		width: 32px;
		height: 32px;
	}
}

@supports (padding: max(0px)) {
	.sidebar {
		padding-top: max(0.75rem, env(safe-area-inset-top));
		padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
	}
}
</style>