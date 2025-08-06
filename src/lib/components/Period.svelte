<script lang="ts">
	import { DateTime, Duration, type DurationObjectUnits } from 'luxon';

	type Props = {
		from?: string;
		to?: string;
		duration?: DurationObjectUnits;
	};

	const { from, to, duration }: Props = $props();

	const fromDate = $derived(from ? DateTime.fromISO(from, { locale: 'fr' }) : undefined);
	const toDate = $derived(to ? DateTime.fromISO(to, { locale: 'fr' }) : undefined);

	const _duration = $derived(
		duration ??
			(fromDate && (toDate ?? DateTime.now()).diff(fromDate, ['years', 'months']).toObject()),
	);

	const formattedDuration = $derived(
		_duration &&
			Duration.fromObject(_duration).reconfigure({ locale: 'fr' }).toHuman({ listStyle: 'short' }),
	);
	// const formattedDuration = new Intl.DurationFormat('fr-FR', { style: 'long' }).format(duration);
	$inspect(formattedDuration);
</script>

<time class="Period">
	{#if fromDate && toDate}
		<span class="weak">de</span>
		{fromDate.year} <span class="weak">à</span>
		{toDate.year}<span class="weak">,</span>
		{formattedDuration}
	{:else if fromDate}
		<span class="weak">depuis</span> {fromDate.year}
	{:else if duration}
		{formattedDuration}
	{/if}
</time>

<style>
	.Period {
		color: darkorange;
		font-size: 0.9rem;
		text-align: right;
	}
</style>
