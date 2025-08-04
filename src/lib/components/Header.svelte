<script lang="ts">
	type Props = { title: string; description: string; name: string };

	const { title, description, name }: Props = $props();
</script>

<header>
	<section>
		<h2>{name}</h2>

		<h1>{title}</h1>
	</section>
	<p>{description}</p>
</header>

<style>
	section {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid black;
	}

	p {
		margin: 0;
		text-align: end;
		white-space: pre;
	}

	h1 {
		font-family: 'Geist Mono';
		font-size: 1.7rem;
		font-weight: normal;
		margin: 0;
		text-align: end;
		align-self: end;
	}
</style>
