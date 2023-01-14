import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProblemDetails } from "../../../../models/types/problem-details.type";

@Component({
	selector: "app-error-dialog",
	templateUrl: "./error-dialog.component.html"
})
export class ErrorDialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: ProblemDetails) {
		console.log(data);
	}
}
