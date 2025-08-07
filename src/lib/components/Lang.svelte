<script lang="ts">
	import { langById, type LangId } from '$lib/icons';

	type Props = {
		id: LangId;
		verbose?: boolean;
	};

	const { id, verbose = false }: Props = $props();

	const { icon, name } = $derived(langById[id]);
</script>

<span class="Lang" title={name}
	><i class="nf {icon}"></i>{#if verbose}&nbsp;{name}{/if}</span
>

<style>
	.Lang {
		display: inline-flex;
		align-items: center;
	}
</style>
