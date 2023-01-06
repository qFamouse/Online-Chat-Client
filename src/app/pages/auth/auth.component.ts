import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
	selector: "app-auth",
	templateUrl: "./auth.component.html",
	styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
	authFormGroup = new FormGroup({
		name: new FormControl("", [Validators.required]),
		email: new FormControl("", [Validators.required, Validators.email]),
		password: new FormControl("", [
			Validators.required,
			Validators.pattern(
				"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).{8,}$"
			)
		])
	});

	login: boolean = false;

	constructor() {}

	ngOnInit(): void {}
}
