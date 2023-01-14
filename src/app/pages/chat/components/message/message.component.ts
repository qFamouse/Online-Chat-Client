import { Component, Input } from "@angular/core";

@Component({
	selector: "app-message",
	templateUrl: "./message.component.html",
	styleUrls: ["./message.component.scss"]
})
export class MessageComponent {
	@Input() text!: string;
	@Input() time!: string;
	@Input() isSender: boolean = false;

	constructor() {}
}
