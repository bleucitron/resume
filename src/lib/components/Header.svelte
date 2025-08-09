<script lang="ts">
	type Props = { title: string; description: string[]; name: string; birth_date: string };

	const { title, description, name, birth_date }: Props = $props();

	const msToYears = 1 / (1000 * 60 * 60 * 24 * 365.25);
	const age = $derived(Math.floor((Date.now() - new Date(birth_date).getTime()) * msToYears));
</script>

<header class="Header">
	<section>
		<div>
			<h2>{name}</h2>
			<p class="weak">{age} ans</p>
		</div>

		<h1>{title}</h1>
	</section>

	<ul class="weak">
		{#each description as line}
			<li>{line}</li>
		{/each}
	</ul>
</header>

<style>
	.Header {
		margin-bottom: 2rem;

		@media print {
			margin-bottom: 1rem;
		}

		section {
			display: flex;
			justify-content: space-between;

			border-bottom: 1px solid var(--black);
		}

		h1 {
			font-size: 1.7rem;
			line-height: 1.1;
			font-weight: normal;
			margin: 0;
			text-align: end;
			align-self: end;
		}

		h2 {
			width: 7ch;
			font-size: 3rem;
			line-height: 0.66;
			margin-block: 0.5rem;
		}

		div:has(h2) {
			display: flex;
			align-items: end;
		}

		ul {
			margin: 0;
			margin-top: 0.1rem;
			padding: 0;
			list-style: none;
		}

		li {
			margin: 0;
			text-align: end;
			white-space: pre;
		}
	}
</style>
