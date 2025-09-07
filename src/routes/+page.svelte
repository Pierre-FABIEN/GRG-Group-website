<script lang="ts">
	import '@fontsource-variable/open-sans';
	import '@fontsource-variable/raleway';
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { mode } from 'mode-watcher';
	import { Power } from 'lucide-svelte';
	import { isSmall } from '$lib/store/mediaStore';
	import { page } from '$app/stores';
	import SEO from '$lib/components/SEO.svelte';

	let animateLines = $state(false); // Contrôle de l'animation des lignes

	function handleClick() {
		goto('/atelier');
	}

	let strokeColor = $state('black');

	$effect(() => {
		/* se relance automatiquement quand mode.current change */
		strokeColor = mode.current === 'light' ? '#00021a' : '#00c2ff';
	});

	const onHoverButton = () => {
		animateLines = !animateLines;
	};

	$effect(() => {
		// Les deux lectures ci-dessous sont les dépendances ;
		// le $effect se relancera si l'une change.
		const path = $page.url.pathname;
		const small = $isSmall;

	});
</script>

<div class=" bg-amber-400 w-screen h-screen ccc">
	Accueil
</div>

<div class=" bg-amber-600 w-screen h-screen ccc">
	propos
</div>

<div class=" bg-amber-600 w-screen h-screen ccc">
	product
</div>

<div class=" bg-amber-600 w-screen h-screen ccc">
	product
</div>

<div class=" bg-amber-600 w-screen h-screen ccc">
	links
</div>