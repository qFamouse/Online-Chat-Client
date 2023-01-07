import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl;

export const apiUserRoutes = {
	login: `${apiUrl}/Users/login`,
	signup: `${apiUrl}/Users/register`
};
