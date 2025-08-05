<script lang="ts">
	import { iconByLang, type Lang } from '$lib/icons';

	type Props = {
		stack?: Lang[];
	};

	const { stack = [] }: Props = $props();

	// sveltekit is not available as icon
	const cleanStack = $derived(stack.filter((lang) => Object.keys(iconByLang).includes(lang)));
</script>

<div class="Stack">
	{#each cleanStack as icon (icon)}
		<i class="nf {iconByLang[icon]}"></i>
	{/each}
</div>

<style>
	.Stack {
		display: flex;
		gap: 0.5rem;
	}
</style>
