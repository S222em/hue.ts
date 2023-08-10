export class APITypeError extends TypeError {
	public constructor(description: string) {
		super(parseAPITypeError(description));

		Error.captureStackTrace?.(this, APITypeError);
	}
}

function parseAPITypeError(description: string): string {
	const instanceRef = /(?<=instanceRef: '#)(.*)(?=',)/.exec(description)?.[0];
	const expected = /(?<=expected: \[)(.*)(?=],)/.exec(description)?.[0];
	const actual = /(?<=actual: )(.*)(?=, instanceRef)/.exec(description)?.[0];

	return `Expected ${instanceRef} to be ${expected} but recieved ${actual}`;
}
