<script lang="ts">
	import { isLang, langById } from '$lib/icons';

	type Instance = {
		year: number;
		lang: string;
		score: number;
	};

	type Props = {
		instances: Instance[];
	};

	const { instances }: Props = $props();
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

<span class="AoC">Advent of Code {@render scores({ instances })}</span>

<style>
	.AoC {
		:global(.star) {
			color: orange;
		}
	}
</style>
