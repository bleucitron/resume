export const langById = {
	svelte: { name: 'Svelte/Kit', icon: 'svelte' },
	react: { name: 'React', icon: 'react' },
	nextjs: { name: 'NextJS', icon: 'next-dot-js' },
	javascript: { name: 'JavaScript', icon: 'javascript' },
	typescript: { name: 'TypeScript', icon: 'typescript' },
	// playwright: { name: 'Playwright', icon: 'playwright' },
	// cypress: { name: 'Cypress', icon: 'cypressio' },
	eslint: { name: 'Eslint', icon: 'eslint' },
	// vitest: { name: 'Vitest', icon: 'vitest' },
	nodejs: { name: 'NodeJS', icon: 'node-dot-js' },
	haxe: { name: 'Haxe', icon: 'haxe' },
	graphql: { name: 'GraphQL', icon: 'graphql' },
	// threejs: { name: 'ThreeJS', icon: 'threejs' },
	postgresql: { name: 'PostgreSQL', icon: 'postgresql' },
	python: { name: 'Python', icon: 'python' },
	rust: { name: 'Rust', icon: 'rust' },
	lua: { name: 'Lua', icon: 'lua' },
	neovim: { name: 'Neovim', icon: 'neovim' },
	git: { name: 'Git', icon: 'git' },
	plane: { name: 'Aéronautique', icon: 'plane' },
} as const;

export type LangId = keyof typeof langById;
export type Lang = (typeof langById)[LangId];

export function isLang(lang: string): lang is LangId {
	return Object.keys(langById).includes(lang);
}
