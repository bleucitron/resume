<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Position from '$lib/components/Position.svelte';

	const { data } = $props();

	const { title, description, personal_info, positions } = $derived(data);
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
</style>
