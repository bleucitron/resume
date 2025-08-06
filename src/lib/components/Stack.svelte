<script lang="ts">
	import { langById, type LangId } from '$lib/icons';
	import Lang from './Lang.svelte';

	type Props = {
		stack?: LangId[];
	};

	const { stack = [] }: Props = $props();

	// sveltekit is not available as icon
	const cleanStack = $derived(stack.filter((lang) => Object.keys(langById).includes(lang)));
</script>

<div class="Stack">
	{#each cleanStack as id (id)}
		<Lang {id} />
	{/each}
</div>

<style>
	.Stack {
		display: inline-flex;
		gap: 0.5rem;
	}
</style>
