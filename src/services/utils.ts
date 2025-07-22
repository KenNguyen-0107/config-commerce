import { IApiError } from "./types";

export const handleApiError = (error: IApiError) => {
	return error && error.status !== undefined && error.errorJson?.message;
}