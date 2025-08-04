<script lang="ts">
	import type { Company } from '$lib/types';

	type Props = {
		title: string;
		description: string;
		company: Company;
	};

	const { title, description, company }: Props = $props();
</script>

<article>
	<h4>
		<span>
			{title}
			{#if company}chez <a href={company.website}>{company.name}</a>{/if}
		</span>
	</h4>
	<p>{description}</p>
</article>

<style>
	article {
		margin-block: 1rem;
	}

	h4 {
		font-family: Geist Mono;
	}

	h4,
	p {
		margin: 0;
	}

	p::before {
		content: '❯';
		margin-right: 0.5rem;
		position: relative;
		bottom: 0.09rem;
	}
</style>
