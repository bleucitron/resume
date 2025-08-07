<script lang="ts">
	import { isLang } from '$lib/icons';
	import Lang from './Lang.svelte';

	type Props = {
		stack?: string[];
	};

	const { stack = [] }: Props = $props();

	const cleanStack = $derived(stack.filter(isLang));
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
