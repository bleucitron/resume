export type Company = {
	name: string;
	website?: string;
};

export type Project = {
	description: string;
	client?: Company[];
};
