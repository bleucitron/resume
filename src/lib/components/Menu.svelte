<script lang="ts">
	import { page } from '$app/state';
	import { elasticOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { scrollY } from 'svelte/reactivity/window';
	import { getI18n } from '$lib/i18n';
	import { clickOutside } from '$lib/attachments';

	const t = getI18n();

	const transitionParams = { duration: 600, easing: elasticOut };

	let open = $state(false);

	const short = $derived(!!page.url.searchParams.get('short') || false);
	const { locale } = $derived(page.data);

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

	function toShort(v: boolean) {
		const params = new URL(page.url).searchParams;

		if (!v) params.delete('short');
		else params.set('short', 'true');

		return params.toString();
	}

	function toLocale(lang: 'fr' | 'en' | 'es') {
		const params = new URL(page.url).searchParams;
		params.set('lang', lang);

		return params.toString();
	}
</script>

<div class="Menu" {@attach clickOutside(close)}>
	{#if open}
		<menu in:scale={transitionParams}>
			<section>
				<a href="?{toShort(true)}" class={{ current: short }} data-sveltekit-noscroll
					>{t('résumé')}</a
				>
				<a href="?{toShort(false)}" class={{ current: !short }} data-sveltekit-noscroll
					>{t('détaillé')}</a
				>
			</section>
			<section>
				<a href="?{toLocale('fr')}" class={{ current: locale === 'fr' }} data-sveltekit-noscroll
					>fr</a
				>
				<a href="?{toLocale('en')}" class={{ current: locale === 'en' }} data-sveltekit-noscroll
					>en</a
				>
				<!-- <a href={addLang('es')} class={{ current: lang === 'es' }} data-sveltekit-noscroll>es</a> -->
			</section>
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
			box-shadow: 0 1px 5px var(--light-grey);
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
				background: var(--black);
				aspect-ratio: 1 / 1;
			}
		}

		@media print {
			display: none;
		}
	}
</style>
