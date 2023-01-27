import { Component, Input } from "@angular/core";

@Component({
	selector: "app-message",
	templateUrl: "./message.component.html",
	styleUrls: ["./message.component.scss"]
})
export class MessageComponent {
	@Input() text: string | undefined;
	@Input() time: string | undefined | null;
	@Input() isSender: boolean = false;

	constructor() {}
}
