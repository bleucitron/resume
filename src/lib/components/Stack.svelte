<script lang="ts">
	import { isLang } from '$lib/icons';
	import Lang from './Lang.svelte';

	type Props = {
		stack?: string[];
		verbose?: boolean;
	};

	const { stack = [], verbose = false }: Props = $props();

	const cleanStack = $derived(stack.filter(isLang));
</script>

<div class="Stack">
	{#each cleanStack as id (id)}
		<Lang {id} {verbose} />
	{/each}
</div>

<style>
	.Stack {
		display: inline-flex;
		gap: 0.5rem;
		margin: var(--margin, none);
		font-size: var(--font-size, inherit);

		@media screen and (max-width: 1024px) {
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
		}
		@media screen and (max-width: 840px) {
			justify-content: center;
			font-size: inherit;
			margin-block: 0.2rem;
		}
	}
</style>
