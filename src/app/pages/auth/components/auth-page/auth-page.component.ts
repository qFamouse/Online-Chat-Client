import { Component, OnDestroy } from "@angular/core";
import { LoginForm } from "../../models/login-form.model";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "../../../../shared/modules/dialog/components/error-dialog/error-dialog.component";
import { SignupForm } from "../../models/signup-form.model";
import { Router } from "@angular/router";
import { authPages, chatPages } from "../../../../shared/constants/pages";
import { AuthApiService } from "../../services/auth-api.service";
import { Subject, takeUntil } from "rxjs";

@Component({
	selector: "app-auth-page",
	templateUrl: "./auth-page.component.html",
	styleUrls: ["./auth-page.component.scss"]
})
export class AuthPageComponent implements OnDestroy {
	private destroy$ = new Subject<void>();

	constructor(
		private authApiService: AuthApiService,
		private dialog: MatDialog,
		private router: Router
	) {}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	onLoginSubmit(form: LoginForm): void {
		this.authApiService
			.login(form)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				error: errorHttpResponse =>
					this.dialog.open(ErrorDialogComponent, {
						data: errorHttpResponse.error
					}),
				next: (response: any) => {
					if (response.isTfaEnabled) {
						return this.router.navigate([authPages.tfa.absolutePath], {
							queryParams: {
								email: form.email
							}
						});
					}

					return this.router.navigateByUrl(chatPages.direct.absolutePath);
				}
			});
	}

	onSignupSubmit(form: SignupForm): void {
		this.authApiService
			.signup(form)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				error: errorHttpResponse =>
					this.dialog.open(ErrorDialogComponent, {
						data: errorHttpResponse.error
					}),
				complete: () => this.router.navigateByUrl(chatPages.direct.absolutePath)
			});
	}
}
