import { Page } from "../models/layout.model";

export const authPages = {
	auth: new Page("Auth", "auth", "/auth")
};

export const chatPages = {
	chat: new Page("Chat", "chat", "/chat"),
	direct: new Page("Direct Messages", "direct", "/direct")
};
