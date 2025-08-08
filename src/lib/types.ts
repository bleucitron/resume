import type { DurationObjectUnits } from 'luxon';

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
