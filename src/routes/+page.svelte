<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Position from '$lib/components/Position.svelte';
	import AoC from '$lib/components/AoC.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import { isLang } from '$lib/icons';
	import Education from '$lib/components/Education.svelte';

	const { data } = $props();

	const { title, description, personal_info, positions, hobbies, aoc, education } = $derived(data);
	const aocStack = $derived(aoc.map((instance) => instance.lang).filter(isLang));

	$inspect(data);
</script>

<Header name={personal_info.name} {title} {description} />

<main>
	<section>
		<h3>Expériences</h3>

		{#each positions as position (position.from + position.to)}
			<Position {...position} />
		{/each}
	</section>

	<section>
		<h3>Fun</h3>
		<ul class="hobbies">
			<li class="hobby">
				<span><AoC instances={aoc} /><Stack stack={aocStack} /></span>
			</li>
			{#each hobbies as hobby (hobby)}
				<li class="hobby">
					<span
						>{hobby}
						{#if hobby.includes('Svelte')}<Stack stack={['svelte']} />{/if}
					</span>
				</li>
			{/each}
		</ul>
	</section>

	<section>
		<h3>Formation</h3>
		<Education {education} />
	</section>
</main>
<footer></footer>

<style>
	h3 {
		font-size: 1.7rem;
	}

	li {
		&::marker {
			color: var(--grey);
		}
	}

	.hobbies {
		list-style-type: hiragana-iroha;
		padding-left: 2rem;
	}

	.hobby {
		span {
			display: inline-flex;
			justify-content: space-between;
			width: 100%;
		}
	}
</style>
