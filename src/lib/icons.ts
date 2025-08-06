export const langById = {
	svelte: { name: 'Svelte/Kit', icon: 'nf-dev-svelte' },
	react: { name: 'React', icon: 'nf-dev-react' },
	nextjs: { name: 'NextJS', icon: 'nf-dev-nextjs' },
	javascript: { name: 'JavaScript', icon: 'nf-dev-javascript' },
	typescript: { name: 'TypeScript', icon: 'nf-dev-typescript' },
	playwright: { name: 'Playwright', icon: 'nf-dev-playwright' },
	cypress: { name: 'Cypress', icon: 'nf-dev-cypressio' },
	eslint: { name: 'Eslint', icon: 'nf-dev-eslint' },
	vitest: { name: 'Vitest', icon: 'nf-dev-vitest' },
	nodejs: { name: 'NodeJS', icon: 'nf-md-nodejs' },
	haxe: { name: 'Haxe', icon: 'nf-seti-haxe' },
	graphql: { name: 'GraphQL', icon: 'nf-dev-graphql' },
	threejs: { name: 'ThreeJS', icon: 'nf-dev-threejs' },
	postgresql: { name: 'PostgreSQL', icon: 'nf-dev-postgresql' },
	python: { name: 'Python', icon: 'nf-dev-python' },
	rust: { name: 'Rust', icon: 'nf-dev-rust' },
	lua: { name: 'Lua', icon: 'nf-dev-lua' },
} as const;

export type LangId = keyof typeof langById;
export type Lang = (typeof langById)[LangId];

export function isLang(lang: string): lang is LangId {
	return Object.keys(langById).includes(lang);
}
