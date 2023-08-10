export class APIError extends Error {
	public constructor(description: string) {
		super(description);

		Error.captureStackTrace?.(this, APIError);
	}
}
