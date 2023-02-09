import { Attachment } from "./attachment.dto";

export interface MessageDto {
	id: number;
	senderId: number;
	receiverId: number;
	message: string;
	createdAt: string;
	attachments: Attachment[];
}
