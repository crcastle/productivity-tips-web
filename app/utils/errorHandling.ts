class APIResponseError extends Error {
	constructor(response: any) {
		super(`API Error Response: ${response.status} ${response.statusText}`);
    Object.setPrototypeOf(this, APIResponseError.prototype)
	}
}

export const checkStatus = (response: Response) => {
	if (response.ok) {
		// response.status >= 200 && response.status < 300
		return response;
	} else {
		throw new APIResponseError(response);
	}
}