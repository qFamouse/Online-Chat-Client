import { Page } from "../models/layout.model";

export const authPages = {
	auth: new Page("Auth", "auth", "auth"),
	tfa: new Page("Two Factor Authentication", "tfa", "tfa")
};

export const chatPages = {
	chat: new Page("Chat", "chat", "chat"),
	direct: new Page("Direct Messages", "direct", "direct")
};
