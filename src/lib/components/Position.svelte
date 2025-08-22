<script lang="ts">
	import type { Company, Project } from '$lib/types';

	import { page } from '$app/state';
	import { Duration } from 'luxon';

	import { getTranslationContext } from '$lib/i18n';

	import Period from './Period.svelte';
	import Stack from './Stack.svelte';

	type Props = {
		title: string;
		description?: string;
		company?: Company;
		from: string;
		to?: string;
		projects?: Project[];
		stack?: string[];
	};

	const t = getTranslationContext();

	const { title, description, company, from, to, projects = [], stack = [] }: Props = $props();

	const short = $derived(page.url.searchParams.get('short'));

	function normalizeProjects(projects: Project[]) {
		const filtered = projects.filter((project) => {
			if (typeof project === 'string') return true;

			if (!project.duration) return true;

			const relevant = Duration.fromObject(project.duration).as('week') >= 10;
			return relevant;
		});

		return filtered;
	}

	const normalizedProjects = $derived(normalizeProjects(projects));
</script>

<article class="Position">
	<header>
		<h4>
			<span class="title">{title}</span>
			{#if company}<span class="weak">{t('chez')}</span>
				<a href={company.website} target="_blank" rel="noopener noreferrer">{company.name}</a>{/if}
		</h4>
		<Period {from} {to} />
	</header>
	{#if description}<div class="description">
			<p>{description}</p>
			<Stack {stack} />
		</div>
	{/if}

	{#if projects?.length}
		<ul class={['tasks weak', { hidden: short }]}>
			{#each normalizedProjects as project}
				{@const isString = typeof project === 'string'}
				{@const description = isString ? project : project.description}
				{@const client = isString ? undefined : project.client}
				{@const duration = isString ? undefined : project.duration}
				<li class="task">
					{description}

					{#if client}{t('pour')}
						<a href={client.website} target="_blank" rel="noopener noreferrer">{client.name}</a
						>{/if}{#if duration}, {t('pendant')} <Period {duration} />{/if}
				</li>
			{/each}
		</ul>
	{/if}
</article>

<style>
	.Position {
		color: var(--grey);
		margin-block: 1rem;

		@media screen and (max-width: 1024px) {
			margin-bottom: 2.5rem;
		}

		header {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			margin-block: 0.2rem;
		}

		h4 {
			color: var(--black);
			font-weight: normal;

			.title {
				font-weight: bold;
			}
		}

		h4 {
			margin: 0;
		}

		a {
			color: var(--blue);

			&:hover,
			&:focus {
				background: var(--blue);
				color: white;
			}
		}

		.description {
			display: flex;
			justify-content: space-between;
			margin-block: 0.1rem;
			font-size: 0.9rem;
			color: var(--black);

			@media screen and (max-width: 1024px) {
				display: flex;
				flex-flow: column;
			}

			p::before {
				content: '❯';
				color: var(--blue);
				margin-right: 0.5rem;
				position: relative;
				bottom: 0.09rem;
			}
		}

		.tasks {
			margin: 0;
			list-style-type: circle;

			a,
			:global(time) {
				opacity: 0.9;
			}

			@media screen and (max-width: 840px) {
				padding-left: 1rem;
			}
		}

		&:last-child {
			.description p {
				background-image: linear-gradient(90deg, var(--black), white);
				color: transparent;
				background-clip: text;

				@media print {
					color: inherit;
				}
			}
		}
	}
</style>
