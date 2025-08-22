<script lang="ts">
	import { DateTime, Duration, type DurationObjectUnits } from 'luxon';

	import { getTranslationContext } from '$lib/i18n';
	import { page } from '$app/state';

	type Props = {
		from?: string;
		to?: string;
		duration?: DurationObjectUnits;
	};

	const t = getTranslationContext();

	const locale = $derived(page.url.searchParams.get('lang') ?? 'fr');

	const { from, to, duration: d }: Props = $props();

	const fromDate = $derived(from ? DateTime.fromISO(from, { locale }) : undefined);
	const toDate = $derived(to ? DateTime.fromISO(to, { locale }) : undefined);

	const durationObject = $derived(
		d ?? (fromDate && (toDate ?? DateTime.now()).diff(fromDate, ['years', 'months']).toObject()),
	);

	const duration = $derived(
		durationObject && Duration.fromObject(durationObject).reconfigure({ locale }),
	);

	const formattedDuration = $derived(
		duration?.toHuman({
			listStyle: 'short',
			maximumSignificantDigits: 1,
		}),
	);
</script>

<time class="Period" title={formattedDuration}>
	{#if fromDate && toDate}
		<span class="weak">{t('de')}</span>
		{fromDate.year} <span class="weak">{t('à')}</span>
		{toDate.year}<span class="weak"></span>
	{:else if fromDate}
		<span class="weak">{t('depuis')}</span>
		{fromDate.year}
	{:else if d}
		{formattedDuration}
	{/if}
</time>

<style>
	.Period {
		color: var(--orange);
		font-size: 0.9rem;
		text-align: right;
	}
</style>
