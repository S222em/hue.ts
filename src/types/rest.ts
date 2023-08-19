export type RESTPayload = Record<string, any>;

export interface RESTResponse {
	errors: Array<{ description: string }>;
	data: Array<any>;
}
