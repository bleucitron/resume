<script lang="ts">
	import { page } from '$app/state';
	import { elasticOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { scrollY } from 'svelte/reactivity/window';

	const transitionParams = { duration: 600, easing: elasticOut };

	let open = $state(false);

	const short = $derived(page.url.searchParams.get('short'));
	const lang = $derived(page.url.searchParams.get('lang') ?? 'fr');

	$effect(() => {
		if (scrollY.current) open = false;
	});

	function toggle(e: Event) {
		e.stopPropagation();
		open = !open;
	}
	function close() {
		open = false;
	}
</script>

<svelte:document onclick={close} />

<div class="Menu">
	{#if open}
		<menu in:scale={transitionParams}>
			<section>
				<a href=".?short=true" class={{ current: short }} data-sveltekit-noscroll>résumé</a>
				<a href="." class={{ current: !short }} data-sveltekit-noscroll>détaillé</a>
			</section>
			<!-- <section> -->
			<!-- 	<a href=".?lang=fr" class={{ current: lang === 'fr' }} data-sveltekit-noscroll>fr</a> -->
			<!-- 	<a href=".?lang=en" class={{ current: lang === 'en' }} data-sveltekit-noscroll>en</a> -->
			<!-- 	<a href=".?lang=es" class={{ current: lang === 'es' }} data-sveltekit-noscroll>es</a> -->
			<!-- </section> -->
		</menu>
	{:else}
		<button in:scale={transitionParams} onclick={toggle} aria-labelledby="Ouvrir le menu"
			><div></div></button
		>
	{/if}
</div>

<style>
	.Menu {
		position: fixed;
		top: 0;
		right: 0;

		margin: 0.5rem;
		padding: 0;
		font-size: 0.9rem;
		color: var(--grey);

		menu {
			padding: 0;
			margin: 0;
		}

		section {
			display: flex;
			gap: 0.5rem;
			justify-content: flex-end;
			margin-bottom: 0.5rem;
		}

		a {
			padding: 0.5rem;
			box-shadow: 0 1px 5px lightgrey;
			backdrop-filter: blur(5px);
			border-radius: 5px;

			&:hover,
			&:focus {
				color: var(--black);
				background: inherit;

				&:not(.current) {
					box-shadow: 0 1px 5px var(--grey);
				}
			}
		}

		.current {
			color: white;
			background: var(--black);
			cursor: default;
			transition: none;

			&:hover {
				color: white;
				background: var(--black);
			}
		}

		button {
			height: 1.5rem;
			width: 1.5rem;
			border: none;
			background: none;
			outline: 1px solid var(--grey);
			padding: 2px;
			border-radius: 50%;
			box-shadow: none;
			cursor: pointer;
			transition: padding 0.1s ease-in;

			&:hover {
				padding: 4px;
			}

			div {
				border-radius: 50%;
				background: black;
				aspect-ratio: 1 / 1;
			}
		}

		@media print {
			display: none;
		}
	}
</style>
