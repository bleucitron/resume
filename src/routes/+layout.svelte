<script lang="ts">
	import '$lib/assets/index.css';

	import { page } from '$app/state';

	import { setI18n } from '$lib/i18n';

	const locale = $derived(page.data.locale);

	const { children } = $props();

	setI18n(() => locale);
</script>

{@render children()}
