<script lang="ts">
	import type { Talk } from '$lib/types';
	import { DateTime } from 'luxon';
	import Stack from './Stack.svelte';

	type Props = {
		talks: Talk[];
	};

	const { talks }: Props = $props();
</script>

<ul class="Talks">
	{#each talks as { name, event, date, link, stack } (name)}
		<li>
			<span>
				{#if link}
					<a href={link} class="name" target="_blank" rel="noopener noreferrer">{name}</a>
				{:else}
					<span class="name">{name}</span>
				{/if}
				<span class="weak"
					>{event.name}, <time datetime={date}>{DateTime.fromISO(date).year}</time></span
				>
			</span>
			<Stack {stack} />
		</li>
	{/each}
</ul>

<style>
	.Talks {
		padding: 0;
		list-style: none;

		li {
			display: flex;
			justify-content: space-between;
		}
	}
</style>
