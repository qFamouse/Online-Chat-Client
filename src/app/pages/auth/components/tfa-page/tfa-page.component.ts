import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { JwtAuthService } from "../../../../shared/services/jwt-auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TfaDto } from "../../../../shared/models/dto/tfa-dto";
import { AuthResponseDto } from "../../../../shared/models/dto/auth-response.dto";
import { chatPages } from "../../../../shared/constants/pages";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: "app-tfa-page",
	templateUrl: "./tfa-page.component.html",
	styleUrls: ["./tfa-page.component.scss"]
})
export class TfaPageComponent implements OnInit {
	private email: string = "";

	twoStepForm = new FormGroup({
		twoFactorCode: new FormControl("", [
			Validators.required,
			Validators.pattern(/[0-9]/)
		])
	});

	showError: boolean = false;
	errorMessage: string = "";

	constructor(
		private jwtAuthService: JwtAuthService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.email = this.route.snapshot.queryParams["email"];
	}

	public input(event: any) {
		let input = event.target as HTMLInputElement;

		if (input.value.length === 6 && this.twoStepForm.valid) {
			this.login(Number.parseInt(input.value));
			input.value = "";
		}
	}

	public login(code: number) {
		this.showError = false;

		let twoFactorDto: TfaDto = {
			email: this.email,
			code: code
		};

		this.jwtAuthService.loginTfa(twoFactorDto).subscribe({
			next: (res: AuthResponseDto) => {
				return this.router.navigate([chatPages.direct.absolutePath]);
			},
			error: (err: HttpErrorResponse) => {
				this.errorMessage = err.error.title;
				this.showError = true;
			}
		});
	}
}
