<script lang="ts">
	import { DateTime } from 'luxon';

	type Course = {
		title: string;
		school: string;
		location: string;
		from: string;
		to: string;
		info?: string;
	};
	type Props = {
		education: Course[];
	};

	const { education }: Props = $props();
</script>

<ul class="Education">
	{#each education as { title, school, location, to, info } (school)}
		{@const year = DateTime.fromISO(to).year}
		<li class="course">
			<div><span>{year}.</span> {title} <span class="school">{school} ({location})</span></div>
			{#if info}<div class="info"><span>└</span> {info}</div>{/if}
		</li>
	{/each}
</ul>

<style>
	.Education {
		list-style-type: none;
		padding: 0;

		li {
			span {
				color: var(--grey);
			}
		}

		.info {
			color: var(--grey);
			font-style: italic;
			padding-left: 6ch;

			span {
				font-style: normal;
			}
		}

		.school {
			font-size: 0.9rem;
		}
	}
</style>
