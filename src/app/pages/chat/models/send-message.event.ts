export interface SendMessageEvent {
	text: string;
	attachments: File[];
	timeToLive?: number;
}
