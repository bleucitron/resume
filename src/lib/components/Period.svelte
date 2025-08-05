<script lang="ts">
	import { DateTime, Duration } from 'luxon';

	type Props = {
		from: string;
		to?: string;
	};

	const { from, to }: Props = $props();

	const fromDate = DateTime.fromISO(from, { locale: 'fr' });
	const toDate = to ? DateTime.fromISO(to, { locale: 'fr' }) : undefined;
	const duration = (toDate ?? DateTime.now()).diff(fromDate, ['years', 'months']).toObject();

	const formattedDuration = Duration.fromObject(duration)
		.reconfigure({ locale: 'fr' })
		.toHuman({ listStyle: 'short' });
	// const formattedDuration = new Intl.DurationFormat('fr-FR', { style: 'long' }).format(duration);
	$inspect(formattedDuration);
</script>

{#if fromDate && toDate}
	<time
		><span class="weak">de</span>
		{fromDate.year} <span class="weak">à</span>
		{toDate.year}<span class="weak">,</span>
		{formattedDuration}</time
	>
{:else if fromDate}
	<time><span class="weak">depuis</span> {fromDate.year}</time>
{/if}

<style>
	time {
		color: darkorange;
		font-size: 0.9rem;
		text-align: right;
	}
</style>
