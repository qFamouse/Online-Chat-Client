import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl;
const serverUrl = environment.serverUrl;

export const apiUserRoutes = {
	login: `${apiUrl}/Users/login`,
	tfaLogin: `${apiUrl}/Users/tfa-login`,
	signup: `${apiUrl}/Users/signup`,
	authenticate: `${apiUrl}/Users/auth`,
	about: `${apiUrl}/Users/about`,
	user: `${apiUrl}/Users`
};

export const apiDirectMessageRoutes = {
	interlocutors: `${apiUrl}/DirectMessages/interlocutors`,
	chat: `${apiUrl}/DirectMessages/chat`,
	statistics: `${apiUrl}/DirectMessages/statistics`
};

export const apiSignalrRoutes = {
	direct: `${serverUrl}/direct`
};

export const apiAttachmentRoutes = {
	getById: `${apiUrl}/attachments`,
	uploadToDirectMessageByMessageId: `${apiUrl}/attachments`
};
