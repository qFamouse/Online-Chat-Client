import { Component, OnInit } from "@angular/core";
import { LoginForm } from "../../models/login-form.model";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "../../../../shared/modules/dialog/components/error-dialog/error-dialog.component";
import { SignupForm } from "../../models/signup-form.model";
import { Router } from "@angular/router";
import { chatPages } from "../../../../shared/constants/pages";
import { AuthApiService } from "../../services/auth-api.service";

@Component({
	selector: "app-auth-page",
	templateUrl: "./auth-page.component.html",
	styleUrls: ["./auth-page.component.scss"]
})
export class AuthPageComponent implements OnInit {
	constructor(
		private authApiService: AuthApiService,
		private dialog: MatDialog,
		private router: Router
	) {}

	ngOnInit(): void {
		console.log(this);
	}

	onLoginSubmit(form: LoginForm): void {
		this.authApiService.login(form).subscribe({
			error: errorHttpResponse =>
				this.dialog.open(ErrorDialogComponent, {
					data: errorHttpResponse.error
				}),
			complete: () => this.router.navigateByUrl(chatPages.direct.absolutePath)
		});
	}

	onSignupSubmit(form: SignupForm): void {
		this.authApiService.signup(form).subscribe({
			error: errorHttpResponse =>
				this.dialog.open(ErrorDialogComponent, {
					data: errorHttpResponse.error
				}),
			complete: () => this.router.navigateByUrl(chatPages.direct.absolutePath)
		});
	}
}
