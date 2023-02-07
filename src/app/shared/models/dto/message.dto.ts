import { Attachment } from "./attachment.dto";

export interface Message {
	id: number;
	senderId: number;
	receiverId: number;
	message: string;
	time: string;
	attachments: Attachment[];
}
