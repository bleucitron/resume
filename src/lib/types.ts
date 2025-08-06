import type { DurationObjectUnits } from 'luxon';

export type Company = {
	name: string;
	website?: string;
};

export type Project = {
	description: string;
	client?: Company;
	duration?: DurationObjectUnits;
};
