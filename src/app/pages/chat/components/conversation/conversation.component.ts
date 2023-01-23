import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Message } from "../../../../shared/models/dto/message.dto";

@Component({
	selector: "app-conversation",
	templateUrl: "./conversation.component.html",
	styleUrls: ["./conversation.component.scss"]
})
export class ConversationComponent {
	@Input() messages: Message[] = [];
	@Input() conversationTitle: string = "";
	@Input() senderId: number = 0;
	@Output() onAttach = new EventEmitter<void>();
	@Output() onSend = new EventEmitter<Message>();
}
