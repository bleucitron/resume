<script lang="ts">
	import { isLang, langById } from '$lib/icons';
	import Stack from './Stack.svelte';

	type Instance = {
		year: number;
		lang: string;
		score: number;
	};

	type Props = {
		instances: Instance[];
	};

	const { instances }: Props = $props();
	const stack = $derived(instances.map((instance) => instance.lang).filter(isLang));
</script>

{#snippet score({ year, lang, score }: Instance)}
	{#if isLang(lang)}
		{year} ({langById[lang].name} {score}<span class="star">*</span>)
	{/if}
{/snippet}

{#snippet scores({ instances }: Props)}
	{#each instances as instance, i (instance.year)}{@render score(
			instance,
		)}{#if i < instances.length - 1},&nbsp;
		{/if}{/each}
{/snippet}

<span class="AoC"><span>Advent of Code {@render scores({ instances })}</span><Stack {stack} /></span
>

<style>
	.AoC {
		display: inline-flex;
		width: 100%;
		justify-content: space-between;

		:global(.star) {
			color: orange;
		}
	}
</style>
