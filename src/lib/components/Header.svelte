<script lang="ts">
	import { page } from '$app/state';

	import { getI18n } from '$lib/i18n';

	const t = getI18n();

	type Props = {
		title: string;
		description: string[];
		name: string;
		birth_date: string;
		nationality: string;
	};

	const { locale } = $derived(page.data);

	const { title, description, name, birth_date, nationality }: Props = $props();

	const msToYears = 1 / (1000 * 60 * 60 * 24 * 365.25);
	const age = $derived(Math.floor((Date.now() - new Date(birth_date).getTime()) * msToYears));
</script>

<header class="Header">
	<section>
		<div>
			<h2>{name}</h2>
			<div>
				<p class="weak">{age} {t('ans')}</p>
				{#if locale !== 'fr'}<p class="weak">{nationality}</p>{/if}
			</div>
		</div>

		<h1>{title}</h1>
	</section>

	<ul class="weak">
		{#each description as line}
			<li>{line}</li>
		{/each}
	</ul>
</header>

<style>
	.Header {
		margin-bottom: 2rem;

		@media print {
			margin-bottom: 0;
		}

		section {
			display: flex;
			justify-content: space-between;

			border-bottom: 1px solid var(--black);
		}

		h1 {
			font-size: 1.7rem;
			line-height: 1.1;
			font-weight: normal;
			margin: 0;
			text-align: end;
			align-self: end;

			@media screen and (max-width: 600px) {
				font-size: 1.4rem;
			}
		}

		h2 {
			width: 7ch;
			font-size: 3rem;
			line-height: 0.66;
			margin-block: 0.5rem;

			@media screen and (max-width: 600px) {
				font-size: 1.9rem;
			}
		}

		div:has(h2) {
			display: flex;
			align-items: end;
		}

		ul {
			margin: 0;
			margin-top: 0.1rem;
			padding: 0;
			list-style: none;
		}

		li {
			margin: 0;
			text-align: end;
			white-space: pre;
		}
	}
</style>
