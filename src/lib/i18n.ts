import dict from '$lib/data/misc.json';

type Key = keyof typeof dict;

function isKey(word: string): word is Key {
	return word in dict;
}

export function t(word: string, lang: string) {
	if (!isKey(word)) return word;

	return lang !== 'en' ? word : dict[word];
}
