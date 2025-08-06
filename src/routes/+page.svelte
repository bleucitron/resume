<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Position from '$lib/components/Position.svelte';
	import AoC from '$lib/components/AoC.svelte';

	const { data } = $props();

	const { title, description, personal_info, positions, hobbies, aoc } = $derived(data);
	$inspect(data);
</script>

<Header name={personal_info.name} {title} {description} />

<main>
	<section>
		<h3>Expériences</h3>

		{#each positions as position}
			<Position {...position} />
		{/each}
	</section>

	<section>
		<h3>Fun</h3>
		<ul class="hobbies">
			<li class="hobby">
				<AoC instances={aoc} />
			</li>
			{#each hobbies as hobby}
				<li class="hobby">{hobby}</li>
			{/each}
		</ul>
	</section>

	<section>
		<h3>Formation</h3>
	</section>
</main>
<footer></footer>

<style>
	h3 {
		font-size: 1.7rem;
	}

	.hobbies {
		font-family: var(--code-font);
		list-style-type: hiragana-iroha;
		padding-left: 2rem;
	}

	.hobby {
		/* display: inline-flex; */
		/* justify-content: space-between; */
	}

	li {
		&::marker {
			color: var(--grey);
		}
	}
</style>
