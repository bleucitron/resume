<script lang="ts">
	import '$lib/assets/index.css';

	import { page } from '$app/state';

	import { setTranslationContext } from '$lib/i18n';

	const lang = $derived(page.url.searchParams.get('lang') ?? 'fr');

	const { children } = $props();

	setTranslationContext(() => lang);
</script>

{@render children()}
