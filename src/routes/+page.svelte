<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Position from '$lib/components/Position.svelte';
	import AoC from '$lib/components/AoC.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import { isLang } from '$lib/icons';
	import References from '$lib/components/References.svelte';
	import Talks from '$lib/components/Talks.svelte';
	import Education from '$lib/components/Education.svelte';

	const { data } = $props();

	const {
		title,
		description,
		personal_info,
		stack,
		positions,
		aoc,
		hobbies,
		talks,
		references,
		education,
	} = $derived(data);
	const { name, birth_date, github, email, city, country } = $derived(personal_info);

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
		<h3>Talks</h3>
		<Talks {talks} />
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
		<p class="name">Romain Crestey</p>
		<p>
			<a href="https://github.com/bleucitron" target="_blank" rel="noopener noreferrer"
				><i class="nf nf-dev-github"></i>{github}</a
			>
		</p>
		<p><a href="mailto:rcrestey@gmail.com">{email}</a></p>
		<!-- <p><a href="tel:+33643505643">{phone_number}</a></p> -->
		<p>{city}, {country}</p>
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

		break-after: page;
	}

	.hobby {
		span {
			display: inline-flex;
			justify-content: space-between;
			width: 100%;
		}
	}

	footer {
		margin-top: 15rem;
		color: var(--grey);

		@media print {
			margin-top: 30rem;
		}
	}

	address {
		text-align: right;

		.name {
			color: black;
			font-size: 1.5rem;
			font-family: var(--title-font);
			line-height: 0.65;
			border-bottom: 1px solid;
			border-image-slice: 1;
			border-image-source: linear-gradient(to right, white 10%, var(--grey) 70%, black);
			margin-bottom: 0.2rem;
		}

		a {
			display: inline-flex;
			align-items: anchor-center;
			gap: 0.2rem;
		}
	}
</style>
