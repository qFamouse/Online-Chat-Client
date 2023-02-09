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
import { SendMessageEvent } from "../../models/send-message.event";

@Component({
	selector: "app-conversation",
	templateUrl: "./conversation.component.html",
	styleUrls: ["./conversation.component.scss"]
})
export class ConversationComponent implements OnInit {
	@Input() messages: Message[] = [];
	@Input() conversationTitle: string = "";
	@Input() senderId: number = 0;

	@ViewChild("attachments") attachments!: ElementRef;
	@ViewChild("chat") chat!: ElementRef;
	@ViewChildren("messages") things!: QueryList<any>;
	ngAfterViewInit() {
		this.things.changes.subscribe(t => {
			this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
		});
	}

	@Output() onSend = new EventEmitter<SendMessageEvent>();

	textAreaMessage: string = "";
	attachmentsSelected: boolean = false;

	formGroup!: FormGroup;
	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.formGroup = this.fb.group({
			message: ["", [Validators.required]]
		});
	}

	onAttachHandler(event: any) {
		const files = event.target.files;

		this.attachmentsSelected = files?.length > 0;
	}

	onSendHandler() {
		const files = this.attachments.nativeElement.files;

		this.onSend.emit({
			text: this.textAreaMessage,
			attachments: files ? Array.from(files) : []
		});

		this.textAreaMessage = "";
		this.attachments.nativeElement.value = "";
		this.attachmentsSelected = false;
	}
}
