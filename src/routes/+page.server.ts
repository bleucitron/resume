import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
	const lang = url.searchParams.get('lang') ?? 'fr';
	const short = url.searchParams.get('short');

	if (url.searchParams.has('lang') && lang === 'fr') {
		url.searchParams.delete('lang');
		redirect(308, url);
	}
	if (url.searchParams.has('short') && short === 'false') {
		url.searchParams.delete('short');
		redirect(308, url);
	}

	const data = await import(`$lib/data/${lang}.json`);
	return { ...data, locale: lang };
}
