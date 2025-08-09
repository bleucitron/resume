import type { DurationObjectUnits } from 'luxon';
import type { Lang } from './icons';

export type Company = {
	name: string;
	website?: string;
};

export type Project =
	| {
			description: string;
			client?: Company;
			duration?: DurationObjectUnits;
	  }
	| string;

export type Reference = {
	name: string;
	position: string;
	company: string;
	email: string;
};

export type Talk = {
	name: string;
	event: { name: string; website: string };
	date: string;
	link?: string;
	stack: string[];
};
