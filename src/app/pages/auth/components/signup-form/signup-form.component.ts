import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from "@angular/forms";
import { SignupForm } from "../../models/signup-form.model";

@Component({
	selector: "app-signup-form",
	templateUrl: "./signup-form.component.html",
	styleUrls: ["./signup-form.component.scss"]
})
export class SignupFormComponent implements OnInit {
	@Output() onSubmit = new EventEmitter<SignupForm>();

	formGroup!: FormGroup;
	hide: boolean = true;

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.formGroup = this.fb.group({
			userName: new FormControl("", [Validators.required]),
			email: new FormControl("", [Validators.required, Validators.email]),
			password: new FormControl("", [
				Validators.required,
				Validators.pattern(
					"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).{8,}$"
				)
			])
		});
	}
}
