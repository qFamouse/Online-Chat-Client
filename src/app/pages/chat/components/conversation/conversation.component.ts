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

	@Output() onAttach = new EventEmitter<void>();
	@Output() onSend = new EventEmitter<string>();

	textAreaMessage!: string;

	formGroup!: FormGroup;
	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.formGroup = this.fb.group({
			message: ["", [Validators.required]]
		});
	}

	test() {
		console.log("change");
	}

	onSendHandler() {
		this.onSend.emit(this.textAreaMessage);
		this.textAreaMessage = "";
	}
}
