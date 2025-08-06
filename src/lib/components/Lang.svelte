<script lang="ts">
	import { langById, type LangId } from '$lib/icons';

	type Props = {
		id: LangId;
		verbose?: boolean;
	};

	const { id, verbose = false }: Props = $props();

	const { icon, name } = $derived(langById[id]);
</script>

<span title={name}
	>{#if verbose}{name}{/if}<i class="nf {icon}"></i></span
>

<style>
	span {
		display: inline-flex;
		align-items: center;
	}
</style>
