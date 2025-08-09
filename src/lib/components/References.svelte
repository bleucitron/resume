<script lang="ts">
	import type { Reference } from '$lib/types';

	type Props = {
		references: Reference[];
	};

	const { references }: Props = $props();
</script>

<ul class="References">
	{#each references as { name, position, company, email } (email)}
		<li>
			<address>
				<span class="name">{name}</span>
				<a href="mailto:{email}">{email}</a>
			</address>
			<p>└ {position} chez {company}</p>
		</li>
	{/each}
</ul>

<style>
	.References {
		padding: 0;
		list-style: none;
		color: var(--grey);

		li {
			margin-block: 0.5rem;
		}

		.name {
			color: black;
		}

		a {
			&:hover,
			&:focus {
				background: var(--grey);
			}
		}

		address {
			display: inline-flex;
			justify-content: space-between;
			width: 100%;
		}
	}
</style>
