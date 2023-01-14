export interface ProblemDetails {
	/**
	 * URI reference to identify the problem type
	 */
	type: string;
	/**
	 *  a short human-readable problem summary
	 */
	title: string;
	/**
	 * the HTTP status code generated on the problem occurrence
	 */
	status: number;
	/**
	 * a human-readable explanation for what exactly happened
	 */
	detail: string;
	traceId: string;
	errors: {
		[name: string]: string[];
	};
}
