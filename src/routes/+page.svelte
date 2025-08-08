<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Position from '$lib/components/Position.svelte';
	import AoC from '$lib/components/AoC.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import { isLang } from '$lib/icons';
	import Education from '$lib/components/Education.svelte';
	import References from '$lib/components/References.svelte';

	const { data } = $props();

	const {
		title,
		description,
		personal_info,
		stack,
		positions,
		hobbies,
		aoc,
		education,
		references,
	} = $derived(data);
	const { name, birth_date } = $derived(personal_info);

	const aocStack = $derived(aoc.map((instance) => instance.lang).filter(isLang));

	$inspect(data);
</script>

<Header {name} {birth_date} {title} {description} />

<main>
	<section class="stack">
		<h3>Stack</h3>

		<Stack {stack} verbose --margin="0 auto" --font-size="1.1rem" />
	</section>
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
		<h3>Références</h3>
		<References {references} />
	</section>

	<section>
		<h3>Formation</h3>
		<Education {education} />
	</section>
</main>
<footer>
	<address>
		<a href="https://github.com/bleucitron">@bleucitron</a><br />
		<a href="mailto:rcrestey@gmail.com">rcrestey@gmail.com</a><br />
		<a href="tel:+33643505643">+33 (0) 6 43 50 56 43</a>
	</address>
</footer>

<style>
	h3 {
		font-size: 1.7rem;
	}

	li {
		&::marker {
			color: var(--grey);
		}
	}

	.stack {
		display: flex;
		gap: 1rem;
		align-items: baseline;
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

	footer {
		color: var(--grey);
	}

	address {
		display: flex;
		justify-content: space-between;

		a {
			&:hover,
			&:focus {
				background-color: black;
				color: white;
			}
		}
	}
</style>
