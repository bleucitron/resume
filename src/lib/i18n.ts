import dict from '$lib/data/misc.json';

import { getContext, setContext } from 'svelte';

type Key = keyof typeof dict;

function isKey(word: string): word is Key {
	return word in dict;
}

function t(word: string, lang: string) {
	if (!isKey(word)) return word;

	return lang !== 'en' ? word : dict[word];
}

const key = Symbol('i18n');

export function setI18n(getLang: () => string) {
	setContext(key, (s: string) => t(s, getLang()));
}

export function getI18n() {
	return getContext(key) as (s: string) => ReturnType<typeof t>;
}
