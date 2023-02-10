export interface SendMessageDto {
	receiverId: number;
	message: string;
	timeToLive?: number;
}
