export async function load({ url }) {
	const lang = url.searchParams.get('lang') ?? 'fr';

	const data = await import(`$lib/data/${lang}.json`);
	return { ...data };
}
