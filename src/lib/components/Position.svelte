<script lang="ts">
	import type { Company, Project } from '$lib/types';

	import { Duration } from 'luxon';

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

	const { title, description, company, from, to, projects = [], stack = [] }: Props = $props();

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
			{#if company}<span class="weak">chez</span>
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
		<ul class="tasks weak">
			{#each normalizedProjects as project}
				{@const isString = typeof project === 'string'}
				{@const description = isString ? project : project.description}
				{@const client = isString ? undefined : project.client}
				{@const duration = isString ? undefined : project.duration}
				<li>
					{description}

					{#if client}pour
						<a href={client.website} target="_blank" rel="noopener noreferrer">{client.name}</a
						>{/if}{#if duration}, pendant <Period {duration} />{/if}
				</li>
			{/each}
		</ul>
	{/if}
</article>

<style>
	.Position {
		color: var(--grey);
		margin-block: 1rem;

		header {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			margin-block: 0.2rem;
		}

		h4 {
			color: black;
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
			color: black;

			p::before {
				content: '❯';
				color: var(--blue);
				margin-right: 0.5rem;
				position: relative;
				bottom: 0.09rem;
			}
		}

		.tasks {
			/* display: none; */
			margin: 0;
			list-style-type: circle;

			a,
			:global(time) {
				opacity: 0.9;
			}
		}

		&:last-child {
			.description p {
				background-image: linear-gradient(90deg, black, white);
				color: transparent;
				background-clip: text;

				@media print {
					color: inherit;
				}
			}
		}
	}
</style>
