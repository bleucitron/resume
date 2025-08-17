<script lang="ts">
	import { page } from '$app/state';

	const short = $derived(page.url.searchParams.get('short'));
	const lang = $derived(page.url.searchParams.get('lang') ?? 'fr');
</script>

<menu class="Menu">
	<section>
		<a href=".?short=true" class={{ current: short }} data-sveltekit-noscroll>résumé</a>
		<a href="." class={{ current: !short }} data-sveltekit-noscroll>détaillé</a>
	</section>
	<section>
		<a href=".?lang=fr" class={{ current: lang === 'fr' }} data-sveltekit-noscroll>fr</a>
		<a href=".?lang=en" class={{ current: lang === 'en' }} data-sveltekit-noscroll>en</a>
		<a href=".?lang=es" class={{ current: lang === 'es' }} data-sveltekit-noscroll>es</a>
	</section>
</menu>

<style>
	.Menu {
		position: fixed;
		top: 0;
		right: 0;

		margin: 0.5rem;
		padding: 0;
		font-size: 0.9rem;
		color: var(--grey);

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

		@media print {
			display: none;
		}
	}
</style>
