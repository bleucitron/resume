import type { Attachment } from 'svelte/attachments';

export function clickOutside(callback: () => unknown): Attachment {
	return (node) => {
		const handleClick = (event: MouseEvent): void => {
			const { target } = event;

			if (!node.contains(target as HTMLElement)) {
				callback();
			}
		};

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	};
}
