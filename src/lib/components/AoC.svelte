<script lang="ts">
	import { isLang, langById } from '$lib/icons';
	import Lang from './Lang.svelte';
	import Stack from './Stack.svelte';

	type Props = {
		instances: { year: number; lang: string; score: number }[];
	};

	const { instances }: Props = $props();
	const stack = $derived(instances.map((instance) => instance.lang).filter(isLang));
</script>

<span class="AoC"
	><span
		>Advent of Code {#each instances as { year, lang, score } (year)}
			{#if isLang(lang)}
				{year} ({langById[lang].name}
				{score}<span class="star">*</span>),&nbsp;
			{/if}
		{/each}</span
	><Stack {stack} /></span
>

<style>
	.AoC {
		display: inline-flex;
		width: 100%;
		justify-content: space-between;

		.star {
			color: orange;
		}
	}
</style>
