import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginForm } from "../../models/login-form.model";

@Component({
	selector: "app-login-form",
	templateUrl: "./login-form.component.html",
	styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
	@Output() onSubmit = new EventEmitter<LoginForm>();

	formGroup!: FormGroup;
	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.formGroup = this.fb.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]]
		});
	}
}
