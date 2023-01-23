import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-dialog",
	templateUrl: "./dialog.component.html",
	styleUrls: ["./dialog.component.scss"]
})
export class DialogComponent {
	@Input() selected: boolean = false;
	@Input() name!: string;
	@Output() onClick = new EventEmitter<MouseEvent>();
}
