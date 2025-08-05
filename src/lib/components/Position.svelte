<script lang="ts">
	import type { Company, Project } from '$lib/types';
	import Period from './Period.svelte';

	type Props = {
		title: string;
		description?: string;
		company?: Company;
		from: string;
		to?: string;
		tasks?: string[];
		projects?: Project[];
	};

	const { title, description, company, from, to, tasks, projects }: Props = $props();
	$inspect(to);
</script>

<article>
	<header>
		<h4>
			<span>{title}</span>
			{#if company}<span class="weak">chez</span> <a href={company.website}>{company.name}</a>{/if}
		</h4>
		<Period {from} {to} />
	</header>
	{#if description}<p class="description">{description}</p>{/if}

	{#if tasks?.length}
		<ul class="tasks">
			{#each tasks as task}
				<li>{task}</li>
			{/each}
		</ul>
	{:else if projects?.length}
		<ul class="tasks">
			{#each projects as { description, client }}
				<li>{description} pour <a href={client.website}>{client.name}</a></li>
			{/each}
		</ul>
	{/if}
</article>

<style>
	article {
		color: hsl(0 0 60%);
		font-family: Geist Mono;
		margin-block: 1rem;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	h4 {
		color: black;
		/* span:first-child { */
		/* 	color: white; */
		/* 	background: hsl(0 0 30%); */
		/* } */
	}

	h4,
	p {
		margin: 0;
	}

	a {
		color: var(--green);
		transition: all 0.2s ease-in-out;

		&:hover {
			color: white;
			background: var(--green);
		}
	}

	.description {
		margin-block: 0.1rem;
		font-size: 0.9rem;
		color: black;

		&::before {
			content: '❯';
			color: var(--green);
			/* color: black; */
			margin-right: 0.5rem;
			position: relative;
			bottom: 0.09rem;
		}
	}

	.tasks {
		margin: 0;
		font-size: 0.9rem;
		list-style-type: circle;
	}
</style>
