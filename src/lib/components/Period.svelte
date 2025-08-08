<script lang="ts">
	import { DateTime, Duration, type DurationObjectUnits } from 'luxon';

	type Props = {
		from?: string;
		to?: string;
		duration?: DurationObjectUnits;
	};

	const { from, to, duration: d }: Props = $props();

	const fromDate = $derived(from ? DateTime.fromISO(from, { locale: 'fr' }) : undefined);
	const toDate = $derived(to ? DateTime.fromISO(to, { locale: 'fr' }) : undefined);

	const durationObject = $derived(
		d ?? (fromDate && (toDate ?? DateTime.now()).diff(fromDate, ['years', 'months']).toObject()),
	);

	const duration = $derived(
		durationObject && Duration.fromObject(durationObject).reconfigure({ locale: 'fr' }),
		// Duration.fromObject(durationObject).shiftTo('years').reconfigure({ locale: 'fr' }),
	);

	$inspect('duration', duration?.toObject());

	const formattedDuration = $derived(
		duration?.toHuman({
			listStyle: 'short',
			// minimumFractionDigits: 1,
			maximumSignificantDigits: 1,
			// roundingMode: 'halfExpand',
		}),
	);
	// const formattedDuration = new Intl.DurationFormat('fr-FR', { style: 'long' }).format(duration);
	$inspect(formattedDuration, parseFloat(formattedDuration?.replace(',', '.') ?? ''));
</script>

<time class="Period" title={formattedDuration}>
	{#if fromDate && toDate}
		<span class="weak">de</span>
		{fromDate.year} <span class="weak">à</span>
		{toDate.year}<span class="weak"></span>
	{:else if fromDate}
		<span class="weak">depuis</span>
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
