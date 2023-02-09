import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	QueryList,
	ViewChild,
	ViewChildren
} from "@angular/core";
import { Message } from "../../../../shared/models/dto/message.dto";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmitSendMessage } from "../../../../shared/models/dto/emitSendMessage.dto";

@Component({
	selector: "app-conversation",
	templateUrl: "./conversation.component.html",
	styleUrls: ["./conversation.component.scss"]
})
export class ConversationComponent implements OnInit {
	@Input() messages: Message[] = [];
	@Input() conversationTitle: string = "";
	@Input() senderId: number = 0;

	@ViewChild("chat") chat!: ElementRef;
	@ViewChildren("messages") things!: QueryList<any>;
	ngAfterViewInit() {
		this.things.changes.subscribe(t => {
			this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
		});
	}

	@Output() onSend = new EventEmitter<EmitSendMessage>();

	textAreaMessage: string = "";
	attachments: File[] = [];

	formGroup!: FormGroup;
	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.formGroup = this.fb.group({
			message: ["", [Validators.required]]
		});
	}

	onAttachHandler(event: any): void {
		const files = event.target.files;

		this.attachments = files.length > 0 ? Array.from(files) : [];
	}

	onSendHandler() {
		this.onSend.emit({
			text: this.textAreaMessage,
			attachments: this.attachments ? Array.from(this.attachments) : []
		});

		this.textAreaMessage = "";
		this.attachments = [];
	}
}
