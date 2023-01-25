import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Message } from "../../../../shared/models/dto/message.dto";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
	selector: "app-conversation",
	templateUrl: "./conversation.component.html",
	styleUrls: ["./conversation.component.scss"]
})
export class ConversationComponent implements OnInit {
	@Input() messages: Message[] = [];
	@Input() conversationTitle: string = "";
	@Input() senderId: number = 0;
	@Output() onAttach = new EventEmitter<void>();
	@Output() onSend = new EventEmitter<Message>();

	textAreaMessage!: string;

	formGroup!: FormGroup;
	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.formGroup = this.fb.group({
			message: ["", [Validators.required]]
		});
	}

	onSendHandler() {
		let message: Message = {
			id: 0,
			senderId: this.senderId,
			message: this.textAreaMessage,
			time: "11"
		};

		this.onSend.emit(message);
	}
}
